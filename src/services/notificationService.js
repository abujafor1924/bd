import api from "../services/api";

const notificationService = {
  getMyNotifications: async (page = 1) => {
    const response = await api.get(
      `/notifications/my-notifications/?page=${page}`
    );

    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.patch(
      `/notifications/my-notifications/${id}/read/`,
      {
        is_read: true,
      }
    );

    return response.data;
  },
};

export default notificationService;