import React from "react";
import {useHistory} from "react-router";

export default function (props) {
    const history = useHistory();
    return (
        <div>
            <p>Профиль</p>
            <button onClick={() => {
                window.sessionStorage.clear();
                history.push('/login');
            }}>выйти из профиля</button>
        </div>

    )
}
