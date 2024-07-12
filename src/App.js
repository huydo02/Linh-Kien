import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import axios from 'axios';
import AdminLayout from './layouts/admin.layout';
import AuthLayout from './layouts/auth.layout';
import ClientLayout from './layouts/client.layout';
import MasterLayout from './assets/layouts/admin/MasterLayout';
import Home from './assets/components/home/Home';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='auth/*' element={<AuthLayout />} />
        <Route path='admin/*' element={<MasterLayout />} />
        <Route path='/*' element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;
