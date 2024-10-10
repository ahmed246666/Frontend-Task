import { PostNewsLetter } from "@/services/newsletterService";
import { useState } from "react";

export const useHandleNewsLetter = () => {
  const [loading, setLoading] = useState(false);

  const handlePostNewsLetter = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await PostNewsLetter(formData);
      return response.data;
    } catch (error:any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handlePostNewsLetter,
  };
};
