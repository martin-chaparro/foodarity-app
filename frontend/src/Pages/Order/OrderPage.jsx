/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCart } from '../../redux/actions/cartActions';
import { apiWithToken } from '../../services/api';
import styles from './OrderPage.module.css';

function createData(lote, quantity, price, totalPrice) {
  return { lote, quantity, price, totalPrice };
}

function OrderPage() {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart.cart);
  const [cart, setCart] = React.useState();
  const [rows, setRows] = React.useState();
  const [select, setSelect] = React.useState();
  const [allowSubmit, setAllowSubmit] = React.useState(false)


  useEffect(() => {
    if (!params.id) {
      navigate('/home');
    }
    dispatch(getCart());
  }, []);

  useEffect(() => {
    const data = initialCart.filter(
      (item) => item.product.company_id !== params.id
    );
    setCart(data);
  }, [initialCart]);

  useEffect(() => {
    const finalRows = cart?.map((item) =>
      createData(
        item.product.lote,
        item.quantity,
        item.product.price,
        item.product.price * item.quantity
      )
    );
    setRows(finalRows);
  }, [cart]);

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return Intl.NumberFormat('de-DE').format(total);
  };

  const handleSelect = (e) => {
    setSelect({ [e.target.id]: true });
    if (e.target.id === '1') {
      setAllowSubmit(true)
    } else {
      setAllowSubmit(false)
    }
  };

  const handleSubmit = () => {
    const finalOrder = {
      date: new Date(),
      paymentMethod: Object.keys(select)[0],
      company_id: cart[0].product.company_id,
      quantityByProduct:cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
      }))
    }
    apiWithToken.post('/orders', finalOrder).then(res => {
      if (res.status === 200) {
        // eslint-disable-next-line no-alert
        alert('COMPRA REALIZADA CON EXITO')
        navigate('/home')
      } else {
        // eslint-disable-next-line no-alert
        alert(res.data)
      }
    })
  }

  return (
    <div className={styles.divGenrelContainer}>
      {cart && (
        <div className={styles.generalHeader}>
        <div className={styles.purchaseDetail}>
          <p>Detalle de su compra:</p>
        </div>
        <div className={styles.divCompanyName}>
          <h2 className={styles.companyName}>{cart[0]?.product.company.name}</h2>
          </div>
          </div>
      )}
      <TableContainer className={styles.tableContainer}component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>LOTE</TableCell>
              <TableCell align="right">CANTIDAD</TableCell>
              <TableCell align="right">PRECIO x U</TableCell>
              <TableCell align="right">PRECIO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.lote}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.lote}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">
                  ${Intl.NumberFormat('de-DE').format(row.price)},00
                </TableCell>
                <TableCell align="right">
                  ${Intl.NumberFormat('de-DE').format(row.totalPrice)},00
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row">
                {}
              </TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">
                <h3>TOTAL</h3>
                <b>${cart && getTotalPrice()},00</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.agreementDiv}>
        <div className={styles.payMethod}>
          <p>Seleccione metodo de pago:</p>
        </div>
        <div className={styles.methodsContainer}>
        <label>
          <input
            type="radio"
            checked={select && select[1]}
            id="1"
            onChange={handleSelect}
            onClick={handleSelect}
          />
          <span>Acordar con el vendedor</span>
        </label>
        <label className={styles.mp}>
          <input
            type="radio"
            checked={select && select[2]}
            id="2"
            onChange={handleSelect}
            onClick={handleSelect}
          />
          <span>Mercado Pago</span>
        </label>
      </div>
      <div className={styles.separator}>
        separator
      </div>
       <div className={styles.buyButtonDiv}>
        <button className={styles.buyButton} type='submit' disabled={!allowSubmit} onClick={handleSubmit}>COMPRAR</button>
      </div>
      </div> 
    </div>
  );
}

export default OrderPage;
