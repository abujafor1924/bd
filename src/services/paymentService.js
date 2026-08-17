import api from "./api";

// ==========================================
// SUBMIT PAYMENT
// ==========================================

export const submitPayment = async (paymentData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Authentication required.");
  }

  const response = await api.post(
    "/auth/payments/submit/",
    paymentData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};