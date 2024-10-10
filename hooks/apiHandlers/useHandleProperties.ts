import { GetProperties } from "@/services/propertiesService";
import { useState } from "react";

export const useHandleProperties = () => {
  const [loading, setLoading] = useState(false);

  const handleGetProperties = async () => {
    setLoading(true);
    try {
      const response = await GetProperties();
      return response.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    handleGetProperties,
  };
};
