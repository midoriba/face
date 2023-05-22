import React from "react"

const Message = ({author, text, datetime, left}) => {
    return (
        <div className={"message"+(left ? " left-message" : " right-message")}>
            <div>
                <p>{author}</p>
                <p>{text}</p>
                <p>{datetime}</p>
            </div>
        </div>
    )
}

export default Message