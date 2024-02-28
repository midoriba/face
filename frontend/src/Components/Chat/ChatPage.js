import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import FaceContainer from "../face/FaceContainer";
import EmotionSelector from "./EmotionSelector"

const ChatPage = () => {
    const [emotion, setEmotion] = useState({
        r:0,
        arg:0
    })
    useEffect(() => {
        console.log(JSON.stringify(emotion))
    }, [emotion])
    return (
        <div className="chat-page">
            <Chat setEmotion={setEmotion} />
            <FaceContainer emotion={emotion} />
            <EmotionSelector setEmotion={setEmotion} />
        </div>
    )
}

export default ChatPage;