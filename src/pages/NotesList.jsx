import { useAuth, useNote, useFilter } from '../contexts/contexts'
import {SortBy, Filters, Note, AddNote} from '../components/components'
import { getNotes } from '../helpers/FilterCompose'
import empty from "../assets/images/no_results2.svg"
import notesImg from "../assets/images/notes1.svg"

export default function NotesList() {
  
  const {filterState} = useFilter()
  const {notesData, showEditor, setShowEditor} = useNote()
  const {notes} = notesData
  const {loggedIn} = useAuth()
  const finalNotesList = getNotes(filterState, notes)

  return (
    <div>   
      {loggedIn &&   
      <button className={showEditor ? 'create-note hide' : 'create-note'} type="submit" onClick={()=> setShowEditor(!showEditor)}>
        <span class="material-icons md-18 material-icons-outlined ">add</span>
      </button>}
      {showEditor && 
        <div className='editor-container'>
          <AddNote setShowEditor={setShowEditor} key={showEditor}/>
        </div>
      }

      {notes.length!==0 &&
      <div className='sort-and-filter'>
        <SortBy/>
        <Filters/>
      </div>}

      {loggedIn ? 
        <div className='notes-list'>
          {finalNotesList.length === 0 ? 
          <div className='empty-page home'>
            <img src={notesImg}/>
            <h3>You haven't added any notes! Create one now!</h3>
          </div> : 
          finalNotesList.map(note => (
            <Note note = {note} key={note._id}/>
          ))}
        </div> 
        : <div className='empty-page login'>
            <img src={empty}/>
            <h3>Login to view your notes!</h3>
          </div>
          }
    </div>   
  )
}