import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { useNote } from '../contexts/NoteContext'
import { ColorPicker } from './ColorPicker'
import Editor from './Editor'
import Toast from './Toast'

export default function AddNote() {

  const {note, setNote, setNotesData, tag, setTag} = useNote()
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
  }

  const addTag = (tag) => {
    tag.length &&
    setNote(note => ({...note, tags: [...note.tags, tag]}))
    setTag("")
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
            <input type="text" className="tags" placeholder='Add Tags' value={tag} onChange={(e) => setTag(e.target.value)}/>
            <span class="material-icons md-18 material-icons-outlined add-tag"  onClick={() => addTag(tag)}>add</span>
            {finalTagsList.map(tag => (
            <div className='tag-chip'>
              <p>{tag}</p>
            </div>
          ))}
          </div>
          <div className='footer-ctas'>
            <ColorPicker changeColor={(color) => handleColor(note, color)}/>
            <button className='save-note' type="submit"><span class="material-icons md-18 material-icons-outlined">add</span></button>
          </div>
        </div>
      </form>
    </div>
  )
}
