import React, {useEffect, useState} from "react";
import fetchRequest from "./fetchRequest";
import {useHistory} from "react-router-dom";
import {MAIN_STYLES} from "../../constants";
import GroupDetail from "../GroupDetail";

const GroupSearch = (ref) => {
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState([]);
    const handleInputChange = e => {
        setValue(e.target.value);
    };
    return <div style={MAIN_STYLES.offsetBlock}>
        <p>Поиск групп</p>
            <div>
                <input value={value}
                       onChange={handleInputChange}
                       style={MAIN_STYLES.textInput}
                       placeholder={"введите название"}/>
                <input type={"button"} value={"поиск групп"} style={MAIN_STYLES.button} onClick={() => {
                    fetchRequest(`groups/group-search?title=${value}`,'GET').then((res) => {
                        setData(res.data)
                    });
                }}/>
            </div>


        {data.map((item) =>
            <div style={MAIN_STYLES.friendAvatar}>
                <div>
                    <p>название: {item.title}</p>
                    <input type={"button"}  value={"подписаться"} style={MAIN_STYLES.button} onClick={() => {
                        const userId =  sessionStorage.getItem('userId');
                        fetchRequest(`groups/group-subscribe?user_id=${userId}&group_id=${item.id}`,'GET').then((res) => {
                        });
                    }}/>
                </div>
               </div>
        )}
    </div>;
};

const styles = {
    inputButton: {
        marginTop: '25px',
        borderRadius: '9px',
        backgroundColor: '#FFFFFF',
        width: '200px',
        height: '30px',
        borderWidth: '0px',
        fontSize: '18px',
    },
    group: {
        width: '100px',
        height: '100px',
        backgroundColor: '#00FFDD',
        display: 'block',
        margin: '30px'
    }

}
export default function (props) {

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelected] = useState("")

    const history = useHistory();

    useEffect(() => {
        window.sessionStorage.setItem('curPage','/groups')
        const userId =  sessionStorage.getItem('userId');
        fetchRequest(`groups?id=${userId}`,'GET').then((res) => {
            setGroups(res.data);
        });
    },[])

    const onCreateGroupClick = () => {
        let groupName = prompt("Введите название группы");
        const id = window.sessionStorage.getItem('userId');
        const body = {groupName,ownerId: id};
        if(groupName && groupName.length > 0){
            fetchRequest('groups/groups-create','POST',body).then(async (res) => {
                    document.location.reload();
                history.push('/groups');

            });
        }
    }

    const showGroupDetail = (id) => {
        setSelected('')
        setTimeout(() => {
            setSelected(id)
        }, 100)
        // history.push('/group-detail',{id});
    }
    const CreateGroupButton = () => ( <div style={{display:'block'}}><button style={MAIN_STYLES.button} onClick={onCreateGroupClick}>Создать группу</button></div>);
    return (
        <div style={{
            display: 'flex',
            paddingRight: '2em'
        }}>
            <div>
                <GroupSearch/>
            </div>
            <div style={MAIN_STYLES.offsetBlock}>
                <div><CreateGroupButton/><h1>Группы</h1></div>
                <div style={{ display: 'flex',}}>
                    {groups.map((item) => {
                        return <div style={MAIN_STYLES.friendAvatar}
                                    key={item.id}
                                    onClick={() => showGroupDetail(item.id)}>
                            {item.title}
                        </div>
                    })}
                </div>
                {selectedGroup !== '' ? <GroupDetail groupId={selectedGroup}/> : null}
            </div>
        </div>
    )
}
