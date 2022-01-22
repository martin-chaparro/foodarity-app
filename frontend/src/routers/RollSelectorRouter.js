import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RollSelector from '../Pages/Rollselector/RollSelector.';
import RegisterFormCommerce from '../Pages/RegisterCommerce/RegisterFormCommerce';
import RegisterFormCompany from '../Pages/RegisterCommerce/RegisterFormCompany';
import RegisterFormONG from '../Pages/RegisterONG/RegisterFormONG';

export function RollSelectorRouter() {
  return (
    <Routes>
      <Route path="/" element={<RollSelector />} />
      <Route path="/registerformcommerce" element={<RegisterFormCommerce />} />
      <Route path="/register_form_ong" element={<RegisterFormONG />} />
      <Route
        path="/registerformcommercetest"
        element={<RegisterFormCompany type={1} />}
      />
      <Route
        path="/registerformongtest"
        element={<RegisterFormCompany type={2} />}
      />
    </Routes>
  );
}
