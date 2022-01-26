/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';

import { Layout } from '../../../layout/Layout';
import TotalUsers from './cards/TotalUsers';
import TotalCompanies from './cards/TotalCompanies';
import TotalOrders from './cards/TotalOrders';
import { apiWithToken } from '../../../../services/api';
import ChartUserByRegister from './cards/ChartUserByRegister';
import ChartCompanyByType from './cards/ChartCompanyByType';
import ChartOrderByPayMethod from './cards/ChartOrderByPayMethod';
import { finishLoading, startLoading } from '../../../../redux/actions/ui';

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalCompanies, setTotalCompanies] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [usersByRegisterMethod, setUsersByRegisterMethod] = useState(null);
  const [companiesByType, setCompaniesByType] = useState(null);
  const [ordersBypaymenthod, setOrdersBypaymenthod] = useState(null);

  useEffect(async () => {
    dispatch(startLoading())
    const response = await apiWithToken.get(`/admin/dashboard`);
    setTotalUsers(response.data.totalUsers);
    setTotalCompanies(response.data.totalCompanies);
    setTotalOrders(response.data.totalOrders);
    setUsersByRegisterMethod(response.data.usersByRegisterMethod);
    setCompaniesByType(response.data.companiesByType);
    setOrdersBypaymenthod(response.data.ordersBypaymenthod);
    dispatch(finishLoading())
  }, []);


  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Dashboard Screen
      </Typography>
      <Divider />
      <Grid container spacing={3} mt={2}>
        {totalUsers && (
          <Grid item xs={12} sm={6} md={4}>
            <TotalUsers quantity={totalUsers} />
          </Grid>
        )}
        {totalCompanies && (
          <Grid item xs={12} sm={6} md={4}>
            <TotalCompanies quantity={totalCompanies} />
          </Grid>
        )}
        {(totalOrders && totalOrders > 0) && (
          <Grid item xs={12} sm={6} md={4}>
            <TotalOrders quantity={totalOrders} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} mt={2}>
        {usersByRegisterMethod && (
          <Grid item xs={12} md={6} lg={4}>
            <ChartUserByRegister
              directo={usersByRegisterMethod[1]?.cant}
              google={usersByRegisterMethod[0]?.cant}
            />
          </Grid>
        )}
        {companiesByType && (
          <Grid item xs={12} md={6} lg={4}>
            <ChartCompanyByType
              ong={companiesByType[1]?.cant}
              commerce={companiesByType[0]?.cant}
            />
          </Grid>
        )}
        {(ordersBypaymenthod && ordersBypaymenthod.lenght > 1) && (
          <Grid item xs={12} md={6} lg={4}>
            <ChartOrderByPayMethod directo={ordersBypaymenthod[1]?.cant} mercadopago={ordersBypaymenthod[0]?.cant} />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};
