import api from "./api";

export const getCollaborations = async () => {
  const response = await api.get("/package/collaborations/");
  return response.data;
};

export const getCollaborationDetails = async (id) => {
  const response = await api.get(`/package/collaborations/${id}/`);
  return response.data;
};