import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Phone,
  UserRound,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { createAppointment } from "../services/appointmentService";

function DoctorAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // ==========================================
  // UI STATE
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // SUBMIT APPOINTMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ========================================
    // VALIDATION
    // ========================================

    if (!patientName.trim()) {
      setError("Please enter patient name.");
      return;
    }

    if (!patientPhone.trim()) {
      setError("Please enter patient phone number.");
      return;
    }

    if (!appointmentDate) {
      setError("Please select appointment date.");
      return;
    }

    if (!appointmentTime) {
      setError("Please select appointment time.");
      return;
    }

    // ========================================
    // CHECK DOCTOR ID
    // ========================================

    if (!doctorId || Number.isNaN(Number(doctorId))) {
      setError("Invalid doctor ID.");
      return;
    }

    // ========================================
    // CHECK LOGIN
    // ========================================

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login", {
        state: {
          redirectTo: `/doctor-appointment/${doctorId}`,
        },
      });

      return;
    }

    try {
      setLoading(true);

      // ======================================
      // FORMAT TIME
      // ======================================

      const formattedTime =
        appointmentTime.length === 5
          ? `${appointmentTime}:00`
          : appointmentTime;

      // ======================================
      // API DATA
      // ======================================

      const appointmentData = {
        patient_name: patientName.trim(),
        patient_phone: patientPhone.trim(),
        appointment_date: appointmentDate,
        appointment_time: formattedTime,
        doctor_id: Number(doctorId),
      };

      console.log(
        "Creating appointment:",
        appointmentData
      );

      // ======================================
      // CREATE APPOINTMENT API
      // ======================================

      const response = await createAppointment(
        appointmentData
      );

      console.log(
        "Appointment created:",
        response
      );

      // ======================================
      // FIND APPOINTMENT ID
      // ======================================

      const appointmentId =
        response?.id ||
        response?.appointment_id ||
        response?.data?.id ||
        response?.data?.appointment_id;

      console.log(
        "Created Appointment ID:",
        appointmentId
      );

      // ======================================
      // CHECK APPOINTMENT ID
      // ======================================

      if (!appointmentId) {
        setError(
          "Appointment was created, but appointment ID was not returned."
        );

        return;
      }

      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      setSuccess(
        "Appointment created successfully. Redirecting to payment..."
      );

      // ======================================
      // GO TO PAYMENT PAGE
      // ======================================

      setTimeout(() => {
        navigate(`/payment/${appointmentId}`, {
          state: {
            appointment: {
              ...response,
              id: appointmentId,
            },
          },
        });
      }, 800);
    } catch (error) {
      console.error(
        "Appointment creation error:",
        error
      );

      // ======================================
      // BACKEND ERROR
      // ======================================

      if (error.response?.data) {
        const backendError =
          error.response.data;

        console.log(
          "Appointment backend error:",
          backendError
        );

        if (typeof backendError === "string") {
          setError(backendError);
        } else if (backendError.detail) {
          setError(backendError.detail);
        } else if (backendError.message) {
          setError(backendError.message);
        } else if (backendError.patient_name) {
          setError(
            Array.isArray(
              backendError.patient_name
            )
              ? backendError.patient_name[0]
              : backendError.patient_name
          );
        } else if (backendError.patient_phone) {
          setError(
            Array.isArray(
              backendError.patient_phone
            )
              ? backendError.patient_phone[0]
              : backendError.patient_phone
          );
        } else if (backendError.appointment_date) {
          setError(
            Array.isArray(
              backendError.appointment_date
            )
              ? backendError.appointment_date[0]
              : backendError.appointment_date
          );
        } else if (backendError.appointment_time) {
          setError(
            Array.isArray(
              backendError.appointment_time
            )
              ? backendError.appointment_time[0]
              : backendError.appointment_time
          );
        } else if (backendError.doctor_id) {
          setError(
            Array.isArray(
              backendError.doctor_id
            )
              ? backendError.doctor_id[0]
              : backendError.doctor_id
          );
        } else {
          setError(
            "Unable to create appointment. Please try again."
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
        to={`/popular-service/doctor/${doctorId}`}
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
        Back to Doctor
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
          <CalendarDays size={18} />
          Book Appointment
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
          Schedule Your Appointment
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            leading-7
            text-[#7A7A7A]
          "
        >
          Please provide the patient information
          and select your preferred appointment date
          and time.
        </p>

      </div>

      {/* ======================================
          FORM CARD
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
              <Stethoscope size={28} />
            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-[#212121]
                "
              >
                Doctor Appointment
              </h2>

              <p className="mt-1 text-sm text-[#555]">
                Doctor ID: {doctorId}
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
              SUCCESS
          ================================== */}

          {success && (
            <div
              className="
                mb-6
                flex
                items-start
                gap-3
                rounded-xl
                bg-[#D9F7E8]
                px-4
                py-3
                text-sm
                font-medium
                text-[#212121]
              "
            >
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <span>{success}</span>
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
              PATIENT NAME
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
              Patient Name
            </label>

            <div className="relative">

              <UserRound
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
                value={patientName}
                onChange={(e) =>
                  setPatientName(e.target.value)
                }
                placeholder="Enter patient name"
                autoComplete="name"
                disabled={loading}
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
              PATIENT PHONE
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
              Patient Phone
            </label>

            <div className="relative">

              <Phone
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
                type="tel"
                value={patientPhone}
                onChange={(e) =>
                  setPatientPhone(e.target.value)
                }
                placeholder="Enter patient phone number"
                autoComplete="tel"
                disabled={loading}
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
              DATE + TIME
          ================================== */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* DATE */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Appointment Date
              </label>

              <div className="relative">

                <CalendarDays
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
                  type="date"
                  value={appointmentDate}
                  onChange={(e) =>
                    setAppointmentDate(e.target.value)
                  }
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  disabled={loading}
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

            {/* TIME */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Appointment Time
              </label>

              <div className="relative">

                <Clock3
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
                  type="time"
                  value={appointmentTime}
                  onChange={(e) =>
                    setAppointmentTime(e.target.value)
                  }
                  disabled={loading}
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

          </div>

          {/* ==================================
              SUBMIT BUTTON
          ================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-8
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

                Booking Appointment...
              </>
            ) : (
              <>
                <CalendarDays size={19} />

                Confirm Appointment
              </>
            )}

          </button>

        </form>

      </div>

    </section>
  );
}

export default DoctorAppointment;