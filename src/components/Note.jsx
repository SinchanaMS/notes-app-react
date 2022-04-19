import axios from "axios"
import { useNote } from "../contexts/NoteContext"
import Toast from "./Toast"

export default function ({note}) {

  const {setNote, setNotesData, showEditor, setShowEditor} = useNote()
  const finalLabelsList = [...new Set(note.labels)]

  const deleteNote = async (note) => {
    try{
      const response = await axios.delete(`/api/notes/${note._id}`, {
      headers: {
      authorization: localStorage.getItem("userToken")
      }
      })
      if (response.status === 200) {
        setNotesData(data => ({...data, trash: [...data.trash, note], notes: response.data.notes}))
        Toast({type: "success", message: "Note deleted"})
      }
    } catch(error){
      console.log(error)
      Toast({type: "error", message:"Oops! Some error occurred."})
    } 
  }

  const archiveNote = async (note) =>{
    try {
      const response = await axios.post(`/api/notes/archives/${note._id}`, {note}, {
      headers: {
      authorization: localStorage.getItem("userToken")
      }
      })
      if (response.status === 201){
        setNotesData(data => ({...data, archives: response.data.archives, notes: response.data.notes}))
        Toast({type: "success", message: "Note archived"})
      }
    } catch (error) {
      console.log(error)
      Toast({type: "error", message:"Oops! Some error occurred."})
    }
  }

  const editHandler = (note) =>{
    setNote({...note, isEdited: (note.isEdited = true)})
    setShowEditor(true)
    setNote(note)
  }
  
  console.log(showEditor)
  return (
    <div className='note' style={{ backgroundColor: note.bgColor }}>
      <div className="note-header">
        <p className='note-title'>{note.title}</p>
        <div className="note-header-options">
        <p className="priority-label p-sm">{note.priority === "1" ? "High" : note.priority === "2" ? "Medium" : note.priority === "3" ? "Low" : "" }</p>
        <span class="material-icons material-icons-outlined md-18 edit-icon" onClick={()=>editHandler(note)}>
          edit
        </span>
        
        </div>
        
      </div>
      <p className='note-body' dangerouslySetInnerHTML={{__html: note.body}}></p>
      <div className='note-footer'>
        <p className="created-date">{note.date}</p>
        <div className="note-actions">
          <button className="archive-note" onClick={()=>archiveNote(note)}><span class="material-icons material-icons-outlined">archive</span></button>
          <button className="delete-note" onClick={() => deleteNote(note)}><span class="material-icons material-icons-outlined delete-icon">delete</span></button>
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
