import { useState } from 'react';
import { login, register } from '@/services/authService';

export const useHandleAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await register(formData);
      return response.data;
    } catch (error:any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await login(formData);
      return response.data;
    } catch (error:any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleRegister,
    handleLogin
  };
};
