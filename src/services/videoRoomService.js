import api from "./api";

// =====================================
// GET MY VIDEO CONSULTATION ROOMS
// =====================================

export const getMyVideoRooms = async () => {
  const response = await api.get("/video-rooms/rooms/my-rooms/");
  return response.data;
};

// =====================================
// GET AGORA TOKEN
// =====================================

export const getAgoraToken = async (roomId) => {
  const response = await api.get(
    `/video-rooms/rooms/${roomId}/token/`
  );

  return response.data;
};