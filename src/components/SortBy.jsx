import "../styles/sortby.css"
import {useState} from "react"

export default function SortBy() {
    
    const [showSort, setShowSort] = useState(false)

    return (
        <div className='sort-by'>
            <p className="sort-title" onClick={() =>setShowSort(!showSort)}>Sort By:</p>
            <div className={showSort ? 'sort-options shadow active' : 'sort-options shadow'}>
                <p className="sort-option">Date Created
                    <p className='p-sm sort'>Newest to Oldest</p>
                    <p className='p-sm sort'>Oldest to Newest</p>
                </p>
                <p className="sort-option">Date Modified
                    <p className='p-sm sort'>Newest to Oldest</p>
                    <p className='p-sm sort'>Newest to Oldest</p>
                </p>
                <p className="sort-option">Priority
                    <p className='p-sm sort'>High</p>
                    <p className='p-sm sort'>Medium</p>
                    <p className='p-sm sort'>Low</p>
                </p>
            </div>
        </div>
    )
}
