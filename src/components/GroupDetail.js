import React, {useEffect, useState} from "react";
import fetchRequest from "./MainPages/fetchRequest";
import {useLocation} from "react-router";
import {MAIN_STYLES} from "../constants";
import {Post} from "./MainPages/ProfilePage";
import Modal from "react-modal";


export function CreatePost(props){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    return (
       <div>
           <Modal
               isOpen={isOpen}
               contentLabel="Создание поста"
               onRequestClose={() => setIsOpen(false)}
               style={{content: {
                       top: '25%',
                       bottom: '25%',
                       right: '25%',
                       left: '25%'
                   }}}
           >
               <div style={{backgroundColor: '#aaafff',
                   width: '90%',
                   height: '90%',
                   display:'flex',
                   alignItems: 'center',
                   flexDirection: 'column',
                   padding: '1em'}}>
                   <input placeholder={"введите название"} style={MAIN_STYLES.textInput} type={"text"}
                          onChange={(ev) => setTitle(ev.target.value)}/>
                   <div style={{height: '20px'}}/>
                   <input placeholder={"введите контент"} style={{...MAIN_STYLES.textInput, width: '10em'}} type={"text"}
                          onChange={(ev) => setContent(ev.target.value)}/>
                   <input style={MAIN_STYLES.button} type={"button"} value={"создать"} onClick={() => {
                       const groupId = props.groupId
                       fetchRequest("posts/create", 'POST', {title: title,content: content, id:groupId, isGroup: true })
                           .then((res) => {

                           })
                   }}/>
               </div>
           </Modal>
           <button style={MAIN_STYLES.button} onClick={() => {
                setIsOpen(true)
           }}>Создать пост</button>
       </div>
    )
}

export default function GroupDetail(props) {

    const [groupInfo, setGroupInfo] = useState(null);
    const [groupPosts, setPosts] = useState([]);
    const {groupId} = props;

    useEffect(() => {
        fetchRequest(`groups/group?id=${groupId}`,'GET').then((r) => {
            setGroupInfo(r.data);
        });
        fetchRequest(`posts/posts-get?id=${groupId}&isGroup=true`,'GET').then((r) => {
            setPosts(r.data);
        });
    }, [])
    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        {groupInfo ?
            <div style={{
                ...MAIN_STYLES.offsetBlockRounded,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '2em',
                marginBottom: '2em',
                width: '60%'
            }}>
                <h1>Группа {groupInfo.title}</h1>
                <CreatePost groupId={groupId}/>
                {groupPosts.map(item => <Post post={item}/>)}
            </div> : null}
    </div>
}
