import { createContext, useContext, useState } from "react";

const NoteContext = createContext()

const useNote = () => useContext(NoteContext)

const NoteProvider = ({children}) => {

    const initialNote = {
        title: "",
        body: "",
        bgColor: "#d6d8cb",
        tags: [],
        priority: "Low",
        date: new Date().toLocaleString()
    }

    const initialNotesData = {
        notes: [],
        trash: [],
        archives: [],
        pinned: [],
        tagsList: []
    }

    const [note, setNote] = useState(initialNote)
    const [tag, setTag] = useState("")
    const [notesData, setNotesData] = useState(initialNotesData)

    return (
        <NoteContext.Provider value={{note, setNote, notesData, setNotesData, tag, setTag}}>
            {children}
        </NoteContext.Provider>
    )
}

export {NoteProvider, useNote}