import axios from 'axios'
import { useAuth, useNote } from '../contexts/contexts'
import {Toast, Editor, ColorPicker } from './components'

export default function AddNote({setShowEditor}) {

  const {note, setNote, setNotesData, setlabel, allLabelsList} = useNote()
  const {loggedIn} = useAuth()
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

  const editNote = async (note) => {
    if (loggedIn) {
      try {
        const response = await axios.post (`/api/notes/${note._id}`, {note} , {
          headers: {
            authorization: localStorage.getItem("userToken")
          }
        })
        if (response.status === 201){
          setNotesData(data => ({...data, notes: response.data.notes}))

        }
      } catch (error) {
        Toast({type: "error", message:"Oops! Some error occurred."})
        console.log(error)
      }
    } else {
      Toast({type: "error", message:"Please login"})
  }
  console.log(notesData.notes)
}

  const handleSubmit = e => {
    e.preventDefault();
    note.isEdited ? editNote(note) : addToNotesList(note)
    setNote(initialNote)
    setShowEditor(false)
  }

  const addlabel = (label) => {
    label.length &&
    setNote(note => ({...note, labels: [...note.labels, label]}))
    setNotesData(data => ({...data, labelsList: [...data.labelsList, label]}))
    setlabel(label)
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

            <select className='dropdown-labels' onClick={(e)=>addlabel(e.target.value)}>
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
