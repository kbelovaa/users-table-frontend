import jwtDecode from 'jwt-decode';
import { $authHost, $host } from './index';

export const registration = async (name, email, password) => {
  const { data } = await $host.post('registration', { name, email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
