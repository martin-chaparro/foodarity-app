import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
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
import logo from '../../assets/user-6.png';

export default function PostNewBatch() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);

  const [photo, setPhoto] = useState({});
  // const [photoPrev, setPhotoPrev] = useState('');

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

  function validate(inputs) {
    const errors = {};

    if (!inputs.lote) {
      errors.lote = 'Lote is required !';
    }
    if (!inputs.description) {
      errors.description = 'Descripcion is required ! ';
    }
    if (!inputs.quantity) {
      errors.quantity = 'Cantidad is required !';
    }

    if (!inputs.price) {
      errors.price = 'Price is required';
    }

    if (!inputs.expirationDate) {
      errors.exprirationDate = 'Date is required';
    }

    if (!inputs.category) {
      errors.category = 'Category is required';
    }

    if (inputs.photo === {}) {
      errors.photo = 'Photo is required';
    }

    return errors;
  }

  // function handlePhoto(e) {
  //   e.preventDefault();
  //   setPhoto(e.target.files[0]);

  // }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  console.log(photo);
  function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(input);

    if (!Object.keys(errors).length) {
      dispatch(postProduct(input, photo));

      // eslint-disable-next-line no-alert
      alert('Producto Publicado con Exito');
      setInput({
        lote: '',
        description: '',
        quantity: 0,
        price: 0,
        publicationDate: new Date().toLocaleDateString('en-ca'),
        expirationDate: '',
        category: '',
      });

      console.log(input);
      setPhoto({});
    } else {
      // eslint-disable-next-line no-alert
      alert('Complete todos los Campos');
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
      console.log(reader);

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
      <form className={styles.formcont} onSubmit={handleSubmit}>
        <div className={styles.generalcont}>
          <div className={styles.imagecontent}>
            <div className={styles.divupload}>
              <div className={styles.inputfoto}>
                <input
                  className={styles.btninput}
                  type="file"
                  name="file"
                  id="datosImagen"
                  onChange={handleChangeImage}
                />
              </div>
              <div className={styles.logo}>
                <Avatar
                  src={productPhoto}
                  alt="logo"
                  id="productImage"
                  sx={{ width: 75, height: 75, cursor: 'pointer' }}
                />
                {/* <img src={productPhoto} alt="logo" id="productImage" /> */}
              </div>
            </div>

            {/* <label htmlFor="datosImagen" className={styles.divupload}>
              <input
                className={styles.btninput}
                type="file"
                name="file"
                hidden
                id="datosImagen"
                onChange={handleChangeImage}
              />

              <img src={productPhoto} alt="logo" id="productImage" />
            </label> */}

            <div className={styles.categorias}>
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
              <div>
                <NuevoLote
                  setInput={setInput}
                  input={input}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
              </div>
              <div>
                <Fecha
                  setInput={setInput}
                  input={input}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
              </div>
            </div>

            <div className={styles.contamout}>
              <div>
                <Cantidad
                  setInput={setInput}
                  input={input}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
              </div>

              <div>
                <Amount
                  setInput={setInput}
                  input={input}
                  // eslint-disable-next-line react/jsx-no-bind
                  handleOnChange={handleOnChange}
                />
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
          <button type="submit" className={styles.btn}>
            PUBLICAR PRODUCTO
          </button>
        </div>
      </form>
    </div>
  );
}
