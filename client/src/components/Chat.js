import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GetStarted from './GetStarted';

import styles from '../module.css/Chat.module.css';

const Chat = () => {
    // const [socket] = useState(() => io(':8000'))
    const [name, setName] = useState("Unknown user")
    const [nameExist, setNameExist] = useState(false)
    const [message, setMessage] = useState()
    const [chatHistory, setChatHistory] = useState([])

    const socket = io( "https://host/dropcodes", {
        "path": "/websockets",
        "transports": ["polling","websocket"],
        "transportOptions": {
        "polling": {
            "extraHeaders": {
                "authorization": "ApiKey <Key>"
            }
        }
    }
    });

    useEffect(() => {
        socket.on("welcome", data => {
            console.log("Received msg: ", data)
        })

        socket.on("new_msg", newHistory => {
            setChatHistory(oldHistory => {
                return newHistory
            })
        })

        return () => socket.disconnect(true)
    }, [])

    const submitNameHandler = (e) => {
        e.preventDefault()
        setNameExist(true)
        socket.emit("send_msg", {
            name: "system",
            msg: `${name} has joined the chat.`
        })
    }

    const sendMsgHandler = (e) => {
        e.preventDefault()
        socket.emit("send_msg", {
            name: name,
            msg: message
        })
    }

    return(
        <div className="card col-4 text-center position-fixed fixed-bottom border border-warning">
            <nav className="row navbar navbar-dark bg-dark text-white" data-toggle="collapse" data-target="#collapseChat" aria-expanded="false" aria-controls="collapseChat">
                <span className="font-weight-bold">Let's Chat! - Recent Movies</span>
            </nav>
            <div className="collapse" id="collapseChat">
                {/* Get Started */}
                { (!nameExist) && <GetStarted setName={setName} submitHandler={submitNameHandler} />}
                
                {(nameExist) &&
                <div className="text-left">
                    {/* CHAT BOX */}
                    <div className={styles.chatBox} id="chat-history">
                        {chatHistory.map((item, i) => (
                            (item.name === "system") ?
                            <div key={i} className="p-2">{item.msg}</div> : (
                                (item.name === name) ? 
                                <div className="row justify-content-end">
                                    <span key={i} className="badge badge-primary mr-3 mb-2 p-2">{item.msg}</span>
                                </div>
                                :
                                <div key={i} className="row justify-content-start">
                                    <span key={i} className="mx-3 p-2">
                                        <strong>{item.name}: </strong>
                                        <span className="badge badge-secondary">{item.msg}</span>
                                    </span>
                                </div>
                            )
                        ))}
                    </div>
                    {/* INPUT BOX */}
                    <form onSubmit={sendMsgHandler} className="row text-center">
                        <input type="text" onChange={(e) => setMessage(e.target.value)} maxLength="70" className="form-control col-10 rounded-0" />
                        <input type="submit" value="Send" className="col-2 btn btn-small btn-outline-warning bg-dark rounded-0" />
                    </form>
                </div>
                }
            </div>
        </div>
    )
}
export default Chat