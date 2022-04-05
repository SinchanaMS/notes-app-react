import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNote } from '../contexts/NoteContext';
import "../styles/quill.css"

export default function Editor() {
const {note, setNote} = useNote()

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{ 'color': [] }, { 'background': [] }],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}

  return (
    <ReactQuill className='note-body' placeholder="Note here.." value={note.body} onChange={(e) => setNote({...note, body: e})} modules={modules}/>
  )
}
