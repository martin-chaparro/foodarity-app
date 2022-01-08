import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Terminos() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        onClick={handleClickOpen('paper')}
        variant="contained"
        sx={{
          backgroundColor: '#533c74',
          height: '2.51em',
          color: '#fffff',
          fontStyle: 'bold',
          margin: '1em 2em 2em',
          hover: false,
        }}
      >
        Terminos y Condiciones
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Condiciones de Uso</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(1)]
              .map(
                () => `Términos y condiciones
                Última actualización: 8 de enero de 2022
                Lea estos términos y condiciones detenidamente antes de utilizar Nuestro Servicio.
                Reconocimiento
                Estos son los Términos y Condiciones que rigen el uso de este Servicio y el acuerdo que opera entre Usted y la Compañía. Estos Términos y Condiciones establecen los derechos y obligaciones de todos los usuarios con respecto al uso del Servicio.
                Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de estos Términos y Condiciones. Estos Términos y Condiciones se aplican a todos los visitantes, usuarios y otras personas que acceden o utilizan el Servicio.
                Al acceder o utilizar el Servicio, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos Términos y condiciones, no podrá acceder al Servicio.
                Usted declara que es mayor de 18 años. La Compañía no permite que menores de 18 años utilicen el Servicio.
                Su acceso y uso del Servicio también está condicionado a Su aceptación y cumplimiento de la Política de Privacidad de la Compañía. Nuestra Política de privacidad describe Nuestras políticas y procedimientos sobre la recopilación, uso y divulgación de Su información personal cuando usa la Aplicación o el Sitio web y le informa sobre Sus derechos de privacidad y cómo la ley lo protege. Lea nuestra Política de privacidad detenidamente antes de utilizar nuestro servicio.
                Enlaces a otros sitios web
                Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por la Compañía.
                La Compañía no tiene control ni asume responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios web o servicios de terceros. Además, reconoce y acepta que la Compañía no será responsable, directa o indirectamente, por ningún daño o pérdida causados o presuntamente causados por o en conexión con el uso o la confianza en dicho contenido, bienes o servicios disponibles en oa través de dichos sitios web o servicios.
                Le recomendamos encarecidamente que lea los términos y condiciones y las políticas de privacidad de los sitios web o servicios de terceros que visite.
                Terminación
                Podemos rescindir o suspender Su acceso de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, incluido, entre otros, si incumple estos Términos y condiciones.
                Tras la rescisión, su derecho a utilizar el Servicio cesará de inmediato.
                Limitación de responsabilidad
                Sin perjuicio de los daños en los que pueda incurrir, la responsabilidad total de la Compañía y cualquiera de sus proveedores bajo cualquier disposición de estos Términos y Su recurso exclusivo para todo lo anterior se limitará al monto realmente pagado por Usted a través del Servicio o 100 USD. si no ha comprado nada a través del Servicio.
                En la máxima medida permitida por la ley aplicable, en ningún caso la Compañía o sus proveedores serán responsables de ningún daño especial, incidental, indirecto o consecuente (incluidos, entre otros, daños por lucro cesante, pérdida de datos o otra información, por interrupción del negocio, por lesiones personales, pérdida de privacidad que surja de o de alguna manera relacionada con el uso o la imposibilidad de usar el Servicio, software de terceros y / o hardware de terceros utilizado con el Servicio, o de lo contrario en relación con cualquier disposición de estos Términos), incluso si la Compañía o cualquier proveedor han sido informados de la posibilidad de tales daños e incluso si el recurso no cumple con su propósito esencial.
                Algunos estados no permiten la exclusión de garantías implícitas o la limitación de responsabilidad por daños incidentales o consecuentes, lo que significa que algunas de las limitaciones anteriores pueden no aplicarse. En estos estados, la responsabilidad de cada parte estará limitada en la mayor medida permitida por la ley.
                Descargo de responsabilidad "TAL CUAL" y "SEGÚN DISPONIBILIDAD"
                El Servicio se le proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD" y con todas las fallas y defectos sin garantía de ningún tipo. En la medida máxima permitida por la ley aplicable, la Compañía, en su propio nombre y en nombre de sus Afiliadas y sus respectivos licenciantes y proveedores de servicios, renuncia expresamente a todas las garantías, ya sean expresas, implícitas, estatutarias o de otro tipo, con respecto a la Servicio, incluidas todas las garantías implícitas de comerciabilidad, idoneidad para un propósito particular, título y no infracción, y garantías que puedan surgir del curso del trato, el curso del desempeño, el uso o la práctica comercial. Sin limitación a lo anterior, la Compañía no ofrece garantía ni compromiso, y no hace ninguna representación de ningún tipo de que el Servicio cumplirá con Sus requisitos, logrará los resultados previstos,
                Sin perjuicio de lo anterior, ni la Compañía ni ninguno de los proveedores de la compañía hacen ninguna representación o garantía de ningún tipo, expresa o implícita: (i) en cuanto al funcionamiento o disponibilidad del Servicio, o la información, contenido y materiales o productos. incluido en el mismo; (ii) que el Servicio será ininterrumpido o libre de errores; (iii) en cuanto a la precisión, confiabilidad o vigencia de cualquier información o contenido proporcionado a través del Servicio; o (iv) que el Servicio, sus servidores, el contenido o los correos electrónicos enviados desde o en nombre de la Compañía están libres de virus, scripts, troyanos, gusanos, malware, bombas de tiempo u otros componentes dañinos.
                Algunas jurisdicciones no permiten la exclusión de ciertos tipos de garantías o limitaciones sobre los derechos legales aplicables de un consumidor, por lo que algunas o todas las exclusiones y limitaciones anteriores pueden no aplicarse a usted. Pero en tal caso, las exclusiones y limitaciones establecidas en esta sección se aplicarán en la mayor medida exigible según la ley aplicable.

                Salvo lo dispuesto en el presente, el hecho de no ejercer un derecho o exigir el cumplimiento de una obligación en virtud de estos Términos no afectará la capacidad de una parte para ejercer dicho derecho o requerir dicho cumplimiento en cualquier momento posterior, ni la renuncia a un incumplimiento constituirá una renuncia a cualquier incumplimiento posterior.
                Interpretación de traducción
                Estos Términos y Condiciones pueden haberse traducido si los hemos puesto a su disposición en nuestro Servicio. Usted acepta que el texto original en inglés prevalecerá en caso de disputa.
                Cambios a estos términos y condiciones
                Nos reservamos el derecho, a Nuestro exclusivo criterio, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es importante, haremos los esfuerzos razonables para proporcionar un aviso de al menos 30 días antes de que entren en vigencia los nuevos términos. Lo que constituye un cambio material se determinará a Nuestro exclusivo criterio.
                Al continuar accediendo o utilizando Nuestro Servicio después de que esas revisiones entren en vigencia, usted acepta estar sujeto a los términos revisados. Si no está de acuerdo con los nuevos términos, en su totalidad o en parte, deje de utilizar el sitio web y el Servicio.
                Contáctenos
                Si tiene alguna pregunta sobre estos Términos y condiciones, puede contactarnos:
                •	Por correo electrónico: customer@foodarity.com
                •	Por número de teléfono: +541136675960`
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Estoy de Acuerdo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
