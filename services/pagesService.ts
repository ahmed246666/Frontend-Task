import apiClient from "@/lib/axios";
// Our Partnrs Request
export const GetOurPartners = () => {
  return apiClient.get("/partners");
};
// Contact Us Request
export const PostContactUs = (formData: FormData) => {
  return apiClient.post("/contact",formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
