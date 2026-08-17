import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BriefcaseMedical,
  Stethoscope,
} from "lucide-react";

import { getPopularDoctors } from "../services/popularService";

function GeneralPhysicianDoctors() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // GENERAL PHYSICIAN SUBCATEGORY ID
  // =====================================

  const subcategoryId = 3;

  // =====================================
  // LOAD DOCTORS
  // =====================================

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);

        const data = await getPopularDoctors(subcategoryId);

        console.log("General Physician Doctors:", data);

        if (Array.isArray(data)) {
          setDoctors(data);
        } else if (Array.isArray(data?.results)) {
          setDoctors(data.results);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error(
          "General Physician doctors loading error:",
          error
        );

        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // =====================================
  // DOCTOR CLICK
  // =====================================

  const handleDoctorClick = (doctor) => {
    const accessToken = localStorage.getItem("accessToken");

    const doctorDetailsPath =
      `/popular-service/doctor/${doctor.id}`;

    // ===================================
    // NOT LOGGED IN
    // ===================================

    if (!accessToken) {
      navigate("/login", {
        state: {
          redirectTo: doctorDetailsPath,
        },
      });

      return;
    }

    // ===================================
    // LOGGED IN
    // ===================================

    navigate(doctorDetailsPath);
  };

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {
    return (
      <section className="w-full min-w-0 overflow-hidden">
        {/* HEADER SKELETON */}

        <div className="mb-6">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* CARD SKELETON */}

        <div className="flex gap-5 overflow-hidden py-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[330px]
                w-[280px]
                min-w-[280px]
                shrink-0
                animate-pulse
                rounded-2xl
                bg-gray-200
              "
            />
          ))}
        </div>
      </section>
    );
  }

  // =====================================
  // EMPTY STATE
  // =====================================

  if (!doctors.length) {
    return (
      <section className="w-full min-w-0">
        {/* HEADER */}

        <div className="mb-6">
          <h2
            className="
              text-2xl
              font-extrabold
              text-[#212121]
              md:text-3xl
            "
          >
            Our General Physicians
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#7A7A7A]
              md:text-base
            "
          >
            Find experienced general physicians for your healthcare needs.
          </p>
        </div>

        {/* EMPTY CARD */}

        <div
          className="
            rounded-3xl
            border
            border-[#EEEEEE]
            bg-white
            px-6
            py-12
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Stethoscope size={30} />
          </div>

          <h3
            className="
              mt-5
              text-lg
              font-bold
              text-[#212121]
            "
          >
            No doctors available
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-[#7A7A7A]
            "
          >
            No general physicians are available right now.
            Please check again later.
          </p>
        </div>
      </section>
    );
  }

  // =====================================
  // DOCTOR CARD
  // =====================================

  const DoctorCard = ({ doctor }) => {
    // api.js interceptor already converts
    // backend media URLs to relative URLs.
    const imageUrl = doctor.image || null;

    const doctorName =
      doctor.name_en ||
      doctor.name ||
      doctor.name_bn ||
      "Doctor";

    const designation =
      doctor.designation_en ||
      doctor.designation ||
      doctor.designation_bn ||
      "General Physician";

    const experience = doctor.years_of_experience;
    const fee = doctor.doctor_fees;

    return (
      <button
        type="button"
        onClick={() => handleDoctorClick(doctor)}
        aria-label={`View ${doctorName} details`}
        className="
          group
          flex
          h-[330px]
          w-[280px]
          min-w-[280px]
          max-w-[280px]
          shrink-0
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/60
          bg-gradient-to-r
          from-[#BEE9FF]
          to-[#DFF8EF]
          text-left
          shadow-[0_8px_24px_rgba(0,0,0,0.10)]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)]
          focus:outline-none
          focus:ring-2
          focus:ring-[#2F6FED]
          focus:ring-offset-2
        "
      >
        {/* =====================================
            DOCTOR IMAGE
        ===================================== */}

        <div
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            pt-7
          "
        >
          <div
            className="
              relative
              h-28
              w-28
              overflow-hidden
              rounded-full
              border-4
              border-white
              bg-white
              shadow-[0_4px_14px_rgba(0,0,0,0.12)]
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt={doctorName}
                className="
                  h-full
                  w-full
                  object-cover
                "
                onError={(event) => {
                  event.currentTarget.style.display = "none";

                  const fallback =
                    event.currentTarget.nextElementSibling;

                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            )}

            {/* IMAGE FALLBACK */}

            <div
              style={{
                display: imageUrl ? "none" : "flex",
              }}
              className="
                absolute
                inset-0
                items-center
                justify-center
                bg-white
                text-[#2F6FED]
              "
            >
              <Stethoscope size={42} />
            </div>
          </div>
        </div>

        {/* =====================================
            CARD CONTENT
        ===================================== */}

        <div className="flex flex-1 flex-col p-5 text-center">
          {/* NAME */}

          <h3
            className="
              line-clamp-1
              text-lg
              font-bold
              text-[#212121]
            "
            title={doctorName}
          >
            {doctorName}
          </h3>

          {/* DESIGNATION */}

          <p
            className="
              mt-1
              line-clamp-1
              text-sm
              font-semibold
              text-[#2F6FED]
            "
            title={designation}
          >
            {designation}
          </p>

          {/* EXPERIENCE */}

          {experience !== undefined &&
            experience !== null &&
            experience !== "" && (
              <div
                className="
                  mx-auto
                  mt-3
                  inline-flex
                  w-fit
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white/65
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-[#212121]
                "
              >
                <BriefcaseMedical
                  size={14}
                  className="text-[#2F6FED]"
                />

                {experience} years experience
              </div>
            )}

          {/* FEE */}

          {fee !== undefined &&
            fee !== null &&
            fee !== "" && (
              <p
                className="
                  mt-3
                  text-sm
                  font-bold
                  text-[#212121]
                "
              >
                Consultation Fee:{" "}
                <span className="text-[#2F6FED]">
                  {fee}
                </span>
              </p>
            )}

          {/* =====================================
              BOTTOM ACTION
          ===================================== */}

          <div
            className="
              mt-auto
              flex
              items-center
              justify-between
              border-t
              border-white/50
              pt-4
              pr-1
            "
          >
            <span
              className="
                text-sm
                font-semibold
                text-[#212121]
              "
            >
              View Doctor
            </span>

            {/* ARROW */}

            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/75
                text-[#2F6FED]
                transition-all
                duration-300
                group-hover:translate-x-0.5
                group-hover:bg-white
              "
            >
              <ArrowRight
                size={18}
                strokeWidth={2.2}
              />
            </span>
          </div>
        </div>
      </button>
    );
  };

  // =====================================
  // MAIN
  // =====================================

  return (
    <section className="w-full min-w-0 overflow-hidden">
      {/* HEADER */}

      <div className="mb-6">
        <h2
          className="
            text-2xl
            font-extrabold
            text-[#212121]
            md:text-3xl
          "
        >
          Our General Physicians
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[#7A7A7A]
            md:text-base
          "
        >
          Find experienced general physicians for your healthcare needs.
        </p>
      </div>

      {/* =====================================
          MARQUEE VIEWPORT
      ===================================== */}

      <div
        className="
          relative
          w-full
          min-w-0
          overflow-hidden
        "
      >
        {/* LEFT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-10
            bg-gradient-to-r
            from-[#F2F2F2]
            to-transparent
          "
        />

        {/* RIGHT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-20
            h-full
            w-10
            bg-gradient-to-l
            from-[#F2F2F2]
            to-transparent
          "
        />

        {/* =====================================
            MOVING TRACK
        ===================================== */}

        <div
          className="
            flex
            w-max
            gap-5
            py-3
            hover:[animation-play-state:paused]
          "
          style={{
            animation:
              "generalPhysicianMarquee 25s linear infinite",
          }}
        >
          {/* FIRST GROUP */}

          <div className="flex shrink-0 gap-5">
            {doctors.map((doctor) => (
              <DoctorCard
                key={`first-${doctor.id}`}
                doctor={doctor}
              />
            ))}
          </div>

          {/* SECOND GROUP */}

          <div className="flex shrink-0 gap-5">
            {doctors.map((doctor) => (
              <DoctorCard
                key={`second-${doctor.id}`}
                doctor={doctor}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================
          MARQUEE ANIMATION
      ===================================== */}

      <style>
        {`
          @keyframes generalPhysicianMarquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(
                calc(-50% - 10px)
              );
            }
          }
        `}
      </style>
    </section>
  );
}

export default GeneralPhysicianDoctors;