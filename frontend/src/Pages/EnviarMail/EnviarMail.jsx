/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
 import React, { useState } from "react";
 import { useDispatch } from "react-redux";
 import Swal from 'sweetalert2';
 import { enviarMail } from "../../redux/actions/userActions";

export default function RecuperarPassword() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
      email: ''
  });

  const handleOnChange = (e) => {
      e.preventDefault();
      setInput({
          ...input,
          [e.target.name] : e.target.value
      })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(enviarMail(input))
    Swal.fire({
      icon: 'success',
      title: 'Bien!',
      text: 'Por favor revise su email',
    });
  }

  return (
    <div>
      <h1>Recuperacion de contraseña</h1>
      <p>Por favor para poder recuperar su contraseña introduzca su email</p>
      <form onSubmit={handleSubmit}> 
        <div>
          <input
            type="text"
            value={input.email}
            name="email"
            placeholder="Ingrese su email"
            onChange={(e) => {
                handleOnChange(e);
              }}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
