import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import jwt_decode from 'jwt-decode';
import { Button, ButtonToolbar, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../pages/index';
import { fetchUsers, countUsers, changeStatus, remove } from '../http/userAPI';
import Pages from './Pages';

const UsersTable = observer(() => {
  const { user, table } = useContext(Context);
  const [masterChecked, setMasterChecked] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    countUsers().then((data) => table.setTotalCount(data.count));
  }, []);

  useEffect(() => {
    fetchUsers(table.page, table.limit).then((data) => table.setUsers(data));
  }, [table.page]);

  const onMasterCheck = (e) => {
    const selectedIds = e.target.checked ? table.users.map((user) => user.id) : [];
    setSelectedList(selectedIds);
    setMasterChecked(e.target.checked);
  };

  const onItemCheck = (e, id) => {
    const selectedIds = e.target.checked ? [...selectedList, id] : [...selectedList.filter((item) => item !== id)];
    setSelectedList(selectedIds);
    setMasterChecked(table.users.length === selectedIds.length);
  };

  const setStatus = (status) => {
    changeStatus(selectedList, status)
      .then(() => fetchUsers())
      .then((data) => table.setUsers(data))
      .then(() => {
        if (selectedList.includes(jwt_decode(localStorage.getItem('token')).id) && status === 'blocked') {
          logOut();
        }
      });
  };

  const deleteUser = () => {
    remove(selectedList)
      .then(() => fetchUsers(table.page, table.limit))
      .then((data) => table.setUsers(data))
      .then(() => countUsers())
      .then((data) => table.setTotalCount(data.count))
      .then(() => {
        if (selectedList.includes(jwt_decode(localStorage.getItem('token')).id)) {
          logOut();
        }
      });
  };

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <Container className="d-flex align-items-center flex-column">
      <ButtonToolbar style={{ width: '60rem' }}>
        <Button onClick={() => setStatus('blocked')} className="m-2" variant="secondary">
          Block <FontAwesomeIcon icon={faLock} />
        </Button>
        <Button onClick={() => setStatus('active')} className="m-2" variant="secondary">
          Unblock <FontAwesomeIcon icon={faUnlock} />
        </Button>
        <Button onClick={deleteUser} className="m-2" variant="secondary">
          Delete <FontAwesomeIcon icon={faUserXmark} />
        </Button>
      </ButtonToolbar>
      <Table className="mt-3" striped bordered hover style={{ width: '60rem' }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="form-check-input"
                checked={masterChecked}
                onChange={(e) => onMasterCheck(e)}
              />
            </th>
            <th>id</th>
            <th>Name</th>
            <th>e-mail</th>
            <th>Registration date</th>
            <th>Last login date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {table.users.map((user) => (
            <tr key={user.id}>
              <td scope="row">
                <input
                  type="checkbox"
                  checked={selectedList.includes(user.id)}
                  className="form-check-input"
                  onChange={(e) => onItemCheck(e, user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.reg_date).toLocaleDateString()}</td>
              <td>{new Date(user.last_visit_date).toLocaleDateString()}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pages />
    </Container>
  );
});

export default UsersTable;
