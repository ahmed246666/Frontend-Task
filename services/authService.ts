import apiClient from '../lib/axios';

export const register = (formData: FormData) => {
  return apiClient.post('/register', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const login = (formData: FormData) => {
  return apiClient.post('/login', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

