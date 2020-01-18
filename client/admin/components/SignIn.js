import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn as signInAction } from '../actions/sign'
import { Redirect } from 'react-router-dom'
import '../styles/SignIn.styl'

export default function SignIn() {
    const dispatch = useDispatch()
    const signIn = data => dispatch(signInAction(data))
    const {
        signInFetching,
        signInOk,
        signInError,
        signed,
        error: serverError
    } = useSelector(state => state.sign)

    const [ loginValue, setLoginValue ]       = useState('')
    const [ passwordValue, setPasswordValue ] = useState('')
    const [ error, setError ]                 = useState('')

    useEffect(() => {
        if (serverError == '') {
            return
        }

        setError(serverError)
    }, [ serverError ])

    function onLoginChange(event) {
        setLoginValue(event.target.value)
    }

    function onPasswordChange() {
        setPasswordValue(event.target.value)
    }

    function onSignIn() {
        if (loginValue.length == 0 || passwordValue.length == 0) {
            return setError('Заполнены не все поля!')
        }

        signIn({
            login:    loginValue,
            password: passwordValue
        })
    }

    // если авторизован
    // сделать редирект
    if (signed) {
        return <Redirect to="/admin" />
    }

    return (
        <div className="signin flex flex-center flex-middle">
            <div className="signin--container">
                <h1>Вход</h1>
                { error && <p>{ error }</p> }
                <label>Логин</label>
                <input
                    type="text"
                    onChange={ onLoginChange }
                    onFocus={ () => setError('') }
                    value={ loginValue }
                />

                <label>Пароль</label>
                <input
                    type="password"
                    onChange={ onPasswordChange }
                    onFocus={ () => setError('') }
                    value={ passwordValue }
                />

                <div className="flex flex-right">
                    <button onClick={ onSignIn }>Войти</button>
                </div>
            </div>
        </div>
    )
}
