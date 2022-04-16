import React from 'react'
import { useNote } from '../contexts/NoteContext'
import empty from "../assets/images/no_results.png"
import TrashNote from "../components/TrashNote"

export default function Trash() {

    const { notesData } = useNote()
    
    return (
        <div className='notes-list'>
            {notesData.trash.length !== 0 ? notesData.trash.map(item => (
            <TrashNote note = {item}/>
            )) : (
            <div className='empty-page'>
                <img src={empty}/>
                <h3>No trash here!</h3>
            </div>)}
        </div>
    )
}
