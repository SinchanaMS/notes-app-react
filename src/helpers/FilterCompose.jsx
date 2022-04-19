const sortByDate = ({sortBy}, notes) => {
    switch (sortBy){
        case "NEWEST-TO-OLDEST":
            return [...notes].sort((a, b) => new Date(b.date) - new Date(a.date))
        case "OLDEST-TO-NEWEST":
            return [...notes].sort((a, b)=> new Date(a.date) - new Date(b.date))
        default:
            return [...notes]
    }
}

const sortByPriority = ({sortBy}, notes) => {
    switch (sortBy){
        case "HIGH-TO-LOW":
            return [...notes].sort((a, b) => a.priority - b.priority)
        case "LOW-TO-HIGH":
            return [...notes].sort((a, b)=> b.priority - a.priority)
        default:
            return [...notes]
    }
}

const filterByLabels = ({labels}, notes) => {
    return labels.length ===0 ? notes : notes.filter(note => note.labels.some(label => labels.includes(label)))
}

const filterByPriority = ({priority}, notes) => {
    return priority === "" ? notes : notes.filter(note => note.priority === priority)
}

const applyFilters = (filterState, ...args) => notes => {
    return args.reduce((acc,curr) => {
        return curr(filterState, acc)
    }, notes)
}

export const getNotes = (filterState, notes) => applyFilters(
    filterState,
    sortByDate,
    sortByPriority,
    filterByLabels,
    filterByPriority
)(notes)