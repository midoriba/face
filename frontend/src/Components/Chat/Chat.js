import React, { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios"

function Chat() {
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
                    datetime: getCurrentDatetime()
                }
                setChats([...new_chat, assistant_response])
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
            <p>{JSON.stringify(chats)}</p>
            <div className="chat">
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