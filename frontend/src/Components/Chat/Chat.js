import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios"

function Chat({setEmotion}) {
    const format_digit = (n) => {
        if(n < 10){
            return `0${n}`
        }
        else{
            return `${n}`
        }
    }
    const getCurrentDatetime = () => {
        const current_datetime = new Date();
        const formatted_current_datetime =
            current_datetime.getFullYear() +
            "-" +
            format_digit(current_datetime.getMonth() + 1) +
            "-" +
            format_digit(current_datetime.getDate()) +
            " " +
            format_digit(current_datetime.getHours()) +
            ":" +
            format_digit(current_datetime.getMinutes());
        return formatted_current_datetime;
    };
    const [chats, setChats] = useState([]);
    const [chatForm, setChatForm] = useState("")
    const [dialogId, setDialogId] = useState(null)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/start')
        .then(res => {
            setDialogId(res.data.id)
        })
    }, [])
    
    const handleSubmit = () => {
        const user_request = {
            author: "user",
            content: chatForm,
            datetime: getCurrentDatetime()
        }
        const new_chat = [...chats, user_request]
        setChats(new_chat)
        console.log('post')
        axios.post('http://127.0.0.1:5000/api/sendchat', new_chat)
            .then(res => {
                const responsetext = res.data['content']
                const emotion = res.data['emotion']
                console.log(`>>>>>>responsecontent: ${responsetext} ${JSON.stringify(emotion)}`)
                const assistant_response = {
                    author: "assistant",
                    content: responsetext,
                    datetime: getCurrentDatetime()}
                setChats([...new_chat, assistant_response])
                setChatForm("")
                const r = Math.sqrt((emotion.valence*emotion.valence) + (emotion.arousal*emotion.arousal))
                const arg = Math.atan2(emotion.arousal, emotion.valence) * 180 / Math.PI
                setEmotion({r:r, arg:arg})
            })
            .catch(res => {
                console.log('>>>>>>failed')
            })
    }

    const handleChangeChatInput = (e) => {
        setChatForm(e.target.value)
    }

    return (
        <div className="chat">
            <div className="message-container">
                <h1>チャット</h1>
                {chats.map((value) => <Message author={value.author} content={value.content} datetime={value.datetime} left={value.author==="assistant" ? true : false}/>)}
            </div>
            <div className="chat-form">
                <label htmlFor="chat-input">チャット入力</label>
                <input id="chat-input" value={chatForm} onChange={handleChangeChatInput} />
                <button onClick={handleSubmit}>送信</button>
            </div>
        </div>
    )
}

export default Chat;