import axios from "axios"
import { useNote } from "../contexts/NoteContext"
import Toast from "./Toast"

export default function ({note}) {

  const {trash, setTrash, setNotes, setArchives} = useNote()

const restoreFromArchive = async (note) =>{
  try {
    const response = await axios.post(`/api/archives/restore/${note._id}`, {}, {
      headers: {
        authorization: localStorage.getItem("userToken")
      }
    })
    if (response.status === 200){
      setNotes(response.data.notes)
      setArchives(response.data.archives)
      Toast({type: "success", message: "Note restored from archives"})
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteFromArchive = async (note) => {
  try {
    const response = await axios.delete(`/api/archives/delete/${note._id}`, {
      headers: {
        authorization: localStorage.getItem("userToken")
      }
    })
    if (response.status === 200){
      setArchives(response.data.archives)
      setTrash([...trash, note])
      Toast({type: "success", message: "Note deleted"})
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
          <p className="created-date">13/02/2022</p>
          <div className="note-actions">
            <button className="archive-note" onClick={() => restoreFromArchive(note)}><span class="material-icons material-icons-outlined">unarchive</span></button>
            <button className="delete-note" onClick={() => deleteFromArchive(note)}><span class="material-icons material-icons-outlined delete-icon">delete</span></button>
          </div>
        </div>
    </div>
  )
}
