export const filterReducer = (filterState, action) => {
    switch (action.type){
        case "SORTBY":
            return {...filterState, sortBy: action.payload}
        case "LABEL":
            const {labels} = filterState
            return labels.includes(action.payload) ? {...filterState, labels: labels.filter(label => label!==action.payload)} :
            {...filterState, labels: [...labels, action.payload]}
        case "PRIORITY":
            const {priority} = filterState
            return priority === action.payload ? {...filterState, priority : ""} : {...filterState, priority: action.payload}
        default:
            return filterState
    }
}
