
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  UserRound,
  Phone,
  Stethoscope,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  WalletCards,
  CircleDollarSign,
} from "lucide-react";

import { getAppointments } from "../services/appointmentService";

function MyAppointments() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  // ==========================================
  // FETCH APPOINTMENTS
  // ==========================================

  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login", {
          state: {
            redirectTo: "/my-appointments",
          },
        });

        return;
      }

      const response = await getAppointments(page);

      console.log("My appointments:", response);

      setAppointments(response?.results || []);
      setTotalCount(response?.count || 0);
      setNextPage(response?.next || null);
      setPreviousPage(response?.previous || null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Get appointments error:", error);

      if (error.response?.data) {
        const backendError = error.response.data;

        if (typeof backendError === "string") {
          setError(backendError);
        } else if (backendError.detail) {
          setError(backendError.detail);
        } else if (backendError.message) {
          setError(backendError.message);
        } else {
          setError(
            "Unable to load appointments. Please try again."
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
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchAppointments(1);
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time.split(":");

    if (hours === undefined || minutes === undefined) {
      return time;
    }

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // ==========================================
  // STATUS CONFIG
  // ==========================================

  const getStatusConfig = (status) => {
    const normalizedStatus = String(status || "")
      .toLowerCase()
      .trim();

    switch (normalizedStatus) {
      case "confirmed":
        return {
          label: "Confirmed",
          icon: CheckCircle2,
          className:
            "bg-emerald-50 text-emerald-600 border-emerald-100",
        };

      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle2,
          className:
            "bg-blue-50 text-[#2F6FED] border-blue-100",
        };

      case "cancelled":
      case "canceled":
        return {
          label: "Cancelled",
          icon: XCircle,
          className:
            "bg-red-50 text-red-600 border-red-100",
        };

      case "pending":
      default:
        return {
          label: status
            ? String(status).charAt(0).toUpperCase() +
              String(status).slice(1)
            : "Pending",
          icon: Clock,
          className:
            "bg-amber-50 text-amber-600 border-amber-100",
        };
    }
  };

  // ==========================================
  // PAYMENT CONFIG
  // ==========================================

  const getPaymentConfig = (payment) => {
    if (!payment) {
      return {
        label: "Payment Not Submitted",
        className:
          "bg-gray-100 text-[#7A7A7A] border-gray-200",
      };
    }

    const status = String(payment.status || "")
      .toLowerCase()
      .trim();

    switch (status) {
      case "paid":
      case "completed":
      case "success":
      case "successful":
        return {
          label: "Payment Successful",
          className:
            "bg-emerald-50 text-emerald-600 border-emerald-100",
        };

      case "failed":
      case "cancelled":
      case "canceled":
        return {
          label: "Payment Failed",
          className:
            "bg-red-50 text-red-600 border-red-100",
        };

      case "pending":
      default:
        return {
          label: "Payment Pending",
          className:
            "bg-amber-50 text-amber-600 border-amber-100",
        };
    }
  };

  // ==========================================
  // PAYMENT
  // ==========================================

  const handlePayment = (appointment) => {
    navigate(`/payment/${appointment.id}`, {
      state: {
        appointment,
      },
    });
  };

  // ==========================================
  // SUMMARY
  // ==========================================

  const pendingAppointments = appointments.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "pending"
  ).length;

  const confirmedAppointments = appointments.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "confirmed"
  ).length;

  const completedAppointments = appointments.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "completed"
  ).length;

  // ==========================================
  // EMPTY STATE
  // ==========================================

  const renderEmptyState = () => {
    return (
      <div className="rounded-[30px] border border-[#EEEEEE] bg-white px-6 py-16 text-center shadow-[0_12px_45px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#D9F7E8] text-[#2F6FED]">
          <CalendarDays size={36} />
        </div>

        <h2 className="mt-6 text-2xl font-extrabold text-[#212121]">
          No Appointments Yet
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#7A7A7A]">
          You haven't booked any appointments yet.
          Book an appointment with one of our doctors
          and your appointment details will appear here.
        </p>

        <Link
          to="/book-appointment"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#2F6FED] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(47,111,237,0.20)] transition hover:bg-[#2459C7] hover:shadow-[0_10px_25px_rgba(47,111,237,0.25)]"
        >
          <CalendarDays size={18} />
          Book Appointment
        </Link>
      </div>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="w-full pb-12">
        <div className="mb-6 h-10 w-36 animate-pulse rounded-xl bg-gray-200" />

        <div className="mb-8">
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
          <div className="mt-4 h-10 w-72 animate-pulse rounded-xl bg-gray-200" />
          <div className="mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>

        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[430px] w-full animate-pulse rounded-[30px] bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="w-full pb-12">
      {/* ======================================
          BACK BUTTON
      ====================================== */}

      <Link
        to="/"
        className="mb-7 inline-flex items-center gap-2 rounded-xl border border-[#EEEEEE] bg-white px-4 py-2.5 text-sm font-semibold text-[#212121] shadow-sm transition hover:border-[#D9F7E8] hover:bg-[#D9F7E8] hover:text-[#2F6FED]"
      >
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D9F7E8] px-4 py-2 text-sm font-semibold text-[#2F6FED]">
            <ClipboardList size={17} />
            Healthcare Dashboard
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#212121] md:text-4xl">
            My Appointments
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#7A7A7A] md:text-base">
            Keep track of your upcoming appointments,
            appointment status and payment information
            in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchAppointments(currentPage)}
          disabled={loading}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#EEEEEE] bg-white px-4 py-2.5 text-sm font-semibold text-[#212121] shadow-sm transition hover:border-[#D9F7E8] hover:bg-[#D9F7E8] hover:text-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div className="mb-7 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm font-medium text-red-600">
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => fetchAppointments(currentPage)}
              className="mt-2 font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* ======================================
          SUMMARY CARDS
      ====================================== */}

      {!error && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}

          <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D9F7E8] text-[#2F6FED]">
                <ClipboardList size={21} />
              </div>

              <span className="text-xs font-medium text-[#7A7A7A]">
                Total
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[#212121]">
              {totalCount}
            </p>

            <p className="mt-1 text-sm text-[#7A7A7A]">
              All appointments
            </p>
          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock size={21} />
              </div>

              <span className="text-xs font-medium text-[#7A7A7A]">
                Pending
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[#212121]">
              {pendingAppointments}
            </p>

            <p className="mt-1 text-sm text-[#7A7A7A]">
              Awaiting confirmation
            </p>
          </div>

          {/* Confirmed */}

          <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>

              <span className="text-xs font-medium text-[#7A7A7A]">
                Confirmed
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[#212121]">
              {confirmedAppointments}
            </p>

            <p className="mt-1 text-sm text-[#7A7A7A]">
              Confirmed appointments
            </p>
          </div>

          {/* Completed */}

          <div className="rounded-2xl border border-[#EEEEEE] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#2F6FED]">
                <CheckCircle2 size={21} />
              </div>

              <span className="text-xs font-medium text-[#7A7A7A]">
                Completed
              </span>
            </div>

            <p className="mt-4 text-2xl font-extrabold text-[#212121]">
              {completedAppointments}
            </p>

            <p className="mt-1 text-sm text-[#7A7A7A]">
              Completed visits
            </p>
          </div>
        </div>
      )}

      {/* ======================================
          EMPTY
      ====================================== */}

      {!error &&
        appointments.length === 0 &&
        renderEmptyState()}

      {/* ======================================
          APPOINTMENT LIST
      ====================================== */}

      {!error && appointments.length > 0 && (
        <div className="space-y-6">
          {appointments.map((appointment) => {
            const statusConfig = getStatusConfig(
              appointment.status
            );

            const StatusIcon = statusConfig.icon;

            const paymentConfig = getPaymentConfig(
              appointment.payment
            );

            const paymentStatus = String(
              appointment.payment?.status || ""
            ).toLowerCase();

            const canPay =
              !appointment.payment ||
              paymentStatus === "pending";

            return (
              <article
                key={appointment.id}
                className="group overflow-hidden rounded-[30px] border border-[#EEEEEE] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.055)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
              >
                {/* =================================
                    CARD TOP
                ================================= */}

                <div className="relative overflow-hidden bg-gradient-to-br from-[#DFF8EF] via-[#EAF9F4] to-[#E8F3FF] px-6 py-6 md:px-8">
                  <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

                  <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F6FED] shadow-sm">
                        <Stethoscope size={27} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                          Appointment #{appointment.id}
                        </p>

                        <h2 className="mt-1 text-xl font-extrabold text-[#212121]">
                          Doctor Appointment
                        </h2>

                        <p className="mt-1 text-sm text-[#7A7A7A]">
                          {appointment.service_type ||
                            "Healthcare Consultation"}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${statusConfig.className}`}
                    >
                      <StatusIcon size={17} />
                      {statusConfig.label}
                    </div>
                  </div>
                </div>

                {/* =================================
                    CARD BODY
                ================================= */}

                <div className="p-6 md:p-8">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Patient */}

                    <InfoCard
                      icon={<UserRound size={19} />}
                      label="Patient"
                      value={
                        appointment.patient_name || "N/A"
                      }
                    />

                    {/* Phone */}

                    <InfoCard
                      icon={<Phone size={19} />}
                      label="Phone"
                      value={
                        appointment.patient_phone || "N/A"
                      }
                    />

                    {/* Date */}

                    <InfoCard
                      icon={<CalendarDays size={19} />}
                      label="Appointment Date"
                      value={formatDate(
                        appointment.appointment_date
                      )}
                    />

                    {/* Time */}

                    <InfoCard
                      icon={<Clock3 size={19} />}
                      label="Appointment Time"
                      value={formatTime(
                        appointment.appointment_time
                      )}
                    />
                  </div>

                  {/* =================================
                      PAYMENT
                  ================================= */}

                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-[#FAFBFC]">
                    <div className="flex flex-col gap-5 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9F7E8] text-[#2F6FED]">
                          <WalletCards size={20} />
                        </div>

                        <div>
                          <h3 className="font-bold text-[#212121]">
                            Payment Information
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                            {appointment.payment ? (
                              <>
                                <p className="text-[#7A7A7A]">
                                  Transaction:{" "}
                                  <span className="font-semibold text-[#212121]">
                                    {appointment.payment
                                      .transaction_id ||
                                      "N/A"}
                                  </span>
                                </p>

                                <p className="text-[#7A7A7A]">
                                  Method:{" "}
                                  <span className="font-semibold capitalize text-[#212121]">
                                    {appointment.payment
                                      .method || "N/A"}
                                  </span>
                                </p>

                                <p className="text-[#7A7A7A]">
                                  Amount:{" "}
                                  <span className="font-bold text-[#212121]">
                                    {appointment.payment
                                      .amount || "0"}
                                  </span>
                                </p>
                              </>
                            ) : (
                              <p className="text-[#7A7A7A]">
                                No payment information
                                submitted yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-3 lg:items-end">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${paymentConfig.className}`}
                        >
                          <CircleDollarSign size={16} />
                          {paymentConfig.label}
                        </span>

                        {canPay && (
                          <button
                            type="button"
                            onClick={() =>
                              handlePayment(appointment)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F6FED] px-5 py-2.5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(47,111,237,0.18)] transition hover:bg-[#2459C7] hover:shadow-[0_9px_22px_rgba(47,111,237,0.25)]"
                          >
                            <CreditCard size={17} />
                            Make Payment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* =================================
                      FOOTER
                  ================================= */}

                  <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#EEEEEE] pt-5 text-xs text-[#7A7A7A] sm:flex-row sm:items-center">
                    <p>
                      Booked on{" "}
                      <span className="font-semibold text-[#212121]">
                        {formatDate(
                          appointment.created_at
                        )}
                      </span>
                    </p>

                    <p>
                      Appointment ID:{" "}
                      <span className="font-semibold text-[#212121]">
                        #{appointment.id}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ======================================
          PAGINATION
      ====================================== */}

      {!error &&
        appointments.length > 0 && (
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#EEEEEE] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#7A7A7A]">
                Showing{" "}
                <span className="font-bold text-[#212121]">
                  {appointments.length}
                </span>{" "}
                appointment
                {appointments.length !== 1 ? "s" : ""}
              </p>

              <p className="mt-1 text-xs text-[#7A7A7A]">
                Total:{" "}
                <span className="font-semibold text-[#212121]">
                  {totalCount}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!previousPage || loading}
                onClick={() =>
                  fetchAppointments(currentPage - 1)
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#EEEEEE] bg-white px-4 py-2.5 text-sm font-semibold text-[#212121] transition hover:border-[#D9F7E8] hover:bg-[#D9F7E8] hover:text-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#D9F7E8] px-3 text-sm font-extrabold text-[#2F6FED]">
                {currentPage}
              </div>

              <button
                type="button"
                disabled={!nextPage || loading}
                onClick={() =>
                  fetchAppointments(currentPage + 1)
                }
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#EEEEEE] bg-white px-4 py-2.5 text-sm font-semibold text-[#212121] transition hover:border-[#D9F7E8] hover:bg-[#D9F7E8] hover:text-[#2F6FED] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
    </section>
  );
}

// ==========================================
// INFO CARD
// ==========================================

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-transparent bg-[#F8FAFC] p-4 transition hover:border-[#D9F7E8] hover:bg-[#FAFFFC]">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2F6FED] shadow-sm">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-[#7A7A7A]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-[#212121]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
