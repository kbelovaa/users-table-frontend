import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Context } from '../pages/index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <Navbar className="justify-content-end" bg="dark" variant="dark">
      {user.isAuth ? (
        <Nav>
          <Button className="m-2" variant="outline-light" onClick={logOut}>
            Log out
          </Button>
        </Nav>
      ) : (
        <Nav>
          <Button className="m-2" variant="outline-light" onClick={() => navigate('/registration')}>
            Sign up
          </Button>
          <Button className="m-2" variant="outline-light" onClick={() => navigate('/login')}>
            Log in
          </Button>
        </Nav>
      )}
    </Navbar>
  );
});

export default NavBar;
