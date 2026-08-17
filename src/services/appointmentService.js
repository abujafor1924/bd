import api from "./api";

// ==========================================
// CREATE APPOINTMENT
// ==========================================

export const createAppointment = async (appointmentData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Authentication required.");
  }

  const response = await api.post(
    "/auth/appointments/create/",
    appointmentData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("Create Appointment API Response:", response.data);

  return response.data;
};

// ==========================================
// GET APPOINTMENTS
// ==========================================

export const getAppointments = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Authentication required.");
  }

  const response = await api.get(
    "/auth/appointments/",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("Get Appointments API Response:", response.data);

  return response.data;
};