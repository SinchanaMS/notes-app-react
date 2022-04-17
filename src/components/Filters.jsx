import "../styles/filters.css"
import {useState} from "react"

export default function Filters() {

    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className='filter-by'>
            <p className="filter-title" onClick={() =>setShowFilters(!showFilters)}>Filter:</p>
            <div className={showFilters ? 'filter-options shadow active' : 'filter-options shadow'}>
                <p className="filter-option">Tags
                    <p className='p-sm filter'>Work</p>
                    <p className='p-sm filter'>Personal</p>
                    <p className='p-sm filter'>Creativity</p>
                    <p className='p-sm filter'>Shopping List</p>
                    <p className='p-sm filter'>To-do</p>
                    <p className='p-sm filter'>In Progress</p>
                    <p className='p-sm filter'>Completed</p>
                </p>
                <p className="filter-option">Priority
                    <p className='p-sm filter'>High</p>
                    <p className='p-sm filter'>Medium</p>
                    <p className='p-sm filter'>Low</p>
                </p>
            </div>
        </div>
    )
}
