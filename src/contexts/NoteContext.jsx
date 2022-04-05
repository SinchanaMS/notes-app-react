import { createContext, useContext, useState } from "react";

const NoteContext = createContext()
const useNote = () => useContext(NoteContext)
const NoteProvider = ({children}) => {

    const [note, setNote] = useState({
        title: "",
        body: ""
    })
    const [notes, setNotes] = useState([])

    return (
        <NoteContext.Provider value={{note, setNote, notes, setNotes}}>{children}</NoteContext.Provider>
    )
}

export {NoteProvider, useNote}