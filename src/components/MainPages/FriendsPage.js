import React, {useEffect, useState} from "react";
import fetchRequest from "./fetchRequest";
import {MAIN_STYLES} from "../../constants";
import {useHistory} from "react-router";
const Input = () => {
    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState([]);
    const handleInputChange = e => {
        setValue(e.target.value);
    };
    return <div style={MAIN_STYLES.offsetBlock}>
        <p>Поиск людей</p>
        <div>
            <div style={{marginBottom: '1em'}}>
                <input style={MAIN_STYLES.textInput}
                       value={value}
                       onChange={handleInputChange}
                       placeholder={"введите почту"} />
            </div>

            <input style={MAIN_STYLES.button} type={"button"} value={"поиск"} onClick={() => {
                fetchRequest(`friends/search-friends?email=${value}`,'GET').then((res) => {
                    setData(res.data)
                });
            }}/>
        </div>


        {data.map((item) =>
            <div key={item.id} style={MAIN_STYLES.friendAvatar}>
                <div style={{display: 'block'}}>
                    <p style={MAIN_STYLES.highlightedText}>ИМЯ ФАМИЛИЯ</p>
                    <p style={MAIN_STYLES.highlightedText}>{item.email}</p>
                    <p style={MAIN_STYLES.button} onClick={() => {
                        const userId =  sessionStorage.getItem('userId');
                        fetchRequest(`friends/add-friend?id1=${userId}&id2=${item.id}`,'GET').then((res) => {
                        });
                    }}>+</p>
                </div>
            </div>
        )}
    </div>;
};

export default function FriendsPage(props) {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const userId =  sessionStorage.getItem('userId');

        fetchRequest(`friends/user-friends?id=${userId}`,'GET').then((res) => {
           setFriends(res.data);
        });
    }, [])

    return (
        <div style={{
            display:'flex',
            flex: '1',
            paddingRight: '2em'
        }}>

            <div>
                <Input />
            </div>
            <div style={MAIN_STYLES.offsetBlock}>
                <h1>Друзья</h1>
                <div style={{display: 'flex'}}>
                    {friends.map(item => {
                        return (
                            <div key={item.id} style={MAIN_STYLES.friendAvatar}>
                                <div style={{display: 'block'}}>
                                    <p style={MAIN_STYLES.highlightedText}>ИМЯ ФАМИЛИЯ</p>
                                    <p style={MAIN_STYLES.highlightedText}>{item.email}</p>
                                    <p style={MAIN_STYLES.button} onClick={() => {
                                        const userId =  sessionStorage.getItem('userId');
                                        fetchRequest(`dialogs/start-dialog?id1=${userId}&id2=${item.id}&title=new_dialog`,'GET')
                                            .then((res) => {
                                                props.setSelected('/dialogs')
                                            });
                                    }}>перейти в диалог</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
