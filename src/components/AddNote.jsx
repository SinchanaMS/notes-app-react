import axios from 'axios'
import { useNote } from '../contexts/NoteContext'
import Editor from './Editor'

export default function AddNote() {
  const {note, setNote, setNotes} = useNote()

  const addToNotesList = async (note) => {
    try {
      const response = await axios.post('/api/notes', { note }, {
        headers: {
          authorization: localStorage.getItem("userToken")
        }
      })
      if (response.status === 201) {
       setNotes(response.data.notes)
       setNote({...note, title: ""})
       setNote({...note, body: ""})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="note new">
      <div className='note-header'>
        <input className='note-title' type="text" placeholder='Title' value={note.title} onChange={(e) => setNote({...note, title: e.target.value})}/>     
      </div>
      <div className='note-body'>
        <Editor/>
      </div>
      <div className='note-footer'>
        <button className='save-note' onClick={() => addToNotesList(note)}>Add Note</button>
      </div>
    </div>
  )
}
