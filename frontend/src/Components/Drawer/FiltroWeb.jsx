import React from 'react';
import FiltroForm from './FiltroForm'

export default function FiltroWeb({filtrado}) {
  return (
    <div>
      <box>
        <FiltroForm isMobile={false} filtrado={filtrado}/>
        <h1>Filtro Web</h1>
      </box>
    </div>
  );
}
