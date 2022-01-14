import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import perfil from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';

export const OrdersScreen = () => {
  const handleChangePage = () => {};
  const handleChangeRowsPerPage = () => {};

  const handleEdit = (event) => {
    console.log(event.target.attributes.dataid.value);
  };
  const handleDelete = (event) => {
    console.log(event.target.attributes.dataid.value);
  };
  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Gestion de Ordenes
      </Typography>
      <Divider />
      <Grid container spacing={3} pt={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TableContainer>
              <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="standard"
                style={{ backgroundColor: 'white', marginBottom: '2em' }}
              />
              <Table mt={20}>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Typo</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography noWrap>1</Typography>
                    </TableCell>
                    <TableCell>
                      <Avatar alt="Remy Sharp" src={perfil} />
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>Macro</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>Comercio</Typography>
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        <Button
                          variant="outlined"
                          color="info"
                          startIcon={<EditIcon />}
                          dataid="1"
                          onClick={handleEdit}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          style={{ marginLeft: '1em' }}
                          color="error"
                          startIcon={<DeleteIcon />}
                          dataid="1"
                          onClick={handleDelete}
                        >
                          Eliminar
                        </Button>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={5} sx={{ py: 3 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={1}
              rowsPerPage={5}
              page={0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};
