import React from 'react';
import './App.css';

import Dashboard from './pages/Dashboard';

import {
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import AddPassword from './pages/passwords/AddPassword';
import Container from './components/ui/Container';
import ViewPassword from './pages/passwords/ViewPassword';
import Header from './components/ui/Header';
import NotFound from './pages/errors/404';
import EditPassword from './pages/passwords/EditPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Auth from './auth/Auth';

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

function AuthLayout() {
  return (
    <Container maxWidth={285}>
      <div style={{ paddingTop: 32 }}>
        <Outlet />
      </div>
    </Container>
  )
}

function App() {

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route element={<Auth />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/passwords" element={<Dashboard />} />
          <Route path="/dashboard/passwords/:passwordId" element={<ViewPassword />} />
          <Route path="/dashboard/passwords/edit/:passwordId" element={<EditPassword />} />
          <Route path="/dashboard/passwords/new" element={<AddPassword />} />

          <Route path="/404" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

