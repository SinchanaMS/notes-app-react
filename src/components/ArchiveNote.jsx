import { useNote } from "../contexts/NoteContext"

export default function ({note}) {

const {restoreFromArchive, deleteFromArchive, noteDispatch} = useNote()
const finalLabelsList = [...new Set(note.labels)]

  return (
    <div className='note' style={{ backgroundColor: note.bgColor }}>
      <div className="note-header">
        <p className='note-title'>{note.title}</p>
      </div>
        <p className='note-body' dangerouslySetInnerHTML={{__html: note.body}}></p>
        <div className='note-footer'>
          <p className="created-date">{note.date}</p>
          <div className="note-actions">
            <button className="archive-note" onClick={() => restoreFromArchive(note, noteDispatch)}><span class="material-icons material-icons-outlined">unarchive</span></button>
            <button className="delete-note" onClick={() => deleteFromArchive(note, noteDispatch)}><span class="material-icons material-icons-outlined delete-icon">delete</span></button>
          </div>
        </div>
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
