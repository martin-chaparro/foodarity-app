import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import estilos from './Compras.module.css';

const columns = [
  {
    id: 'ordenid',
    label: 'ORDEN NO.',
    minWidth: 170,
    align: 'center',
  },
  { id: 'vendedor', label: 'VENDEDOR', minWidth: 170, align: 'center' },
  { id: 'lote', label: 'LOTE', minWidth: 170, align: 'center' },
  {
    id: 'unidades',
    label: 'UNIDADES',
    minWidth: 170,
    align: 'center',
  },
  // {
  //   id: 'precio',
  //   label: 'PRECIO UNITARIO',
  //   minWidth: 170,
  //   align: 'center',
  // },
  {
    id: 'total',
    label: 'TOTAL',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'metodo',
    label: 'METODO DE PAGO',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'fecha',
    label: 'FECHA COMPRA',
    minWidth: 170,
    align: 'center',
  },
];

function createData(
  ordenid,
  vendedor,
  lote,
  unidades,
  precio,
  total,
  metodo,
  fecha
) {
  // const total = precio * unidades;
  return { ordenid, vendedor, lote, unidades, precio, total, metodo, fecha };
}

export default function Compras({ orders }) {
  console.log(orders);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = orders.map((order) =>
    createData(
      order.id,
      order.company.name,
      order.quantityByProduct[0].product.lote,
      order.quantityByProduct[0].quantity,
      `$ ${order.quantityByProduct[0].product.price}`,
      `$ ${
        order.quantityByProduct[0].product.price *
        order.quantityByProduct[0].quantity
      }`,
      order.paymentMethod.method,
      order.date
    )
  );

  return (
    <div className={estilos.parent}>
      <Box
        sx={{
          marginTop: 1,
        }}
      >
        <div className={estilos.titulo}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            marginBottom="1em"
            sx={{ color: '#7ED957', marginTop: 1 }}
          >
            HISTORIAL DE COMPRAS
          </Typography>
        </div>
        <Paper sx={{ width: '50%', overflow: 'hidden' }}>
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
                        backgroundColor: '#7ED957',
                        color: '#3E2463',
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        style={{
                          backgroundColor: 'white',
                          color: '#3E2463',
                          fontWeight: '700',
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                backgroundColor: 'white',
                                color: '#8865b9',
                                fontWeight: '700',
                              }}
                            >
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
            style={{
              backgroundColor: 'white',
              color: '#8865b9',
              fontWeight: '700',
            }}
          />
        </Paper>
      </Box>
    </div>
  );
}
