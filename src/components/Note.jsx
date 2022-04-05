export default function ({note}) {

  return (
    <div className='note'>
        <p className='note-title'>{note.title}</p>
        <p className='note-body' dangerouslySetInnerHTML={{__html: note.body}}></p>
        <div className='note-footer'>
            <p>13/02/2022</p>
            <button className="delete-note"><span class="material-icons material-icons-outlined delete-icon">delete</span></button>
        </div>
    </div>
  )
}
