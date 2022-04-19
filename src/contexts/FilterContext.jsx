import {createContext, useReducer, useContext} from "react"
import { filterReducer } from "../reducers/filterReducer"

const FilterContext = createContext()
const initialFilterState = {
    sortBy: "",
    labels: [],
    priority: ""
}

const useFilter = () => useContext(FilterContext)

const FilterProvider = ({children}) => {

    const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState)

    return (
        <FilterContext.Provider value={{filterState, filterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterProvider, useFilter}