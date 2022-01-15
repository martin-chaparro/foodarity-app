import React from 'react';
import FiltroForm from './FiltroForm';

export default function FiltroWeb({ filtrado }) {
  return (
    <div>
      <FiltroForm isMobile={false} filtrado={filtrado} />
    </div>
  );
}
