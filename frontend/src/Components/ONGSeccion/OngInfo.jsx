import React from 'react';
import estilos from './OngInfo.module.css';

export default function OngInfo() {
  return (
    <div className={estilos.container}>
      <div>
        <h1>Aquí va la descripción de la ONG</h1>
      </div>
      <div>
        <h1>
          Aqui irá el carrete de Imágenes de Casos de Éxito de ONGs que
          recibieron donaciones
        </h1>
      </div>
      <div>
        <h1>Aquí irá el texto incentivando a los usuarios a donar</h1>
      </div>
    </div>
  );
}
