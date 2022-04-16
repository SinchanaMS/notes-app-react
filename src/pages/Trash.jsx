import React from 'react'
import { useNote } from '../contexts/NoteContext'
import empty from "../assets/images/no_results.png"
import TrashNote from "../components/TrashNote"

export default function Trash() {

    const { trash } = useNote()
    
    return (
        <div className='notes-list'>
            {trash.length !== 0 ? trash.map(item => (
            <TrashNote note = {item}/>
            )) : (
            <div className='empty-page'>
                <img src={empty}/>
                <h3>No trash here!</h3>
            </div>)}
        </div>
    )
}
