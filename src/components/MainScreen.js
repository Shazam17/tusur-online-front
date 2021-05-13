import React, {useState} from "react";
import ProfilePage from "./MainPages/ProfilePage";
import DialogsPage from "./MainPages/DialogsPage";
import FriendsPage from "./MainPages/FriendsPage";
import GroupsPage from "./MainPages/GroupsPage";

const styles = {
    mainPageWrapper: {
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#CDA390'
    },
    navigator: {
    },
    contentList: {
        display: 'block',
        minHeight: '90%'
    },
    button: {
        margin: '1em',
        backgroundColor: '#AAACCC',
        borderWidth: '0px',
        borderRadius: '15px',
        padding: '0.3em',
        paddingRight: '0.5em',
        paddingLeft: '0.5em',
        fontSize: '1.3em',
        color: '#36424e'
    },
    buttonHighlighted: {
        borderWidth: '0px',
        margin: '1em',
        borderRadius: '15px',
        outline: 'none',
        padding: '0.3em',
        paddingRight: '0.5em',
        paddingLeft: '0.5em',
        fontSize: '1.3em',
        color: '#36424e',
        backgroundColor: '#e2d7df',

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
                    return <button key={item.name} {...addOnPressToButton(item)} style={styles.buttonHighlighted}>{item.name}</button>
                }else{
                    return <button key={item.name} {...addOnPressToButton(item)} style={styles.button}>{item.name}</button>
                }
            })}
        </div>
    )
}

export default function MainScreen() {

    const [selected, setSelected] = useState('/profile');

    const buttonsLabels = [
        new MenuOption('Профиль','/profile',<ProfilePage/>),
        new MenuOption('Диалоги','/dialogs',<DialogsPage setSelected={setSelected}/>),
        new MenuOption('Друзья','/friends',<FriendsPage
            setSelected={() => {
                setSelectedComponent(buttonsLabels[1].component)
                setSelected('/dialogs')
            }}/>),
        new MenuOption('Группы','/groups',<GroupsPage/>),
    ];

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
