import * as React from 'react';
// import deleteLogo from '../../assets/deleteIcon';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './Usuarios.module.css';
import { apiWithToken } from '../../services/api';

const columns = [
  { id: 'nombre', label: 'NOMBRE', minWidth: 170 },
  {
    id: 'email',
    label: 'EMAIL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'telefono',
    label: 'TELEFONO',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rol',
    label: 'ROL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'eliminar',
    label: 'ELIMINAR',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(nombre, email, telefono, rol, eliminar) {
  return {nombre, email, telefono, rol, eliminar};
}

export default function Usuarios({users, company,  setUsers }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])
  




  const handleDelete = (id) => {

    apiWithToken.delete(`/companies/user/${id}`).then(() => {
      apiWithToken.get('/companies/users').then((response) => {
        setUsers(response.data);
      });
    })

  }

  React.useEffect(() => {
    const finalRows = []
   users.forEach(user => {
      finalRows.push(createData(user.name, user.email, user.phone, (user.id === company.ownerId ? 'Dueño' : 'Empleado'), (user.id !== company.ownerId && <button type="button" onClick={() => {handleDelete(user.id)}}>X</button>)))
      setRows(finalRows)
    })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={styles.users} sx={{ width: '100%', overflow: 'hidden' }}>
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
              /* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */
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
