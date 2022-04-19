export const noteReducer = (notesData, action) => {
 switch (action.type){
    case "ADD_NOTE":
         return {...notesData, notes: action.payload}
    case "DELETE_NOTE":
        return {...notesData, notes: action.payload}
    case "ADD_TO_TRASH":
        return {...notesData, trash: [...notesData.trash, action.payload]}
    case "EDIT_NOTE":
        return {...notesData, notes: action.payload}
    case "ARCHIVE_NOTE":
        return {...notesData, notes: action.payload.notes, archives: action.payload.archives}
    case "RESTORE_FROM_ARCHIVE":
        return {...notesData, notes: action.payload.notes, archives: action.payload.archives}
    case "DELETE_FROM_ARCHIVE":
        return {...notesData, archives: action.payload.archives}
    case "ADD_LABEL":
        return {...notesData, labelsList: [...notesData.labelsList, action.payload]}
    case "RESTORE_FROM_TRASH":
        return {...notesData, trash: notesData.trash.filter(item => item._id !== action.payload._id)}
    case "RESTORE_NOTE":
        return {...notesData, notes: action.payload}
 }
}