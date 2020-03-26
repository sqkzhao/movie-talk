import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import styles from '../module.css/Chat.module.css' 

const ChatBox = (props) => {
    const [socket] = useState(() => io(':8000'))
    const [userName, setUserName] = useState('')
    const [chatName, setChatName] = useState(userName)
    const [joined, setJoined] = useState(false)
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])

    useEffect(() => {
        socket.on("welcome", data => {
            console.log(data)
        })

        socket.on("chat_history", newChatHistory => {
            setChatHistory(chatHistory => {
                return newChatHistory
            })
        })


        return () => socket.disconnect(true)
    })

    const joinChatroom = (e) => {
        e.preventDefault()
        socket.emit("new_msg", {
            name: "system",
            msg: `${chatName} has joined the chat.`
        })
        setJoined(true)
    }

    const onSubmitHandler = (e) => {
        // e.preventDefault()
        // console.log("submit")
        // socket.emit("new_msg", {
        //     name: chatName,
        //     msg: message
        // })
    } 

    return(
        <div className="position-fixed fixed-bottom">
            
            <nav className="col-4 navbar navbar-dark bg-dark text-white" data-toggle="collapse" data-target="#collapseChat" aria-expanded="false" aria-controls="collapseChat">
                <span className="font-weight-bold">Recent Movies Chat</span>
            </nav>

            <div className="collapse col-4 bg-warning" id="collapseChat">
                {/* CHAT NAME INPUT BOX */}
                {!joined && 
                <div className={styles.chatBox}>
                    <form onSubmit={joinChatroom} className="input-group">
                        {userName==='' ?
                        <input type="text" placeholder="Enter your name.." onChange={(e) => setChatName(e.target.value)} className="form-control" /> :
                        <input type="text" value={userName} disabled className="form-control" /> } 
                        <input type="submit" value="Join" className="btn btn-sm btn-warning input-group-append" />
                    </form>
                </div> }

                {/* CHAT BOX */}
                {joined && 
                <>
                    <div className={styles.chatBox}>
                        {chatHistory.map((item, i) => {
                            return <p key={i}>{item.msg}</p>
                        })}
                    </div>
                    <form onSubmit={onSubmitHandler} className="input-group">
                        <input onChange={(e) => setMessage(e.target.value)} type="text" className="form-control rounded-0" />
                        <div className="input-group-append">
                            <button className="btn btn-secondary rounded-0" type="button">Send!</button>
                        </div>
                    </form>
                </>}
            </div>
        </div>
    )
}
export default ChatBox

{/* <div className="input-group-prepend">
    <button className="btn btn-secondary dropdown-toggle rounded-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">HI!</button>
    <div className="dropdown-menu my-2">
        <div>...</div>
    </div>
</div> */}