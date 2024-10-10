import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sunchase.backend.aait-d.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
