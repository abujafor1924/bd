import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Hash,
  WalletCards,
  Stethoscope,
} from "lucide-react";

import { submitPayment } from "../services/paymentService";

function AppointmentPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================================
  // APPOINTMENT DATA
  // ==========================================

  const appointment = location.state?.appointment;

  // ==========================================
  // FORM STATE
  // ==========================================

  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bkash");

  // ==========================================
  // UI STATE
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // APPOINTMENT ID
  // ==========================================

  const appointmentId =
    appointment?.id || id;

  // ==========================================
  // CHECK APPOINTMENT
  // ==========================================

  if (!appointmentId) {
    return (
      <section className="w-full pb-12">

        <div
          className="
            mx-auto
            max-w-2xl
            rounded-[32px]
            border
            border-[#EEEEEE]
            bg-white
            p-8
            text-center
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          "
        >

          <div
            className="
              mx-auto
              mb-5
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-500
            "
          >
            <AlertCircle size={30} />
          </div>

          <h1 className="text-2xl font-bold text-[#212121]">
            Appointment Not Found
          </h1>

          <p className="mt-3 text-[#7A7A7A]">
            We could not find the appointment information.
            Please book an appointment first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              mt-6
              rounded-xl
              bg-[#2F6FED]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#2459C7]
            "
          >
            Go Home
          </button>

        </div>

      </section>
    );
  }

  // ==========================================
  // SUBMIT PAYMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ========================================
    // VALIDATION
    // ========================================

    if (!transactionId.trim()) {
      setError("Please enter transaction ID.");
      return;
    }

    if (!amount.trim()) {
      setError("Please enter payment amount.");
      return;
    }

    const numericAmount = Number(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid payment amount.");
      return;
    }

    // ========================================
    // LOGIN CHECK
    // ========================================

    const accessToken =
      localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login", {
        state: {
          redirectTo: `/payment/${appointmentId}`,
        },
      });

      return;
    }

    try {
      setLoading(true);

      // ======================================
      // PAYMENT DATA
      // ======================================

      const paymentData = {
        appointment: Number(appointmentId),
        transaction_id: transactionId.trim(),
        amount: numericAmount,
        method,
      };

      console.log(
        "Submitting payment:",
        paymentData
      );

      // ======================================
      // PAYMENT API
      // ======================================

      const response = await submitPayment(
        paymentData
      );

      console.log(
        "Payment submitted:",
        response
      );

      // ======================================
      // SUCCESS
      // ======================================

      setSuccess(
        "Your payment has been submitted successfully."
      );

      setTransactionId("");
      setAmount("");

    } catch (error) {
      console.error(
        "Payment submission error:",
        error
      );

      // ======================================
      // BACKEND ERROR
      // ======================================

      if (error.response?.data) {
        const backendError =
          error.response.data;

        console.log(
          "Payment backend error:",
          backendError
        );

        if (typeof backendError === "string") {
          setError(backendError);
        } else if (backendError.detail) {
          setError(backendError.detail);
        } else if (backendError.message) {
          setError(backendError.message);
        } else if (backendError.appointment) {
          setError(
            Array.isArray(
              backendError.appointment
            )
              ? backendError.appointment[0]
              : backendError.appointment
          );
        } else if (backendError.transaction_id) {
          setError(
            Array.isArray(
              backendError.transaction_id
            )
              ? backendError.transaction_id[0]
              : backendError.transaction_id
          );
        } else if (backendError.amount) {
          setError(
            Array.isArray(
              backendError.amount
            )
              ? backendError.amount[0]
              : backendError.amount
          );
        } else if (backendError.method) {
          setError(
            Array.isArray(
              backendError.method
            )
              ? backendError.method[0]
              : backendError.method
          );
        } else {
          setError(
            "Unable to submit payment. Please try again."
          );
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="w-full pb-12">

      {/* ======================================
          BACK BUTTON
      ====================================== */}

      <Link
        to={`/popular-service/doctor/${
          appointment?.doctor_id || ""
        }`}
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#EEEEEE]
          bg-white
          px-4
          py-2.5
          text-sm
          font-semibold
          text-[#212121]
          shadow-sm
          transition
          hover:bg-[#D9F7E8]
          hover:text-[#2F6FED]
        "
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-8">

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#D9F7E8]
            px-4
            py-2
            text-sm
            font-semibold
            text-[#2F6FED]
          "
        >
          <CreditCard size={18} />
          Appointment Payment
        </div>

        <h1
          className="
            mt-5
            text-3xl
            font-extrabold
            text-[#212121]
            md:text-4xl
          "
        >
          Complete Your Payment
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            leading-7
            text-[#7A7A7A]
          "
        >
          Please enter your payment information to
          complete your appointment booking.
        </p>

      </div>

      {/* ======================================
          PAYMENT CARD
      ====================================== */}

      <div
        className="
          mx-auto
          max-w-3xl
          overflow-hidden
          rounded-[32px]
          border
          border-[#EEEEEE]
          bg-white
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        "
      >

        {/* ====================================
            CARD HEADER
        ==================================== */}

        <div
          className="
            bg-gradient-to-r
            from-[#BEE9FF]
            to-[#DFF8EF]
            px-6
            py-8
            md:px-10
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-[#2F6FED]
                shadow-sm
              "
            >
              <WalletCards size={28} />
            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-[#212121]
                "
              >
                Payment Details
              </h2>

              <p className="mt-1 text-sm text-[#555]">
                Appointment ID: {appointmentId}
              </p>

            </div>

          </div>

        </div>

        {/* ====================================
            FORM
        ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-10"
        >

          {/* ==================================
              APPOINTMENT SUMMARY
          ================================== */}

          <div
            className="
              mb-6
              rounded-2xl
              border
              border-[#EEEEEE]
              bg-[#F8FAFC]
              p-5
            "
          >

            <div className="mb-4 flex items-center gap-3">

              <Stethoscope
                size={20}
                className="text-[#2F6FED]"
              />

              <h3
                className="
                  font-bold
                  text-[#212121]
                "
              >
                Appointment Information
              </h3>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              <div>
                <p className="text-xs text-[#7A7A7A]">
                  Patient Name
                </p>

                <p className="mt-1 font-semibold text-[#212121]">
                  {appointment?.patient_name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A7A7A]">
                  Patient Phone
                </p>

                <p className="mt-1 font-semibold text-[#212121]">
                  {appointment?.patient_phone || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A7A7A]">
                  Appointment Date
                </p>

                <p className="mt-1 font-semibold text-[#212121]">
                  {appointment?.appointment_date || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#7A7A7A]">
                  Appointment Time
                </p>

                <p className="mt-1 font-semibold text-[#212121]">
                  {appointment?.appointment_time || "-"}
                </p>
              </div>

            </div>

          </div>

          {/* ==================================
              SUCCESS
          ================================== */}

          {success && (
            <div
              className="
                mb-6
                rounded-2xl
                bg-[#D9F7E8]
                p-5
                text-[#212121]
              "
            >

              <div className="flex items-center gap-3">

                <CheckCircle2
                  size={24}
                  className="text-green-600"
                />

                <p className="font-semibold">
                  {success}
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  mt-4
                  rounded-xl
                  bg-[#2F6FED]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#2459C7]
                "
              >
                Go Home
              </button>

            </div>
          )}

          {/* ==================================
              ERROR
          ================================== */}

          {error && (
            <div
              className="
                mb-6
                flex
                items-start
                gap-3
                rounded-xl
                bg-red-50
                px-4
                py-3
                text-sm
                font-medium
                text-red-600
              "
            >

              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

          {/* ==================================
              TRANSACTION ID
          ================================== */}

          <div className="mb-6">

            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#212121]
              "
            >
              Transaction ID
            </label>

            <div className="relative">

              <Hash
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#7A7A7A]
                "
              />

              <input
                type="text"
                value={transactionId}
                onChange={(e) =>
                  setTransactionId(e.target.value)
                }
                placeholder="Enter your transaction ID"
                disabled={loading || !!success}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#EEEEEE]
                  bg-white
                  py-3
                  pl-11
                  pr-4
                  text-[#212121]
                  outline-none
                  transition
                  focus:border-[#2F6FED]
                  focus:ring-2
                  focus:ring-[#2F6FED]/10
                  disabled:cursor-not-allowed
                  disabled:bg-gray-50
                "
              />

            </div>

          </div>

          {/* ==================================
              AMOUNT
          ================================== */}

          <div className="mb-6">

            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#212121]
              "
            >
              Payment Amount
            </label>

            <div className="relative">

              <span
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  font-semibold
                  text-[#7A7A7A]
                "
              >
                ৳
              </span>

              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Enter payment amount"
                disabled={loading || !!success}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#EEEEEE]
                  bg-white
                  py-3
                  pl-11
                  pr-4
                  text-[#212121]
                  outline-none
                  transition
                  focus:border-[#2F6FED]
                  focus:ring-2
                  focus:ring-[#2F6FED]/10
                  disabled:cursor-not-allowed
                  disabled:bg-gray-50
                "
              />

            </div>

          </div>

          {/* ==================================
              PAYMENT METHOD
          ================================== */}

          <div className="mb-6">

            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#212121]
              "
            >
              Payment Method
            </label>

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value)
              }
              disabled={loading || !!success}
              className="
                w-full
                rounded-xl
                border
                border-[#EEEEEE]
                bg-white
                px-4
                py-3
                text-[#212121]
                outline-none
                transition
                focus:border-[#2F6FED]
                focus:ring-2
                focus:ring-[#2F6FED]/10
                disabled:cursor-not-allowed
                disabled:bg-gray-50
              "
            >
              <option value="bkash">
                bKash
              </option>

              <option value="nagad">
                Nagad
              </option>

              <option value="card">
                Card
              </option>

              <option value="cash">
                Cash
              </option>
            </select>

          </div>

          {/* ==================================
              SUBMIT
          ================================== */}

          {!success && (
            <button
              type="submit"
              disabled={loading}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#2F6FED]
                px-5
                py-3.5
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#2459C7]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  Submitting Payment...
                </>
              ) : (
                <>
                  <CreditCard size={19} />
                  Submit Payment
                </>
              )}

            </button>
          )}

        </form>

      </div>

    </section>
  );
}

export default AppointmentPayment;