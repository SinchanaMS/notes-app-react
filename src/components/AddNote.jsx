import { useNote } from '../contexts/contexts'
import { Editor, ColorPicker } from './components'

export default function AddNote({setShowEditor}) {

  const {note, setNote, setLabel, allLabelsList, addToNotesList, editNote, addLabels, noteDispatch} = useNote()
  const finalLabelsList = [...new Set(note.labels)]
  const initialNote = {
    title: "",
    body: "",
    bgColor: "var(--NOTE-BG-COLOR)",
    labels: [],
    priority: "3",
    isEdited: false,
    date: new Date().toLocaleString()
  }

  const handleColor = (note, color) => {
    setNote({...note, bgColor: (note.bgColor = color)})
  }

  const handleSubmit = e => {
    e.preventDefault();
    note.isEdited ? editNote(note, noteDispatch) : addToNotesList(note, noteDispatch)
    setNote(initialNote)
    setShowEditor(false)
  }

  const handleLabels = (label, noteDispatch) => {
    label.length &&
    setNote(note => ({...note, labels: [...note.labels, label]}))
    setLabel(label)
    addLabels(label, noteDispatch)
  }
 
  return (
    <div className="note new">
      <form onSubmit={handleSubmit}>
        <div className='note-header' >
          <input className='note-title' type="text" placeholder='Title' value={note.title} onChange={(e) => setNote({...note, title: e.target.value})}/>     
        </div>
        <div className='note-body'>
          <Editor/>
        </div>
        <div className='note-footer'>
          <div className="labels-options">
            <select className='dropdown-labels' onClick={(e) => handleLabels(e.target.value, noteDispatch)}>
              <option value="" disabled selected>Select Labels</option>
              {allLabelsList.map(label => (
                <option value={label}>{label}</option>
              ))}
            </select>

            <select className='priority' onClick={(e)=>setNote({...note, priority: e.target.value})}>
              <option value="" disabled selected>Select Priority</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>            
          </div>
          
          <div className='footer-ctas'>
            <ColorPicker changeColor={(color) => handleColor(note, color)}/>
            <button className='save-note' type="submit">
              <span class="material-icons md-18 material-icons-outlined">add</span>
            </button>
          </div>
        </div>
        <div className='labels-list'>
          {finalLabelsList.map(label => (
          <div className='label-chip'>
            <p>{label}</p>
          </div>
          ))}
        </div>
      </form>
    </div>
  )
}
