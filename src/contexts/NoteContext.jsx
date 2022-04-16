import { createContext, useContext, useState } from "react";

const NoteContext = createContext()

const useNote = () => useContext(NoteContext)
const NoteProvider = ({children}) => {
const initialNote = {
    title: "",
    body: "",
    bgColor: "#d6d8cb",
    tags: [],
    date: new Date().toLocaleString()
}
    const [note, setNote] = useState(initialNote)
    const [notes, setNotes] = useState([])
    const [trash, setTrash] = useState([])
    const [archives, setArchives] = useState([])
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [tagsList, setTagsList] = useState([])
    const [tag, setTag] = useState("")
    return (
        <NoteContext.Provider value={{note, initialNote, setNote, notes, setNotes, trash, setTrash, archives, setArchives, pinnedNotes, setPinnedNotes, tagsList, setTagsList, tag, setTag}}>{children}</NoteContext.Provider>
    )
}

export {NoteProvider, useNote}