import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CompaniesScreen } from '../components/pages/home/companies/CompaniesScreen';
import { CompanyUpdate } from '../components/pages/home/companies/CompanyUpdate';
import { DashboardScreen } from '../components/pages/home/dashboard/DashboardScreen';
import { OrdersScreen } from '../components/pages/home/orders/OrdersScreen';
import { ProductsScreen } from '../components/pages/home/products/ProductsScreen';
import { UserAdd } from '../components/pages/home/users/UserAdd';
import { UserResetPassword } from '../components/pages/home/users/UserResetPassword';
import { UsersScreen } from '../components/pages/home/users/UsersScreen';
import { UserUpdate } from '../components/pages/home/users/UserUpdate';

export const HomeRoute = () => {
  return (
    <Routes>
      <Route path="users" element={<UsersScreen />} />
      <Route path="users/update/:id" element={<UserUpdate />} />
      <Route path="users/add" element={<UserAdd />} />
      <Route path="users/resetpass/:id" element={<UserResetPassword />} />
      <Route path="companies" element={<CompaniesScreen />} />
      <Route path="companies/:id" element={<CompanyUpdate />} />

      <Route path="products" element={<ProductsScreen />} />
      <Route path="orders" element={<OrdersScreen />} />

      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};
