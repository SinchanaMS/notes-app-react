import { useNote } from "../contexts/contexts";
import { Editor, ColorPicker } from "./components";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdCheck, MdClose } from "react-icons/md";
import { deleteLabel } from "../helpers/NoteFunctions";

export default function AddNote({ setShowEditor }) {
  const {
    note,
    setNote,
    allLabelsList,
    addToNotesList,
    editNote,
    addLabels,
    noteDispatch,
    notesData,
  } = useNote();

  const initialNote = {
    title: "",
    body: "",
    bgColor: "var(--NOTE-BG-COLOR)",
    labels: [],
    priority: "3",
    isEdited: false,
    date: new Date().toLocaleString(),
  };

  const handleColor = (note, color) => {
    setNote({ ...note, bgColor: (note.bgColor = color) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    note.isEdited
      ? editNote(note, noteDispatch)
      : addToNotesList(note, noteDispatch);
    setNote(initialNote);
    setShowEditor(false);
  };

  const handleLabels = (label, noteDispatch) => {
    label.length &&
      setNote((note) => ({ ...note, labels: [...note.labels, label] }));
    addLabels(label, noteDispatch);
  };

  return (
    <div className="note new">
      <form onSubmit={handleSubmit}>
        <div className="note-header">
          <input
            className="note-title"
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>
        <div className="note-body">
          <Editor />
        </div>
        <div className="note-footer">
          <div className="labels-options">
            <select
              className="dropdown-labels"
              onChange={(e) => {
                e.target.value !== "" &&
                  handleLabels(e.target.value, noteDispatch);
              }}
            >
              <option value="" disabled selected>
                Select Labels
              </option>
              {allLabelsList.map((tag) => (
                <option value={tag}>{tag}</option>
              ))}
            </select>

            <select
              className="priority"
              onClick={(e) => setNote({ ...note, priority: e.target.value })}
            >
              <option value="" disabled selected>
                Select Priority
              </option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>

          <div className="footer-ctas">
            <ColorPicker changeColor={(color) => handleColor(note, color)} />
            <button className="save-note" type="submit">
              {note.isEdited ? (
                <MdCheck />
              ) : (
                <span class="material-icons md-18 material-icons-outlined">
                  add
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="labels-list">
          {note.labels.map((label) => (
            <div
              className="label-chip"
              style={{
                backgroundColor: "lightgrey",
              }}
            >
              <p className="p-sm">{label}</p>
              <MdClose
                className="delete-label"
                onClick={() => {
                  deleteLabel(label, noteDispatch);
                  setNote((note) => ({
                    ...note,
                    labels: note.labels.filter((lab) => lab !== label),
                  }));
                }}
              />
            </div>
          ))}
        </div>
        <AiFillCloseCircle
          className="close-btn"
          onClick={() => {
            setNote(initialNote);
            setShowEditor(false);
          }}
        />
      </form>
    </div>
  );
}
