import { $authHost } from './index';

export const fetchUsers = async (page, limit = 10) => {
  const { data } = await $authHost.get('users', { params: { page, limit } });
  return data;
};

export const countUsers = async () => {
  const { data } = await $authHost.get('users/count');
  return data;
};

export const changeStatus = async (id, status) => {
  const { data } = await $authHost.patch('users', { id, status });
  return data;
};

export const remove = async (id) => {
  const { data } = await $authHost.patch('users/delete', { id });
  return data;
};
