import React from "react"

const Message = ({author, content, datetime, left}) => {
    return (
        <div className={"message"+(left ? " left-message" : " right-message")}>
            <div>
                <p>{author}</p>
                <p>{content}</p>
                <p>{datetime}</p>
            </div>
        </div>
    )
}

export default Message