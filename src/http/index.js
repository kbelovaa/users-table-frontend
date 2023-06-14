import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

console.log(1, process.env.REACT_APP_API_URL);
console.log(2, REACT_APP_API_URL);
console.log(3, process.env.API_URL);

const authInterceptor = (config) => {
  const authConfig = config;
  authConfig.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return authConfig;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
