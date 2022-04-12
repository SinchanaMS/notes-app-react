import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useNote } from '../contexts/NoteContext'
import { ColorPicker } from './ColorPicker'
import Editor from './Editor'
import Toast from './Toast'

export default function AddNote() {
  const {note, setNote, setNotes} = useNote()
  const {loggedIn} = useAuth()

  const handleColor = (note, color) => {
    console.log(note)
    setNote({...note, bgColor: (note.bgColor = color)})
  }

  const addToNotesList = async (note) => {
    if (loggedIn){
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
  } else {
    Toast({type: "error", message:"Please login"})
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
        <ColorPicker changeColor={(color) => handleColor(note, color)}/>
        <button className='save-note' onClick={() => addToNotesList(note)}><span class="material-icons md-18 material-icons-outlined">add</span></button>
      </div>
    </div>
  )
}
