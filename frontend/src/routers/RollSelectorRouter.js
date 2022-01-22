import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RollSelector from '../Pages/Rollselector/RollSelector.';
import RegisterFormCommerce from '../Pages/RegisterCommerce/RegisterFormCommerce';
import RegisterFormCommerceTest from '../Pages/RegisterCommerce/RegisterFormCommerceTest';
import RegisterFormONG from '../Pages/RegisterONG/RegisterFormONG';

export function RollSelectorRouter() {
  return (
    <Routes>
      <Route path="/" element={<RollSelector />} />
      <Route path="/registerformcommerce" element={<RegisterFormCommerce />} />
      <Route
        path="/registerformcommercetest"
        element={<RegisterFormCommerceTest />}
      />
      <Route path="/register_form_ong" element={<RegisterFormONG />} />
    </Routes>
  );
}
