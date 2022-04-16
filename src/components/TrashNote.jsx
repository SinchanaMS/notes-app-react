import axios from "axios"
import { useNote } from "../contexts/NoteContext"
import Toast from "./Toast"

export default function ({note}) {

const {setNotesData} = useNote()

const restoreFromTrash = async (note) =>{
  try {
    const response = await axios.post('/api/notes',{ note }, {
      headers: {
        authorization: localStorage.getItem("userToken")
      }
    })
    if (response.status === 201){
      setNotesData(data => ({...data, trash: data.trash.filter(item => item._id !== note._id), notes: response.data.notes}))
      Toast({type: "success", message: "Note restored from trash"})
    }
  } catch (error) {
    console.log(error)
    Toast({type: "error", message:"Oops! Some error occurred."})
  }
}

  return (
    <div className='note' style={{ backgroundColor: note.bgColor }}>
      <div className="note-header">
        <p className='note-title'>{note.title}</p>
      </div>
        <p className='note-body' dangerouslySetInnerHTML={{__html: note.body}}></p>
        <div className='note-footer'>
          <p className="created-date">{new Date().toLocaleString()}</p>
          <div className="note-actions">
            <button className="archive-note" onClick={() => restoreFromTrash(note)}><span class="material-icons material-icons-outlined">restore</span></button>
          </div>
        </div>
    </div>
  )
}
