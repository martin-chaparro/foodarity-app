/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function RecuperarPassword () { 
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: '',
        password: '',
        passwordDos: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <form>
                <h1>Formulario para recuparar Contraseña</h1>
            <div>
                <h4>Email</h4>
                <input type="text"
                       name="email"
                       value={input.email}
                       onChange={(e) => {
                        handleOnChange(e);
                      }} />
                     
            </div>
            <div>
                <h4>Contraseña</h4>
                <input type="text"
                       name="password"
                       value={input.password}
                       onChange={(e) => {
                        handleOnChange(e);
                      }} />
            </div>
            <div>
                <h4>Vuelva a introducir su contraseña</h4>
                <input type="text"
                       name="passwordDos"
                       value={input.passwordDos}
                       onChange={(e) => {
                        handleOnChange(e);
                      }} />
            </div>
            <button>Enviar</button>
            </form>
        </div>
    )
}