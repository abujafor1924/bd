import api from "./api";

const getMedicalAccessoryCategories = async () => {
  const response = await api.get("/medical-accessories/categories/");
  return response.data;
};

export default {
  getMedicalAccessoryCategories,
};