import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
// import Swal from 'sweetalert2';
import styles from './OngForm.module.css';
import Steps from '../OngPageInfo/Steps';
import CarreteImg from '../OngPageInfo/CarreteImg';

import {
  NuevoLote,
  Cantidad,
  Descripcion,
  Fecha,
  Categoria,
} from './TextfielForm';
// import { getCategories } from '../../../redux/actions/productActions';

// import logo from '../../../assets/foodAvatar.png';

export default function OngForm() {
  // const dispatch = useDispatch();

  // // const categories = useSelector((state) => state.product.categories);
  // // const [errors, setErrors] = useState({});
  // // eslint-disable-next-line no-unused-vars
  // const [photo, setPhoto] = useState({});
  // // const [photoPrev, setPhotoPrev] = useState('');

  // const [error, setError] = useState({});

  // const [input, setInput] = useState({
  //   lote: '',
  //   description: '',
  //   quantity: 0,
  //   price: 0,
  //   publicationDate: new Date().toLocaleDateString('en-ca'),
  //   expirationDate: '',
  //   category: '',
  // });

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, []);

  // function validate(inputs) {
  //   const errors = {};

  //   if (!inputs.lote) {
  //     errors.lote = 'Lote is required !';
  //   }
  //   if (!inputs.description) {
  //     errors.description = 'Descripcion is required ! ';
  //   }
  //   if (!inputs.quantity) {
  //     errors.quantity = 'Cantidad is required !';
  //   }

  //   if (!inputs.expirationDate) {
  //     errors.exprirationDate = 'Date is required';
  //   }

  //   if (!inputs.category) {
  //     errors.category = 'Category is required';
  //   }

  //   if (inputs.photo === {}) {
  //     errors.photo = 'Photo is required';
  //   }

  //   return errors;
  // }

  // function handleOnChange(e) {
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const errors = validate(input);

  //   if (!Object.keys(errors).length && !error.price && !error.quantity) {
  //     // dispatch(postProduct(input, photo));

  //     // eslint-disable-next-line no-alert
  //     alert('Producto Publicado con Exito');
  //     setInput({
  //       lote: '',
  //       description: '',
  //       quantity: 0,
  //       price: 0,
  //       publicationDate: new Date().toLocaleDateString('en-ca'),
  //       expirationDate: '',
  //       category: '',
  //     });

  //     setPhoto({});
  //   } else {
  //     // eslint-disable-next-line no-alert

  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Campos incompletos',
  //       text: '¡Complete todos los campos!',
  //     });
  //   }
  // }

  // useEffect(() => {
  //   const date = input.expirationDate;
  //   const arr = date.split('-');
  //   const year = arr.shift();
  //   arr.push(year);
  //   const expirationDate = arr.join('/');
  //   setInput({ ...input, expirationDate });
  // }, [input.expirationDate]);

  // // eslint-disable-next-line prefer-const
  // let productPhoto = logo;

  // function ValidateQuantity(event) {
  //   const { name, value } = event.target;

  //   setInput({
  //     ...input,
  //     [name]: value,
  //   });

  //   if (value < 0) {
  //     setError({
  //       error,
  //       [name]: 'El numero debe ser > a 0',
  //     });
  //   } else {
  //     setError({
  //       ...error,
  //       [name]: '',
  //     });
  //   }
  // }

  // function resetError(event) {
  //   const { value } = event.target;

  //   if (!value) {
  //     setError({});
  //   }
  // }

  // const handleChangeImage = ({ target }) => {
  //   const image = target.files[0];

  //   const preview = document.querySelector('#productImage img');

  //   if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
  //     document.querySelector('#datosImagen').value = '';

  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error al subir la imagen',
  //       text: '¡La imagen debe estar en formato JPG o PNG!',
  //     });
  //   } else if (Number(image.size) > 2000000) {
  //     document.querySelector('#datosImagen').value = '';

  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error al subir la imagen',
  //       text: '¡La imagen no debe pesar más de 2 MB!',
  //     });
  //   } else {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       preview.src = reader.result;
  //     };

  //     reader.readAsDataURL(image);
  //     // eslint-disable-next-line prefer-destructuring
  //     // productPhoto = target.files[0];
  //     setPhoto(target.files[0]);
  //   }
  // };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Steps />
      </div>

      <div className={styles.patern}>
        <div className={styles.carrete}>
          <CarreteImg />
        </div>
        <div>
          <div className={styles.formcont}>
            <form className={styles.formcont}>
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
                        // onChange={handleChangeImage}
                      />

                      <Avatar
                        // src={productPhoto}
                        alt="logo"
                        id="productImage"
                        sx={{ width: 150, height: 150, cursor: 'pointer' }}
                      />
                    </label>
                  </div>

                  <div className={styles.divcategorias}>
                    <Categoria
                    // setInput={setInput}
                    // input={input}
                    // // categories={categories}
                    // // eslint-disable-next-line react/jsx-no-bind
                    // handleOnChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className={styles.cont}>
                  <div className={styles.contname}>
                    <div className={styles.divnuevolote}>
                      <NuevoLote
                      //   setInput={setInput}
                      //   input={input}
                      //   // eslint-disable-next-line react/jsx-no-bind
                      //   handleOnChange={handleOnChange}
                      // />
                      />
                    </div>
                    <div className={styles.divprecio}>
                      <Fecha
                      // setInput={setInput}
                      // input={input}
                      // // eslint-disable-next-line react/jsx-no-bind
                      // handleOnChange={handleOnChange}
                      />
                    </div>
                  </div>

                  <div className={styles.contamout}>
                    <div className={styles.divcantidad}>
                      <Cantidad
                      // setInput={setInput}
                      // input={input}
                      // name="quantity"
                      // // eslint-disable-next-line react/jsx-no-bind
                      // handleOnChange={handleOnChange}
                      // // eslint-disable-next-line react/jsx-no-bind
                      // ValidateQuantity={ValidateQuantity}
                      // // eslint-disable-next-line react/jsx-no-bind
                      // resetError={resetError}
                      />
                      <div classsName={styles.quantityError}>
                        {/* <p className={styles.error}>
                    {error.quantity && error.quantity}
                  </p> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Descripcion
                  // className={styles.description}
                  // setInput={setInput}
                  // input={input}
                  // // eslint-disable-next-line react/jsx-no-bind
                  // handleOnChange={handleOnChange}
                  />
                </div>
                <button type="submit" className={styles.btnready}>
                  DONAR PRODUCTO !!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
