import axios from "axios"
import { useNote } from "../contexts/NoteContext"
import Toast from "./Toast"

export default function ({note}) {

  const {setNote, trash, setTrash, notes, setNotes, archives, setArchives} = useNote()

  async function deleteNote(note){
    try{
    const response = await axios.delete(`/api/notes/${note._id}`, {
      headers: {
        authorization: localStorage.getItem("userToken")
      }
    })
    if (response.status === 200) {
      setNotes(response.data.notes)
      setTrash([...trash, note])
      Toast({type: "success", message: "Note deleted"})
    }
  } catch(error){
    console.log(error)
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
      setNotes(response.data.notes)
      setArchives(response.data.archives)
      Toast({type: "success", message: "Note archived"})
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='note' style={{ backgroundColor: note.bgColor }}>
      <div className="note-header">
        <p className='note-title'>{note.title}</p>
      </div>
        <p className='note-body' dangerouslySetInnerHTML={{__html: note.body}}></p>
        <div className='note-footer'>
          <p className="created-date">{note.date}</p>
          <div className="note-actions">
            <button className="archive-note" onClick={()=>archiveNote(note)}><span class="material-icons material-icons-outlined">archive</span></button>
            <button className="delete-note" onClick={() => deleteNote(note)}><span class="material-icons material-icons-outlined delete-icon">delete</span></button>
          </div>
        </div>
    </div>
  )
}
