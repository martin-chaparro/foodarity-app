import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CompaniesScreen } from '../components/pages/home/companies/CompaniesScreen';
import { DashboardScreen } from '../components/pages/home/dashboard/DashboardScreen';
import { OrdersScreen } from '../components/pages/home/orders/OrdersScreen';
import { ProductsScreen } from '../components/pages/home/products/ProductsScreen';
import { UsersScreen } from '../components/pages/home/users/UsersScreen';

export const HomeRoute = () => {
  return (
    <Routes>
      <Route path="users" element={<UsersScreen />} />
      <Route path="companies" element={<CompaniesScreen />} />

      <Route path="products" element={<ProductsScreen />} />
      <Route path="orders" element={<OrdersScreen />} />

      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};
