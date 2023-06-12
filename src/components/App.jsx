import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { check } from '../http/authAPI';
import { Context } from '../pages/index';
import NavBar from './NavBar';
import UsersTable from './UsersTable';
import Auth from './Auth';

const App = observer(() => {
  const { user } = useContext(Context);
  const [defaultRoute, setDefaultRoute] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      check().then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
        setDefaultRoute('/users');
      });
    } else {
      setDefaultRoute('/login');
    }
  }, []);

  return (
    <div className="content">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {user.isAuth && <Route path="/users" element={<UsersTable />} />}
          <Route path="/login" element={<Auth />} />
          <Route path="/registration" element={<Auth />} />
          <Route path="/*" element={<Navigate to={defaultRoute} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
});

export default App;
