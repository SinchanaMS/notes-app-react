import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useNote } from '../contexts/NoteContext'
import { ColorPicker } from './ColorPicker'
import Editor from './Editor'
import Toast from './Toast'

export default function AddNote({setShowEditor}) {

  const {note, setNote, setNotesData, setTag} = useNote()
  const {loggedIn} = useAuth()
  const finalTagsList = [...new Set(note.tags)]
  const initialNote = {
    title: "",
    body: "",
    bgColor: "#d6d8cb",
    tags: [],
    date: new Date().toLocaleString()
  }

  const handleColor = (note, color) => {
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
          setNotesData(data => ({...data, notes: response.data.notes}))
          setNote(initialNote)
        }
      } catch (error) {
        Toast({type: "error", message:"Oops! Some error occurred."})
        console.log(error)
      }
    } else {
      Toast({type: "error", message:"Please login"})
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    addToNotesList(note)
    setNote(initialNote)
    setShowEditor(false)
  }

  const addTag = (tag) => {
    tag.length &&
    setNote(note => ({...note, tags: [...note.tags, tag]}))
    setNotesData(data => ({...data, tagsList: [...data.tagsList, tag]}))
    setTag(tag)
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
          <div className="tags-options">

            <label>Labels:</label>
            <select className='tags dropdown-tags' onClick={(e)=>addTag(e.target.value)}>
              <option value="" disabled selected>Select Labels</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Creativity">Creativity</option>
              <option value="Shopping List">Shopping List</option>
              <option value="To-do">To-do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <label>Priority:</label>
            <select className='priority' onClick={(e)=>setNote({...note, priority: e.target.value})}>
              <option value="" disabled selected>Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
          </div>
          <div className='footer-ctas'>
            <ColorPicker changeColor={(color) => handleColor(note, color)}/>
            <button className='save-note' type="submit"><span class="material-icons md-18 material-icons-outlined">add</span></button>
          </div>
        </div>
        <div className='tags-list'>
          {finalTagsList.map(tag => (
          <div className='tag-chip'>
            <p>{tag}</p>
          </div>
          ))}
        </div>
      </form>
    </div>
  )
}
