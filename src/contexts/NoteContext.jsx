import { createContext, useContext, useState } from "react";

const NoteContext = createContext()

const useNote = () => useContext(NoteContext)

const NoteProvider = ({children}) => {

    const initialNote = {
        title: "",
        body: "",
        bgColor: "var(--NOTE-BG-COLOR)",
        labels: [],
        priority: "3",
        isEdited: false,
        date: new Date().toLocaleString()
    }

    const initialNotesData = {
        notes: [],
        trash: [],
        archives: [],
        labelsList: []
    }

    const allLabelsList = ["Work", "Personal", "Creativity", "Shopping List", "To-do", "In Progress", "Completed"]
    
    const [note, setNote] = useState(initialNote)
    const [tag, setTag] = useState("")
    const [notesData, setNotesData] = useState(initialNotesData)
    const [showEditor, setShowEditor] = useState(false)

    return (
        <NoteContext.Provider value={{note, setNote, notesData, setNotesData, tag, setTag, showEditor, setShowEditor, allLabelsList}}>
            {children}
        </NoteContext.Provider>
    )
}

export {NoteProvider, useNote}