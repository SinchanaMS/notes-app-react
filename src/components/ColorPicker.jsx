import { useState } from "react";
import "../styles/colorpicker.css"
import ColorPalette from "./ColorPalette";

export const ColorPicker = ({changeColor}) => {
    const [showColor, setShowColor] = useState(false)

    const colorPalette = [
        "var(--PEACH-NOTE-BG)",
        "var(--YELLOW-NOTE-BG)",
        "var(--GREEN-NOTE-BG)",
        "var(--LAVENDAR-NOTE-BG)",
        "var(--BLUE-NOTE-BG)",
        "var(--BROWN-NOTE-BG)"
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
