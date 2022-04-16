import { useState } from "react";
import "../styles/colorpicker.css"
import ColorPalette from "./ColorPalette";


export const ColorPicker = ({changeColor}) => {
    const [showColor, setShowColor] = useState(false)
    const colorPalette = [
        "#c1b1d0",
        "#b4cddb",
        "#bbcdb3",
        "#cccbda",
        "#cda5b8",
        "#d7bfc2"
    ]

    return (
        <div className="color-picker">
           <div className="note-footer-icon" onClick={()=>setShowColor(prev => !prev)}><ColorPalette/></div>
                <div className={showColor ? "color-wrapper active" : "color-wrapper"}>
                    {colorPalette.map((color) => {
                        return (
                            <div 
                            key = {color}
                            className = "color"
                            style={{backgroundColor : `${color}`}}
                            onClick={()=>changeColor(color)}>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}
