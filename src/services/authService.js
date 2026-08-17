
import api from "./api";

// ==============================
// REGISTER
// ==============================

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/register/",
    data
  );

  return response.data;
};


// ==============================
// LOGIN
// ==============================

export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/login/",
    data
  );

  return response.data;
};


// ==============================
// LOGOUT
// ==============================

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout/"
  );

  return response.data;
};


// ==============================
// GET PROFILE
// ==============================

export const getProfile = async () => {
  const response = await api.get(
    "/auth/profile/"
  );

  return response.data;
};


// ==============================
// UPDATE PROFILE - PUT
// multipart/form-data
// ==============================

export const updateProfile = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("district", data.district);

  if (data.profile_picture) {
    formData.append(
      "profile_picture",
      data.profile_picture
    );
  }

  const response = await api.put(
    "/auth/profile/",
    formData
  );

  return response.data;
};


// ==============================
// UPDATE PROFILE - PATCH
// multipart/form-data
// ==============================

export const patchProfile = async (data) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.email !== undefined) {
    formData.append("email", data.email);
  }

  if (data.district !== undefined) {
    formData.append("district", data.district);
  }

  if (data.profile_picture) {
    formData.append(
      "profile_picture",
      data.profile_picture
    );
  }

  const response = await api.patch(
    "/auth/profile/",
    formData
  );

  return response.data;
};

