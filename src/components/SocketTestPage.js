import React, {useState} from "react";
import {io} from "socket.io-client";
const socket = io('http://localhost:3004');


export default function SocketTestPage() {

    const [event_name, setName] = useState('');
    const [event_content, setContent] = useState('');

    return (
        <div>
            <input type={"text"} placeholder={"event_name"} value={event_name} onChange={(ev) =>setName(ev.target.value) }/>
            <input type={"text"} placeholder={"content"} value={event_content} onChange={(ev) =>setContent(ev.target.value)}/>
            <input type={"button"} onClick={() =>  socket.emit(event_name, JSON.parse(event_content))} value={"press"}/>
        </div>
    );
}
