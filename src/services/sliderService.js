import api from "./api";

const fixImageUrl = (url) => {
  if (!url) return url;

  return url.replace(
    "http://66.29.151.40:6060",
    ""
  );
};

// ==============================
// SLIDER ONE
// ==============================

export const getSliders = async () => {
  const response = await api.get(
    "/slider/slider-one/"
  );

  return response.data.map((slider) => ({
    ...slider,
    image: fixImageUrl(slider.image),
  }));
};

export const getSliderDetails = async (id) => {
  const response = await api.get(
    `/slider/slider-one/${id}/`
  );

  return {
    ...response.data,
    image: fixImageUrl(response.data.image),
  };
};

// ==============================
// SLIDER TWO
// ==============================

export const getSliderTwo = async () => {
  const response = await api.get(
    "/slider/slider-two/"
  );

  return response.data.map((slider) => ({
    ...slider,
    image: fixImageUrl(slider.image),
  }));
};