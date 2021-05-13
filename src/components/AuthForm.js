import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

const styles = {
    authFormWrapper: {
        width: '50%',
        margin: '0 auto',
        backgroundColor: '#C4C4C4',
        height:'50%',
        alignSelf:'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-around',
        alignItems:'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    input: {
        borderRadius: '9px',
        borderWidth: '0px',
        padding: '5px',
        fontSize: '18px',
        paddingLeft: '15px',
        marginTop: '25px',
    },
    inputButton: {
        marginTop: '25px',
        borderRadius: '9px',
        backgroundColor: '#FFFFFF',
        width: '200px',
        height: '30px',
        borderWidth: '0px',
        fontSize: '18px',
    }
}

const Input = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
        bind: () => ({
            value,
            onChange: (event) => setValue(event.target.value)
        }),
        clear: () => setValue(''),
        getValue: () => value
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default function AuthForm(props) {

    // eslint-disable-next-line react/prop-types
    const {register} = props;
    const email = Input('');
    const password = Input('');
    const history = useHistory();



    const sigIn = () => {
        fetch('http://localhost:3001/auth/login',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email: email.getValue(), password: password.getValue() })})
            .then(res => res.json())
            .then(data => {
                const { token , id} = data.payload;
                if(data.payload){
                    history.push('/main');
                    const myStorage = window.sessionStorage;
                    myStorage.setItem('token',token)
                    console.log(data.payload)
                    myStorage.setItem('userId',id)
                    myStorage.setItem('user',data.payload.user);
                }
            });
    }

    const signUp = () => {
        fetch('http://localhost:3001/auth/register',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ email: email.getValue(), password: password.getValue() })})
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    history.push('/login');
                }else {
                    alert('Пользователь с таким email уже существует');
                }
            });
    }

    const onSignInClick = (event) => {
        if(validateEmail(email.getValue()) && password.getValue().length > 0){
            event.preventDefault();
            sigIn();
        }else {
            alert('Неверная почта или пароль')
        }
    }

    const onRedirectSignUpClick = (event) => {
        event.preventDefault();
        history.push('/register');
    }
    const onRedirectSignInClick = (event) => {
        event.preventDefault();
        history.push('/login');
    }


    const onSignUpClick = (event) => {
        if(validateEmail(email.getValue()) && password.getValue().length > 0) {
            event.preventDefault();
            signUp();
        }else {
            alert('Неверная почта или пароль')
        }
    }

    const signInButton = () => ( <button style={styles.inputButton} onClick={onSignInClick}>Войти</button>);
    const signUpButton = () => ( <button style={styles.inputButton} onClick={onSignUpClick}>Зарегистрироваться</button>);
    const redirectToSignUp = () => ( <button style={styles.inputButton} onClick={onRedirectSignUpClick}>Нет аккаунта?</button>);
    const redirectToSignIn = () => ( <button style={styles.inputButton} onClick={onRedirectSignInClick}>Войти в аккаунт</button>);

    return (
            <div style={styles.authFormWrapper}>
                <h1>T - ONLINE</h1>
                <div style={styles.form} >
                    <input type={"text"} placeholder={"email"} style={styles.input} {...email.bind()}/>
                    <input type={"password"} placeholder={"пароль"} style={styles.input} {...password.bind()}/>
                </div>
                {register ? null : signInButton()}
                {register ? null :  redirectToSignUp()}
                {register ? signUpButton() :  null}
                {register ? redirectToSignIn() :  null}
            </div>
    );
}
