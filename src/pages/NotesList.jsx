import AddNote from '../components/AddNote'
import Note from '../components/Note'
import { useNote } from '../contexts/NoteContext'

export default function NotesList() {
  const {notes} = useNote()
  return (
    <div>
      <AddNote/>
      <div className='notes-list'>
        {notes.length === 0 ? <h3 className='empty-list-text'>Hmmm! No notes here.</h3> : notes.map(note => (
          <Note note = {note}/>
        ))}
      </div>
    </div>
    
  )
}
