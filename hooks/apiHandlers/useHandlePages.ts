import { GetOurPartners, PostContactUs } from "@/services/pagesService";
import { useState } from "react";

export const useHandlePages = () => {
  const [loading, setLoading] = useState(false);

  const handleGetOurPartners = async () => {
    setLoading(true);
    try {
      const response = await GetOurPartners();
      return response.data;
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePostContactUs = async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await PostContactUs(formData);
      return response.data;
    } catch (error:any) {
      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleGetOurPartners,
    handlePostContactUs,
  };
};
