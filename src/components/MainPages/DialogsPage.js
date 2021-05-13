import React, {useEffect, useState} from "react";
import fetchRequest from "./fetchRequest";
import {MAIN_STYLES} from "../../constants";
import {io} from "socket.io-client";



let socket = null;

export default function DialogPage() {

    const [dialogs, setDialogs] = useState([]);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [selectedDialogMessages, setSelectedDialogMessages] = useState([]);
    const [input, setInputValue] = useState("");
    const userId = sessionStorage.getItem("userId")


    function onNewMessage(ev){
        console.log("new message")
        console.log(ev)
        console.log(selectedDialog)
        // if(ev.chat_id === selectedDialog){
        //     setSelectedDialogMessages([ev,...selectedDialogMessages])
        // }
    }

    useEffect(() => {
        socket = io('http://localhost:3002');
        socket.on("new_message",onNewMessage)
        fetchRequest(`dialogs?id=${userId}`,'GET').then(res => {
            setDialogs(res.data);
        });
    }, [])

    return (
       <div style={{
           display:'flex',
           flex: '1',
           flexDirection: 'row',
           paddingRight: '2em',
       }}>
           <div style={MAIN_STYLES.offsetBlockHorizontal}>
               <div style={{height: '800px'}}>
                   <h2>Диалоги</h2>
                   <div style={{overflowY: 'scroll', height: '80%', display: 'block', flexDirection: 'column'}}>
                       {
                           dialogs.map((item) =>
                               <div key={item.id} style={MAIN_STYLES.dialog} onClick={() => {
                                   setSelectedDialog(item.id)
                                   fetchRequest(`chats/chat-messages?id=${item.id}`,'GET').then(res => {
                                       setSelectedDialogMessages(res.data);
                                   });
                               }}>
                                   <p style={item.id === selectedDialog ? MAIN_STYLES.highlightedText : {}}>{item.title}</p>
                               </div>)
                       }
                   </div>

               </div>

               <div style={{
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   width: '100%',
                   flexDirection: 'column',
               }}>
                   <div style={{height: '600px', display: 'flex',flexDirection: 'column', width: '100%',overflowY: 'scroll'
                   }}>
                       {
                           selectedDialogMessages.map(item => {
                                   return <div key={item.id} style={{
                                       display: 'flex',
                                       alignSelf: parseInt(userId) === item.owner_id ? 'flex-end' : 'flex-start'
                                   }}>
                                       <div style={MAIN_STYLES.button}>{item.text}</div>
                                   </div>
                               }
                           )
                       }
                   </div>
                   <div style={{width: '100%', display: 'flex' , justifyContent: 'center'}}>
                       <input
                           style={{
                               width: '450px',
                               height: '50px',
                               backgroundColor: '#c3c5d7',
                               borderWidth: '0px',
                               borderRadius: '25px',
                               paddingLeft: '1em',
                               fontSize: '1.4em',
                               marginRight: '1em'
                           }}
                           placeholder={"введите сообщение"}
                           value={input}
                           type={"text"}
                           onChange={(e) => setInputValue(e.target.value)}/>
                           <div
                               style={{
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               width: '50px',
                               height: '50px',
                               borderRadius: '25px',
                               backgroundColor: '#c3c5d7',
                           }}
                           onClick={() => {
                               // console.log(input)
                               const userId = sessionStorage.getItem('userId');
                               socket.emit("send_message", {
                                   text: input,
                                   id: userId,
                                   chat_id: selectedDialog
                               })
                               setInputValue("")
                               // fetchRequest(`chats/send-message?id=${userId}&chat_id=${selectedDialog}&text=${input}`,'GET').then(res => {
                               //     setInputValue("")
                               // });
                           }}>
                               <img style={{
                               width: '25p',
                               height: '25px',}} src={"60525.svg"}/>
                           </div>
                   </div>
               </div>
           </div>

       </div>
    )
}
