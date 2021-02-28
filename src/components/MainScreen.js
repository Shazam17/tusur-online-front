import React, {useState} from "react";
import {useHistory} from "react-router";
import ProfilePage from "./MainPages/ProfilePage";
import DialogsPage from "./MainPages/DialogsPage";
import FriendsPage from "./MainPages/FriendsPage";
import GroupsPage from "./MainPages/GroupsPage";

const styles = {
    mainPageWrapper: {
        display: 'flex',
        width:'100%'
    },
    navigator: {
        backgroundColor: '#C4C4C4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '15px'
    },
    contentList: {
        backgroundColor: '#8D8D8D',
        display: 'flex',
        flex:'10'
    },
    button: {
        backgroundColor: '#C4C4C4',
        borderWidth: '0px',
        fontSize: '28px'
    },
    buttonHighlighted: {
        backgroundColor: '#FFFFFF',
        borderWidth: '0px',
        fontSize: '28px',
        borderRadius: '25px'
    }
}
class MenuOption {

    constructor(name, route, component) {
        this.name = name;
        this.route = route;
        this.component = component;
    }

}

const Drawer = ({setSelected, buttonsLabels, selected}) => {
    const addOnPressToButton = (route) =>( {onClick: (event) => {
        setSelected(route);
    }})

    return (
        <div style={styles.navigator}>
            {buttonsLabels.map((item) => {
                if(item.route === selected){
                    return <button {...addOnPressToButton(item)} style={styles.buttonHighlighted}>{item.name}</button>
                }else{
                    return <button {...addOnPressToButton(item)} style={styles.button}>{item.name}</button>
                }
            })}
        </div>
    )
}

export default function (props) {

    const buttonsLabels = [
        new MenuOption('Профиль','/profile',ProfilePage()),
        new MenuOption('Диалоги','/dialogs',DialogsPage()),
        new MenuOption('Друзья','/friends',FriendsPage()),
        new MenuOption('Группы','/groups',GroupsPage()),
    ];
    const [selected, setSelected] = useState('/profile');
    const [selectedComponent, setSelectedComponent] = useState(buttonsLabels[0].component);

    return (<div style={styles.mainPageWrapper}>
      <Drawer setSelected={(item) => {
          setSelected(item.route);
          setSelectedComponent(item.component);
      }} buttonsLabels={buttonsLabels} selected={selected}/>
        <div style={styles.contentList}>
            {selectedComponent}
        </div>
    </div>);
}
