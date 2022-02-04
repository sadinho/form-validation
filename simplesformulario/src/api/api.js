import axios from 'axios';

const api = axios.create({
  baseURL: 'https://61e036950f3bdb0017934eb0.mockapi.io/api/',
});

export default api;