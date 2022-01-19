/* eslint-disable no-shadow */
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

export default function PostNewBatch() {
  const dispatch = useDispatch();

  const categories = useSelector(state => state.product.categories)

  const [photo, setPhoto] = useState({});
  // const [photoPrev, setPhotoPrev] = useState('');
  // eslint-disable-next-line no-unused-vars
  

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
    dispatch(getCategories())
  },[])

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

  function handlePhoto(e) {
    e.preventDefault();
    setPhoto(e.target.files[0]);
    
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
        photo: {},
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
