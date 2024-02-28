import React, { useState, useEffect } from "react";

const EmotionSelector = ({setEmotion}) => {
    const [valence, setValence] = useState(0)
    const [arousal, setArousal] = useState(0)

    useEffect(() => {
        setEmotion({
            r: Math.sqrt(arousal*arousal+valence*valence),
            arg: Math.atan2(arousal, valence),
            valence: valence,
            arousal: arousal
        })
    }, [valence, arousal])

    const handleClick = (e) => {
        const bcr = e.target.getBoundingClientRect()
        const absx = e.pageX
        const absy = e.pageY
        const x = absx - bcr.x
        const y = absy - bcr.y
        console.log([x,y])
        console.log([valence*300+600, -(arousal*300)+600])
        setValence((x-300)/300)
        setArousal(-(y-300)/300)
    }

    return (
        <div className="emotion-selector">
            <svg viewBox="0 0 610 610" onClick={handleClick} className="emotion-selector-svg-container">
                <circle cx="300" cy="300" r="300" stroke="#333333" strokeWidth="5" fill="transparent"/>
                <line x1="300" y1="0" x2="300" y2="600" stroke="#333333" strokeWidth="5"/>
                <line x1="0" y1="300" x2="600" y2="300" stroke="#333333" strokeWidth="5"/>
                <circle cx={valence*300+300} cy={-(arousal*300)+300} r="10" stroke="#992222" fill="#992222"/>
            </svg>
            <p className="emotion-display-text">感情価: {Math.round(valence*10)/10} 覚醒度: {Math.round(arousal*10)/10}</p>
            <input value={valence} onChange={(e) => setValence(e.target.value)} />
            <input value={arousal} onChange={(e) => setArousal(e.target.value)} />
        </div>
    )
} 

export default EmotionSelector