import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../pages/index';
import { login, registration } from '../http/authAPI';

const Auth = observer(() => {
  const { user, table } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  const handleClick = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(name, email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      table.setPage(1);
      navigate('/users');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 70 }}>
      <Card className="p-5" style={{ width: '30rem' }}>
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
        <Form className="d-flex flex-column">
          {isLogin ? (
            <></>
          ) : (
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-3"
              type="text"
              placeholder="Enter your name"
              required
            />
          )}
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3"
            type="email"
            placeholder="Enter your e-mail"
            required
          />
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Button className="mt-3 mb-3" variant="outline-primary" onClick={handleClick}>
            {isLogin ? 'Log in' : 'Register'}
          </Button>
          {isLogin ? (
            <div style={{ textAlign: 'center' }}>
              <NavLink to={'/registration'} style={{ textDecoration: 'none' }}>
                Register
              </NavLink>{' '}
              if you don't have an account
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <NavLink to={'/login'} style={{ textDecoration: 'none' }}>
                Log in
              </NavLink>{' '}
              if you have an account
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
