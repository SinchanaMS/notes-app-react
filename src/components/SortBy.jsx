import "../styles/sortby.css"
import {useState} from "react"
import { useFilter } from "../contexts/FilterContext"

export default function SortBy() {
    
    const [showSort, setShowSort] = useState(false)
    const {filterDispatch} = useFilter()
    
    return (
        <div className='sort-by'>
            <p className="sort-title" onClick={() =>setShowSort(!showSort)}>Sort By:</p>
            <div className={showSort ? 'sort-options shadow active' : 'sort-options shadow'}>
                <div className="sort-option">Date Created
                    <p className='p-sm sort' data-value="NEWEST-TO-OLDEST" onClick={(e) => filterDispatch({type: "SORTBY", payload: "NEWEST-TO-OLDEST"})}>Newest to Oldest</p>
                    <p className='p-sm sort' data-value="OLDEST-TO-NEWEST" onClick={(e) => filterDispatch({type: "SORTBY", payload: "OLDEST-TO-NEWEST"})}>Oldest to Newest</p>
                </div>

                <div className="sort-option">Priority
                    <p className='p-sm sort' data-value="High to Low" onClick={(e) => filterDispatch({type: "SORTBY", payload: "HIGH-TO-LOW"})}>High to Low</p>
                    <p className='p-sm sort' data-value="Low to High" onClick={(e) => filterDispatch({type: "SORTBY", payload: "LOW-TO-HIGH"})}>Low to High</p>
                </div>
            </div>
        </div>
    )
}
