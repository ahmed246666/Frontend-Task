import apiClient from "@/lib/axios";

export const PostNewsLetter = (formData: FormData) => {
  return apiClient.post("/newsletter",formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};