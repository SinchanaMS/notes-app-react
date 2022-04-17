import AddNote from '../components/AddNote'
import Note from '../components/Note'
import { useAuth } from '../contexts/AuthContext'
import { useNote } from '../contexts/NoteContext'
import empty from "../assets/images/no_results.png"
import SortBy from '../components/SortBy'
import Filters from '../components/Filters'
import {useState} from "react"

export default function NotesList() {
  
  const [showEditor, setShowEditor] = useState(false)
  const {notesData} = useNote()
  const {loggedIn} = useAuth()
  
  return (
    <div>
      <button className={showEditor ? 'create-note hide' : 'create-note'} type="submit" onClick={()=> setShowEditor(!showEditor)}>
        <span class="material-icons md-18 material-icons-outlined ">add</span>
      </button>
      {showEditor && <div className='editor-bg'>
        <div className='editor-container'>
          <AddNote setShowEditor={setShowEditor}/>
        </div>
      </div>}

      {notesData?.notes.length !== 0 &&
      <div className='sort-and-filter'>
        <SortBy/>
        <Filters/>
      </div>}

      {loggedIn ? 
        <div className='notes-list'>
          {notesData?.notes.length === 0 ? 
          <div className='empty-page home'>
            <img src={empty}/>
            <h3>You haven't added any notes! Create one now!</h3>
          </div> : 
          notesData.notes.map(note => (
            <Note note = {note} key={note._id}/>
          ))}
        </div> 
        : <div className='empty-page home'>
            <img src={empty}/>
            <h3>Login to view your notes!</h3>
          </div>}
    </div>   
  )
}