import React, { useState, useEffect } from "react";

const EmotionGraph = ({emotion}) => {
    const size = 500;
    const max = size / 2;
    const x = emotion.r * Math.cos(emotion.arg*Math.PI/180);
    const y = -emotion.r * Math.sin(emotion.arg*Math.PI/180);
    return (
        <div className="emotion-graph">
            <svg viewBox={`0 0 ${size} ${size}`}>
                <line x1="0" y1={max} x2={size} y2={max} stroke="#112222" stroke-width="5"/>
                <line x1={max} y1="0" x2={max} y2={size} stroke="#112222" stroke-width="5"/>
                <circle cx={(x+1)*max} cy={(y+1)*max} r="10" fill="#661111"/>
                <circle cx={max} cy={max} r={max-2.5} stroke="#112222" stroke-width="5" fill="transparent "/>
            </svg>
        </div>
    )
}

export default EmotionGraph;