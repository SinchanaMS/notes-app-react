import { createContext, useContext, useState } from "react";

const NoteContext = createContext()

const useNote = () => useContext(NoteContext)
const NoteProvider = ({children}) => {

    const [note, setNote] = useState({
        title: "",
        body: "",
        bgColor: "#d6d8cb",
        date: new Date().toLocaleString()
    })
    const [notes, setNotes] = useState([])
    const [trash, setTrash] = useState([])
    const [archives, setArchives] = useState([])
    const [pinnedNotes, setPinnedNotes] = useState([])

    return (
        <NoteContext.Provider value={{note, setNote, notes, setNotes, trash, setTrash, archives, setArchives, pinnedNotes, setPinnedNotes}}>{children}</NoteContext.Provider>
    )
}

export {NoteProvider, useNote}