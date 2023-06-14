import axios from 'axios';

const $host = axios.create({
  baseURL: "https://users-table-api.onrender.com/",
});

const $authHost = axios.create({
  baseURL: "https://users-table-api.onrender.com/",
});

const authInterceptor = (config) => {
  const authConfig = config;
  authConfig.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return authConfig;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
