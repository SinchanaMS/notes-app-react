import { useNote } from "../contexts/NoteContext"

export default function ({note}) {

  const {setNote, setShowEditor, deleteNote, archiveNote, noteDispatch} = useNote()

  const finalLabelsList = [...new Set(note.labels)]

  const editHandler = (note) =>{
    setNote({...note, isEdited: (note.isEdited = true)})
    setShowEditor(true)
    setNote(note)
  }
  
  return (
    <div className='note' style={{ backgroundColor: note.bgColor }}>
      <header className="note-header">
        <p className='note-title'>{note.title}</p>
        <div className="note-header-options">
          <p className="priority-label p-sm">{note.priority === "1" ? "High" : note.priority === "2" ? "Medium" : note.priority === "3" ? "Low" : "" }</p>
          <span class="material-icons material-icons-outlined md-18 edit-icon" onClick={()=>editHandler(note)}>
          edit
          </span>        
        </div>  
      </header>
      <p className='note-body' dangerouslySetInnerHTML={{__html: note.body}}></p>
      <footer className='note-footer'>
        <p className="created-date">{note.date}</p>
        <div className="note-actions">
          <button className="archive-note" onClick={()=>archiveNote(note, noteDispatch)}><span class="material-icons material-icons-outlined">archive</span></button>
          <button className="delete-note" onClick={() => deleteNote(note, noteDispatch)}><span class="material-icons material-icons-outlined delete-icon">delete</span></button>
        </div>         
      </footer>
      <div className="labels-list">
        {finalLabelsList.map(label => (
        <div className="label-chip">
          <p className="p-sm">{label}</p>
        </div>
        ))}        
      </div>     
    </div>
  )
}
