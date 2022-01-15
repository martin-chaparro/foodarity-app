import React from 'react';
import FiltroForm from './FiltroForm';

export default function FiltroWeb({ filtrado }) {
  return (
    <div>
      <h2>Filtros</h2>
      <FiltroForm isMobile={false} filtrado={filtrado} />
    </div>
  );
}
