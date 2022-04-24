import { createContext, useContext, useState, useReducer } from "react";
import { noteReducer } from "../reducers/noteReducer";
import { addToNotesList, editNote, deleteNote, archiveNote, restoreFromArchive, deleteFromArchive, addLabels, restoreFromTrash } from "../helpers/NoteFunctions";

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
    const [label, setLabel] = useState("")
    const [showEditor, setShowEditor] = useState(false)
    const [notesData, noteDispatch] = useReducer(noteReducer, initialNotesData)

    return (
        <NoteContext.Provider value={{note, setNote, notesData, noteDispatch, label, setLabel, showEditor, setShowEditor, allLabelsList, addToNotesList, editNote, deleteNote, archiveNote, restoreFromArchive, deleteFromArchive, addLabels, restoreFromTrash}}>
            {children}
        </NoteContext.Provider>
    )
}

export {NoteProvider, useNote}