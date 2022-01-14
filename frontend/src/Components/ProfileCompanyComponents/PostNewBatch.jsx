import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
// import { object } from 'prop-types';

export default function PostNewBatch() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);

  const [photo, setPhoto] = useState({});

  const [input, setInput] = useState({
    lote: '',
    description: '',
    quantity: 0,
    price: 0,
    publicationDate: new Date()
      .toLocaleDateString()
      .split('/')
      .reverse()
      .join('-'),
    expirationDate: '',
    category: '',
  });

  useEffect(() => {
    dispatch(getCategories());
    const companyId = localStorage.getItem('token');

    console.log(companyId);
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

    // if (inputs.photo === {}) {
    //   errors.photo = 'Photo is required';
    // }

    return errors;
  }

  function handlePhoto(e) {
    console.log(e);
    console.log(e.target.files[0]);
    e.preventDefault();
    setPhoto(e.target.files[0]);
    console.log(photo);
  }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

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
        publicationDate: new Date()
          .toLocaleDateString()
          .split('/')
          .reverse()
          .join('-'),
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
                  name="photo"
                  onChange={handlePhoto}
                />
              </div>
              <div className={styles.logo}>
                <img src={logo} alt="logo" />
              </div>
            </div>

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
