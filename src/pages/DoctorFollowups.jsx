import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Stethoscope,
  FileText,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CalendarCheck2,
  CircleCheck,
} from "lucide-react";

import followupService from "../services/followupService";

const DoctorFollowups = () => {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchFollowups = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const data =
        await followupService.getDoctorFollowups(currentPage);

      setFollowups(data?.results || []);
      setTotalCount(data?.count || 0);
      setNextPage(data?.next || null);
      setPreviousPage(data?.previous || null);
    } catch (err) {
      console.error("Doctor followups error:", err);

      setError(
        err?.response?.data?.detail ||
          "Failed to load doctor follow-ups."
      );

      setFollowups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowups(page);
  }, [page]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";

    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D9F7E8]">
                <Stethoscope
                  size={27}
                  strokeWidth={2}
                  className="text-[#2F6FED]"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#212121] sm:text-3xl">
                  Doctor Follow-ups
                </h1>

                <p className="mt-1 text-sm text-[#7A7A7A] sm:text-base">
                  Stay on top of your upcoming doctor follow-up appointments.
                </p>
              </div>
            </div>

            {/* Total Count */}
            {!loading && !error && totalCount > 0 && (
              <div className="flex w-fit items-center gap-2 rounded-full border border-[#EEEEEE] bg-white px-4 py-2 shadow-sm">
                <CalendarCheck2
                  size={17}
                  className="text-[#2F6FED]"
                />

                <span className="text-sm font-semibold text-[#212121]">
                  {totalCount}
                </span>

                <span className="text-sm text-[#7A7A7A]">
                  {totalCount === 1
                    ? "Follow-up"
                    : "Follow-ups"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}
        {loading && (
          <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-[#EEEEEE] bg-white shadow-sm">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D9F7E8]">
                <Loader2
                  size={30}
                  className="animate-spin text-[#2F6FED]"
                />
              </div>

              <p className="mt-5 text-sm font-semibold text-[#212121]">
                Loading follow-ups
              </p>

              <p className="mt-1 text-sm text-[#7A7A7A]">
                Please wait a moment...
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR
        ====================================================== */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-100 bg-white p-8 shadow-sm sm:p-12">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                <FileText
                  size={28}
                  className="text-red-500"
                />
              </div>

              <h2 className="mt-5 text-lg font-bold text-[#212121]">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#7A7A7A]">
                {error}
              </p>

              <button
                onClick={() => fetchFollowups(page)}
                className="mt-6 rounded-xl bg-[#2F6FED] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#255fd0] active:scale-[0.98]"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}
        {!loading &&
          !error &&
          followups.length === 0 && (
            <div className="rounded-3xl border border-[#EEEEEE] bg-white px-6 py-16 shadow-sm sm:px-10">
              <div className="mx-auto flex max-w-md flex-col items-center text-center">

                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D9F7E8]">
                  <Stethoscope
                    size={34}
                    strokeWidth={1.8}
                    className="text-[#2F6FED]"
                  />

                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                    <CircleCheck
                      size={17}
                      className="text-[#2F6FED]"
                    />
                  </div>
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#212121]">
                  No Doctor Follow-ups
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#7A7A7A]">
                  You don't have any doctor follow-ups scheduled
                  at the moment.
                </p>
              </div>
            </div>
          )}

        {/* =====================================================
            FOLLOW-UP LIST
        ====================================================== */}
        {!loading &&
          !error &&
          followups.length > 0 && (
            <div className="space-y-5">

              {followups.map((followup) => (
                <div
                  key={followup.id}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#EEEEEE]
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-lg
                  "
                >
                  {/* -------------------------------------------------
                      CARD TOP
                  -------------------------------------------------- */}
                  <div className="border-b border-[#EEEEEE] p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* Doctor */}
                      <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D9F7E8] transition group-hover:scale-105">
                          <Stethoscope
                            size={25}
                            strokeWidth={2}
                            className="text-[#2F6FED]"
                          />
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-[#7A7A7A]">
                            Follow-up with
                          </p>

                          <h3 className="mt-1 text-lg font-bold text-[#212121]">
                            {followup.doctor_name || "Doctor"}
                          </h3>

                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2F6FED]" />

                            <span className="text-xs text-[#7A7A7A]">
                              Doctor Follow-up
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status + ID */}
                      <div className="flex items-center gap-2 self-start sm:self-center">

                        <span className="flex items-center gap-1.5 rounded-full bg-[#D9F7E8] px-3 py-1.5 text-xs font-semibold text-[#2F6FED]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2F6FED]" />
                          Scheduled
                        </span>

                        <span className="rounded-lg bg-[#F2F2F2] px-3 py-1.5 text-xs font-medium text-[#7A7A7A]">
                          #{followup.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------------------
                      DATE + TIME
                  -------------------------------------------------- */}
                  <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-6">

                    {/* Date */}
                    <div className="rounded-2xl border border-[#EEEEEE] bg-[#FAFAFA] p-4 transition group-hover:border-[#D9F7E8]">

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9F7E8]">
                          <CalendarDays
                            size={19}
                            className="text-[#2F6FED]"
                          />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-[#7A7A7A]">
                            Follow-up Date
                          </p>

                          <p className="mt-0.5 text-sm font-bold text-[#212121]">
                            {formatDate(
                              followup.followup_date
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="rounded-2xl border border-[#EEEEEE] bg-[#FAFAFA] p-4 transition group-hover:border-[#D9F7E8]">

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9F7E8]">
                          <Clock3
                            size={19}
                            className="text-[#2F6FED]"
                          />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-[#7A7A7A]">
                            Follow-up Time
                          </p>

                          <p className="mt-0.5 text-sm font-bold text-[#212121]">
                            {formatTime(
                              followup.followup_time
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------------------------------
                      DETAILS
                  -------------------------------------------------- */}
                  {(followup.notes ||
                    followup.treatment_details) && (
                    <div className="grid grid-cols-1 gap-4 px-5 pb-5 sm:px-6 sm:pb-6 lg:grid-cols-2">

                      {/* Notes */}
                      {followup.notes && (
                        <div className="rounded-2xl border border-[#EEEEEE] p-4">
                          <div className="mb-3 flex items-center gap-2.5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9F7E8]">
                              <FileText
                                size={17}
                                className="text-[#2F6FED]"
                              />
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-[#212121]">
                                Notes
                              </h4>

                              <p className="text-[11px] text-[#7A7A7A]">
                                Doctor's notes
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-6 text-[#7A7A7A]">
                            {followup.notes}
                          </p>
                        </div>
                      )}

                      {/* Treatment */}
                      {followup.treatment_details && (
                        <div className="rounded-2xl border border-[#EEEEEE] p-4">
                          <div className="mb-3 flex items-center gap-2.5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D9F7E8]">
                              <ClipboardList
                                size={17}
                                className="text-[#2F6FED]"
                              />
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-[#212121]">
                                Treatment Details
                              </h4>

                              <p className="text-[11px] text-[#7A7A7A]">
                                Treatment information
                              </p>
                            </div>
                          </div>

                          <p className="text-sm leading-6 text-[#7A7A7A]">
                            {followup.treatment_details}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* -------------------------------------------------
                      FOOTER
                  -------------------------------------------------- */}
                  {followup.created_at && (
                    <div className="flex items-center justify-between border-t border-[#EEEEEE] bg-[#FAFAFA] px-5 py-3.5 sm:px-6">

                      <span className="text-xs text-[#7A7A7A]">
                        Follow-up ID
                      </span>

                      <span className="text-xs font-medium text-[#212121]">
                        #{followup.id}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {/* =====================================================
                  PAGINATION
              ====================================================== */}
              {(nextPage || previousPage) && (
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#EEEEEE] bg-white p-4 shadow-sm sm:flex-row">

                  <p className="text-sm text-[#7A7A7A]">
                    Page{" "}
                    <span className="font-semibold text-[#212121]">
                      {page}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">

                    <button
                      disabled={!previousPage}
                      onClick={() =>
                        setPage((prev) =>
                          Math.max(prev - 1, 1)
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-[#EEEEEE]
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-[#212121]
                        transition
                        hover:border-[#D9F7E8]
                        hover:bg-[#D9F7E8]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <ChevronLeft size={17} />
                      Previous
                    </button>

                    <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#2F6FED] px-3 text-sm font-bold text-white">
                      {page}
                    </div>

                    <button
                      disabled={!nextPage}
                      onClick={() =>
                        setPage((prev) => prev + 1)
                      }
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-[#EEEEEE]
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-[#212121]
                        transition
                        hover:border-[#D9F7E8]
                        hover:bg-[#D9F7E8]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      Next
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default DoctorFollowups;