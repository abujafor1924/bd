
import api from "./api";

// ========================================
// Popular Categories
// ========================================

export const getPopularCategories = async () => {
  const response = await api.get(
    "/popular-service/categories/"
  );

  return response.data;
};


// ========================================
// Popular Sub Categories
// ========================================

export const getPopularSubCategories = async (categoryId) => {
  const response = await api.get(
    `/popular-service/subcategories/?category=${categoryId}`
  );

  return response.data;
};


// ========================================
// Popular Doctors
// ========================================

export const getPopularDoctors = async (subcategoryId) => {
  const response = await api.get(
    `/popular-service/doctors/?subcategories=${subcategoryId}`
  );

  return response.data;
};


// ========================================
// Popular Doctor Details
// ========================================

export const getPopularDoctorDetails = async (id) => {
  const response = await api.get(
    `/popular-service/doctors/${id}/`
  );

  return response.data;
};

