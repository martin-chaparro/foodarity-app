/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import styles from './PostNewBatch.module.css';

import {
  NuevoLote,
  Cantidad,
  Amount,
  Fecha,
  Categoria,
} from './TextFieldSizes';
import { postProduct, getCategories } from '../../redux/actions/productActions';
import Descripcion from './MultiLineTextFields';
import logo from '../../assets/foodAvatar.png';

export default function PostNewBatch() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);
  // const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState({});
  // const [photoPrev, setPhotoPrev] = useState('');
  // eslint-disable-next-line no-unused-vars
  

  const [error, setError] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [checkFullField, setCheckFullField] = useState(false);

  const [input, setInput] = useState({
    lote: '',
    description: '',
    quantity: 0,
    price: 0,
    publicationDate: new Date().toLocaleDateString('en-ca'),
    expirationDate: '',
    category: '',
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function validate(input) {
    const errors = {};

    if (!input.lote) {
      errors.lote = 'Lote is required !';
    }
    if (!input.description) {
      errors.description = 'Descripcion is required ! ';
    }
    if (!input.quantity) {
      errors.quantity = 'Cantidad is required !';
    }

    if (!input.price) {
      errors.price = 'Price is required';
    }

    if (!input.expirationDate) {
      errors.exprirationDate = 'Date is required';
    }

    if (!input.category) {
      errors.category = 'Category is required';
    }

    if (input.photo === {}) {
      errors.photo = 'Photo is required';
    }

    return errors;
  }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setCheckFullField();
  }

  console.log(Object.keys(validate(input)).length);

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(input);
    console.log(errors);

    if (Object.keys(errors).length) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: '¡Complete todos los campos!',
      });
    } else if (!photo.name) {
      Swal.fire({
        icon: 'error',
        title: 'Foto del Producto Requerida !',
        text: '¡Subí una foto de tu producto haciendo click sobre la misma !',
      });
    } else if (error.price === 'El numero debe ser > a 0') {
      Swal.fire({
        icon: 'error',
        title: 'Precio incorrecto!',
        text: '¡El número debe ser mayor a cero!',
      });
    } else if (error.price === 'Solo Números') {
      Swal.fire({
        icon: 'error',
        title: 'Precio incorrecto!',
        text: '¡Solo se aceptan numeros, utilice una coma para los decimales!',
      });
    } else if (error.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad incorrecta!',
        text: '¡El número debe ser mayor a cero!',
      });
    } else {
      dispatch(postProduct(input, photo));

      // eslint-disable-next-line no-alert
      setInput({
        lote: '',
        description: '',
        quantity: 0,
        price: 0,
        publicationDate: new Date().toLocaleDateString('en-ca'),
        expirationDate: '',
        category: '',
      });

      setPhoto({});
      // eslint-disable-next-line no-alert
      alert('Producto Publicado con Exito');
    }
  }

  useEffect(() => {
    const date = input.expirationDate;
    const arr = date.split('-');
    const year = arr.shift();
    arr.push(year);
    const expirationDate = arr.join('/');
    setInput({ ...input, expirationDate });
  }, [input.expirationDate]);

  // eslint-disable-next-line prefer-const
  let productPhoto = logo;

  function validatePrice(event) {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
    if (value < 0) {
      setError({
        ...error,
        [name]: 'El numero debe ser > a 0',
      });
      // eslint-disable-next-line no-useless-escape
    } else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)) {
      setError({
        ...error,
        [name]: 'Solo Números',
      });
    } else {
      setError({
        ...error,
        [name]: '',
      });
    }
  }

  function ValidateQuantity(event) {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });

    if (value < 0) {
      setError({
        error,
        [name]: 'El numero debe ser > a 0',
      });
    } else {
      setError({
        ...error,
        [name]: '',
      });
    }
  }

  const handleChangeImage = ({ target }) => {
    const image = target.files[0];

    const preview = document.querySelector('#productImage img');

    if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
      document.querySelector('#datosImagen').value = '';

      Swal.fire({
        icon: 'error',
        title: 'Error al subir la imagen',
        text: '¡La imagen debe estar en formato JPG o PNG!',
      });
    } else if (Number(image.size) > 2000000) {
      document.querySelector('#datosImagen').value = '';

      Swal.fire({
        icon: 'error',
        title: 'Error al subir la imagen',
        text: '¡La imagen no debe pesar más de 2 MB!',
      });
    } else {
      const reader = new FileReader();

      reader.onloadend = () => {
        preview.src = reader.result;
      };

      reader.readAsDataURL(image);
      // eslint-disable-next-line prefer-destructuring
      // productPhoto = target.files[0];
      setPhoto(target.files[0]);
    }
  };

  return (
    <div className={styles.formcont}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ color: '#7ED957', marginBottom: 1, textAlign: 'center' }}
      >
        Publique un nuevo producto !
      </Typography>
      <form className={styles.formcont} onSubmit={handleSubmit}>
        <div className={styles.generalcont}>
          <div className={styles.imagecontent}>
            <div className={styles.divupload}>
              <label htmlFor="datosImagen" className={styles.label}>
                <input
                  className={styles.btninput}
                  type="file"
                  name="file"
                  id="datosImagen"
                  hidden
                  onChange={handleChangeImage}
                />

                <Avatar
                  src={productPhoto}
                  alt="logo"
                  id="productImage"
                  sx={{ width: 150, height: 150, cursor: 'pointer' }}
                />
                <p className={styles.subifoto} id="datosImagen">
                  Subi una foto !
                </p>
              </label>
            </div>

            <div className={styles.divcategorias}>
              <Categoria
                setInput={setInput}
                input={input}
                categories={categories}
                // eslint-disable-next-line react/jsx-no-bind
                handleOnChange={handleOnChange}
              />
             
            </div>
          </div>

          <div className={styles.cont}>
            <div className={styles.contname}>
              <div className={styles.divnuevolote}>
                <NuevoLote
                  setInput={setInput}
                  input={input}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
               
              </div>
              <div className={styles.divprecio}>
                <Fecha
                  setInput={setInput}
                  input={input}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
               
              </div>
            </div>

            <div className={styles.contamout}>
              <div className={styles.divcantidad}>
                <Cantidad
                  setInput={setInput}
                  input={input}
                  name="quantity"
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                  // eslint-disable-next-line react/jsx-no-bind
                  ValidateQuantity={ValidateQuantity}
                  // eslint-disable-next-line react/jsx-no-bind
                />
                <div classsName={styles.quantityError}>
                  <p className={styles.error}>
                    {error.quantity && error.quantity}
                  </p>
                </div>
              </div>

              <div className={styles.divprecio}>
                <Amount
                  setInput={setInput}
                  input={input}
                  name="price"
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                  // eslint-disable-next-line react/jsx-no-bind
                  validatePrice={validatePrice}
                  // eslint-disable-next-line react/jsx-no-bind
                />
                <div>
                  <p className={styles.error}>{error.price && error.price}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Descripcion
              className={styles.description}
              setInput={setInput}
              input={input}
              // eslint-disable-next-line react/jsx-no-bind
              handleOnChange={handleOnChange}
            />
           
          </div>
          <button type="submit" className={styles.btnready}>
            PUBLICAR PRODUCTO
          </button>
        </div>
      </form>
    </div>
  );
}
