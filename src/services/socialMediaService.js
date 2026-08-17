
import api from "./api";

// Get all social media services
export const getSocialMediaServices = async () => {
  const response = await api.get(
    "/package/social-media-services/"
  );

  return response.data;
};

// Get single social media service
export const getSocialMediaServiceDetails = async (id) => {
  const response = await api.get(
    `/package/social-media-services/${id}/`
  );

  return response.data;
};

