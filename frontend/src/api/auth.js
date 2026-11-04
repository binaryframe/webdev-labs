import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5050/api' });

export const login = values => api.post('/login', values).then(res => res.data);
export const register = values => api.post('/register', values).then(res => res.data);
