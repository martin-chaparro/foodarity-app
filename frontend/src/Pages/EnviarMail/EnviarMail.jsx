/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
 import React, { useState } from "react";
 import { useDispatch } from "react-redux";

export default function RecuperarPassword() {
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
  return (
    <div>
      <h1>Recuperacion de contraseña</h1>
      <p>Por favor para poder recuperar su contraseña introduzca su email</p>
      <form>
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
        <button>Enviar</button>
      </form>
    </div>
  );
}
