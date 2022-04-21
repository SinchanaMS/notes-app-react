import "../styles/filters.css"
import {useState} from "react"
import { useFilter } from "../contexts/FilterContext"
import { useAuth } from "../contexts/AuthContext"

export default function Filters() {

    const {filterState, filterDispatch} = useFilter()
    const {loggedIn} = useAuth()
    const [showFilters, setShowFilters] = useState(false)
 
    return (
        
        <div className='filter-by'>
            {loggedIn &&
            <>
            <p className="filter-title" onClick={() =>setShowFilters(!showFilters)}>Filter:</p>
            
            <div className={showFilters ? 'filter-options shadow active' : 'filter-options shadow'}>
                <button className="clear-filter" onClick={(e) => filterDispatch({type: "CLEAR"})}>Clear Filters</button>
                <div className="filter-option">
                    <p>Labels</p>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "Work")}  value="Work" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>Work
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "Personal")} value="Personal" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>Personal
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "Creativity")} value="Creativity" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>Creativity
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "Shopping List")} value="Shopping List" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>Shopping List
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "To-do")} value="To-do" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>To-do
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "In Progress")} value="In Progress" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>In Progress
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="label" checked={filterState.labels.find(label => label === "Completed")} value="Completed" onChange={(e) => filterDispatch({type: "LABEL", payload: e.target.value})}/>Completed
                    </label>
                </div>

                <div className="filter-option">
                    <p>Priority</p>
                    <label className="label filter">
                        <input type="checkbox" name="priority" checked={filterState.priority ==="1"} value="1" onChange={(e) => filterDispatch({type: "PRIORITY", payload: e.target.value})}/>High
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="priority" checked={filterState.priority ==="2"} value="2" onChange={(e) => filterDispatch({type: "PRIORITY", payload: e.target.value})}/>Medium
                    </label>
                    <label className="label filter">
                        <input type="checkbox" name="priority" checked={filterState.priority ==="3"} value="3" onChange={(e) => filterDispatch({type: "PRIORITY", payload: e.target.value})}/>Low
                    </label>
                </div>
            </div>
            </>}
        </div>
    )
}
