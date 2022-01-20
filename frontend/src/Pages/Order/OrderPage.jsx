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

function createData(name, price, fat, carbs, protein) {
  return { name, price, fat, carbs, protein };
}


function OrderPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart.cart);
  const [cart, setCart] = React.useState();
  
  const rows = [
    createData(cart?.map((item) => item.product.lote), 159, 6.0, 24, 4.0),
  ];
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

  return (
    <div>
      <br />
      <br />
      <br />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <br />

      {cart?.map((item) => (
        <div>{item.product.lote}</div>
      ))}
      <div>
        <label>
          <input type="radio" checked={false} onChange={console.log('asd ')}/>
          <span>Mercado Pago</span>
        </label>
        <label>
          <input type="radio" />
          <span>Acordar con el vendedor</span>
        </label>
      </div>
    </div>
  );
}

export default OrderPage;
