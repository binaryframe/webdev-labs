import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5050/api/luminaires' });

export const getLuminaires = (filters = {}) => {
  const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
  return api.get('/', { params }).then(res => res.data);
};

export const getLuminaire = id => api.get(`/${id}`).then(res => res.data);
