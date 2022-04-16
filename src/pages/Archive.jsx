import { useNote } from '../contexts/NoteContext'
import empty from "../assets/images/no_results.png"
import ArchiveNote from '../components/ArchiveNote'

export default function Archive() {

  const {notesData} = useNote()

  return (
    <div className='notes-list'>
      {notesData?.archives.length !== 0 ?  notesData.archives.map(archivedNote => (
      <ArchiveNote note={archivedNote} key={archivedNote._id}/>
      )) : 
      <div className='empty-page'>
        <img src={empty}/>
        <h3>No archives here!</h3>
      </div>}
    </div>
  )
}
