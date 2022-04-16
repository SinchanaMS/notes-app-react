import AddNote from '../components/AddNote'
import Note from '../components/Note'
import { useAuth } from '../contexts/AuthContext'
import { useNote } from '../contexts/NoteContext'
import empty from "../assets/images/no_results.png"

export default function NotesList() {
  const {notesData} = useNote()
  const {loggedIn} = useAuth()
  return (
    <div>
      <AddNote/>
      {loggedIn ? 
      <div className='notes-list'>
        {notesData?.notes.length === 0 ? <h4 className='empty-list-text'>Notes you add appear here..</h4> : notesData.notes.map(note => (
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
 