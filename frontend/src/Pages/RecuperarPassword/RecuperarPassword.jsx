/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/api";



export default function RecuperarPassword () { 
    
    const [input, setInput] = useState({
        email: '',
    })



    const handleOnChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        api.post('/users/reset',input)
        // eslint-disable-next-line no-alert
        .then((response)=>alert('Se envio el correo'))
        .catch((error)=>console.log(error))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            {/* <div>
                <h4>Contraseña</h4>
                <input type="text"
                       name="password"
                       value={input.password} />
            </div>
            <div>
                <h4>Vuelva a introducir su contraseña</h4>
                <input type="text"
                       name="passwordDos"
                       value={input.passwordDos} />
            </div> */}
            <div>
                <br />
                <button type="submit">Reset Password</button>
            </div>
            </form>
        </div>
    )
}