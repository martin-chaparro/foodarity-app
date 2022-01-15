
import * as React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container} id= 'place-to-visit'>
      <h2>Acerca de Nosotros</h2>
      <p className={styles.text}>
        Foodarity es una app que te permite ubicar de manera sumamente simple
        ofertas de alimentos en buen estado, pero que están cerca de llegar a su
        tiempo de vida media, lo cual representa un problema muy grande:
        desperdicio de alimentos. Foodarity, más que una app, es una comunidad
        donde comercios pueden poner ofertas de alimento que necesitan ser
        vendidos rápidamente al y usuarios comunes puedan aprovecharlas, a su
        vez, damos especial atención a las ONG, que a través de ofertas
        especiales pueden obtener estos alimentos y aprovecharlos en obras
        benéficas. Nuestro nombre Nace de Food (comida) y Solidarity
        (solidaridad), dado nuestro objetivos de luchar contra el desperdicio de
        alimentos, disminuir la generación de desperdicios y brindar ayuda a los
        sectores de la comunidad que más lo necesiten.
      </p>

      <h2>Misión</h2>
      <p className={styles.text}>
        Evitar la pérdida de alimentos mientras contribuimos para reducir la
        producción de desperdicios y contaminación. Ayudamos a los comerciantes
        a minimizar perdidas mientras que damos oportunidad para que personas
        comunes y ONG puedan adquirir alimentos en buen estado a excelentes
        precios.
      </p>
      <h2>Visión</h2>
      <p className={styles.text}>
        Crear conciencia sobre la delicada situación alimentaria mundial y ser
        fuente de inspiración para dirigirnos a un futuro sustentable.
      </p>
      <h2>Nuestros valores</h2>
      <p className={styles.text}>
        <ul>
          <li>
            <b>Diversidad e Inclusión:</b> Somos un espacio al que todos podemos
            pertenecer, unidos por el objetivo de evitar el innecesario
            desperdicio de alimentos y crear conciencia.
          </li>
          <li>
            <b>Responsabilidad Social:</b> Nuestra comunidad es sumamente
            importante, por eso damos prioridades a las ONG para obtener
            beneficios y ayudar a los más necesitados.
          </li>
          <li>
            <b>Integridad:</b> Trabajamos de manera íntegra y transparente, con
            una fuerte ética profesional y social.
          </li>
          <li>
            <b>Impacto:</b> Creemos firmemente que nuestro trabajo impactará de
            manera positiva la conciencia del colectivo, logrando una reducción
            importante en el desperdicio de alimentos y generación de
            desperdicios.
          </li>
          <li>
            <b>Economía:</b> Ayudamos a los comercios, y especialmente al
            pequeño empresario, a convertir posibles pérdidas en ganancias.
          </li>
        </ul>
      </p>
    </div>
  );
};

