import React, {Component, useEffect, useState} from "react";
import fetchRequest from "./fetchRequest";
import {MAIN_STYLES} from "../../constants";
import {io} from "socket.io-client";
import SocketWrapper from "../../socketWrapper";




class Chat extends Component {

    socket = null;
    userId = sessionStorage.getItem('userId');
    state = {
        selectedDialog: null,
        text: '',
        messages: [],
        userId: this.userId
    }

    onNewMessage(ev){
        console.log("new message")
        console.log(ev)
        console.log(this.state.selectedDialog)
        if(ev.chat_id === this.props.dialogId){
            this.setState({...this.state,messages: [...this.state.messages,ev]})
        }
    }
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        SocketWrapper.GetInstance().addListener("new_message",this.onNewMessage.bind(this))

        // this.socket = io('http://localhost:3002');
        // this.socket.on("new_message",)
        // // this.messagesEndRef = React.createRef()
        // this.state = {
        //     selectedDialog: null,
        //     text: '',
        //     messages: [],
        //     userId: this.userId
        // }
    }

    componentWillUnmount() {
        SocketWrapper.GetInstance().unsubscribe('new_message')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dialogId !== this.props.dialogId ){
            fetchRequest(`chats/chat-messages?id=${this.props.dialogId}`,'GET').then(res => {
                if(res.data){
                    this.setState({...this.state, messages: res.data})
                }
            });
        }
        if(this.state.text === ''){
            this.messagesEndRef.scrollIntoView({ block: 'start', behavior: 'smooth' })
        }
    }


    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                flexDirection: 'column',
            }}>
                <div style={{height: '600px', display: 'flex',flexDirection: 'column', width: '100%',overflowY: 'scroll'
                }} ref={el => this.messagesEndRef = el}>
                    {
                        this.state.messages.map(item => {
                                return <div key={item.id} style={{
                                    display: 'flex',
                                    alignSelf: parseInt(this.state.userId) === item.owner_id ? 'flex-end' : 'flex-start'
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
                        value={this.state.text}
                        type={"text"}
                        onChange={(e) => this.setState({...this.state, text:e.target.value})}/>
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
                            const userId = sessionStorage.getItem('userId');
                            this.setState({...this.state,text: ""})
                            SocketWrapper.GetSocket().emit("send_message", {
                                text: this.state.text,
                                id: userId,
                                chat_id: this.props.dialogId
                            })
                        }}>
                        <img style={{
                            width: '25p',
                            height: '25px',}} src={"60525.svg"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default function DialogPage() {

    const [dialogs, setDialogs] = useState([]);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const userId = sessionStorage.getItem("userId")




    useEffect(() => {
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
                               }}>
                                   <p style={item.id === selectedDialog ? MAIN_STYLES.highlightedText : {}}>{item.title}</p>
                               </div>)
                       }
                   </div>

               </div>
               <Chat dialogId={selectedDialog}/>
           </div>

       </div>
    )
}
