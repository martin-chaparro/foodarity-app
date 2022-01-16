import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './Orders.module.css';

const columns = [
  { id: 'comprador', label: 'COMPRADOR', minWidth: 170 },
  { id: 'pago', label: 'PAGO', minWidth: 170 },
  { id: 'lote', label: 'LOTE', minWidth: 170 },
  {
    id: 'vendidos',
    label: 'VENDIDOS',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'total',
    label: 'TOTAL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'precio',
    label: 'PRECIO',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fecha',
    label: 'FECHA COMPRA',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(comprador , pago,lote, vendidos, total, precio, fecha ) {
  // const density = population / size;
  return { comprador, pago ,lote, vendidos, total, precio, fecha };
}

/* const rows = [
  createData('Lote pre-pizzas', 2, 120, '12/06/2022'),
  createData('Lote facturas', '3', 400, '12/06/2022'),
  createData('Lote tortas', '1', 100, '12/06/2022'),
  createData('Lote panes', '4', 327, '12/06/2022'),
  createData('Lote pan Rayado', '4', 376, '12/06/2022'),
  createData('Lote combo pasteleria/rotiseria', '6', 2547, '12/06/2022'),
]; */

export default function Orders({orders}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(orders)
  const rows = orders.map(order => 
    
    createData(order.buyer.name, order.paymentMethod.method, order.product.lote, order.quantity, order.product.totalQuantity, order.product.price, order.date),
  )

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={styles.orders} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: 'lightgray',
                    fontWeight: '700',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
