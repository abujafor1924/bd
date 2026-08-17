import api from "./api";

const followupService = {
  getDoctorFollowups: async (page = 1) => {
    const response = await api.get("/auth/doctor-followups/", {
      params: { page },
    });

    return response.data;
  },
};

export default followupService;