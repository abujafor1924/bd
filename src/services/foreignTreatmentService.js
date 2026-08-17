import api from "./api";

export const getForeignTreatmentCountries = async () => {
  const response = await api.get(
    "/foreign-treatments/countries/"
  );

  return response.data;
};

export const getForeignTreatmentCountry = async (id) => {
  const response = await api.get(
    `/foreign-treatments/countries/${id}/`
  );

  return response.data;
};

export const getCountryHospitals = async (countryId) => {
  const response = await api.get(
    `/foreign-treatments/countries/${countryId}/hospitals/`
  );

  return response.data;
};

export const getForeignTreatmentHospitals = async () => {
  const response = await api.get(
    "/foreign-treatments/hospitals/"
  );

  return response.data;
};

export const getForeignHospitalDetails = async (hospitalId) => {
  const response = await api.get(
    `/foreign-treatments/hospital-details/${hospitalId}/`
  );

  return response.data;
};