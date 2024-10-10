import apiClient from "@/lib/axios";

export const GetProperties = ()=> {
    return apiClient.get('/properties');
  };
