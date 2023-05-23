import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios"

function Chat() {
    const getCurrentDatetime = () => {
        const current_datetime = new Date();
        const formatted_current_datetime =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() +
            " " +
            current_datetime.getHours() +
            ":" +
            current_datetime.getMinutes();
        return formatted_current_datetime;
    };
    const [chats, setChats] = useState([
        {
            author: "agent",
            text: "話しかけてください",
            datetime: getCurrentDatetime()
        },
        {
            author: "user",
            text: "こんにちは",
            datetime: getCurrentDatetime()
        }
    ]);
    const [chatForm, setChatForm] = useState("")

    const handleSubmit = () => {
        const new_chat = {
            author: "user",
            text: chatForm,
            datetime: getCurrentDatetime()
        }
        setChats([...chats, new_chat])
        console.log('post')
        axios.post('http://127.0.0.1:5000/api/sendchat', new_chat)
            .then(res => {
                const responsetext = res.data['text']
                console.log(`>>>>>>responsetext: ${responsetext}`)
                const agent_new_chat = {
                    author: "agent",
                    text: responsetext,
                    datetime: getCurrentDatetime()
                }
                setChats([...chats, agent_new_chat])
            })
            .catch(res => {
                console.log('>>>>>>failed')
            })
    }

    const handleChangeChatInput = (e) => {
        setChatForm(e.target.value)
    }

    return (
        <div>
            <div className="chat">
                <h1>チャット</h1>
                {chats.map((value) => <Message author={value.author} text={value.text} datetime={value.datetime} left={value.author==="agent" ? true : false}/>)}
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