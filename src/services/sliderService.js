
import api from "./api";

// ==============================
// SLIDER ONE
// ==============================

export const getSliders = async () => {
  const response = await api.get(
    "/slider/slider-one/"
  );

  return response.data;
};

export const getSliderDetails = async (id) => {
  const response = await api.get(
    `/slider/slider-one/${id}/`
  );

  return response.data;
};


// ==============================
// SLIDER TWO
// ==============================

export const getSliderTwo = async () => {
  const response = await api.get(
    "/slider/slider-two/"
  );

  return response.data;
};

