import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import FaceContainer from "../face/FaceContainer";

const ChatPage = () => {
    const [emotion, setEmotion] = useState({
        r:0,
        arg:0
    })
    return (
        <div className="chat-page">
            <Chat setEmotion={setEmotion} />
            <FaceContainer emotion={emotion} />
        </div>
    )
}

export default ChatPage;