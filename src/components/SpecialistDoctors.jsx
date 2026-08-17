import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Stethoscope,
  BriefcaseMedical,
  HeartPulse,
} from "lucide-react";

import {
  getPopularSubCategories,
  getPopularDoctors,
} from "../services/popularService";

function SpecialistDoctors() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [doctors, setDoctors] = useState([]);

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [doctorsLoading, setDoctorsLoading] = useState(false);

  // =====================================
  // DOCTOR DETAILS CLICK
  // LOGIN REQUIRED
  // =====================================

  const handleDoctorClick = (doctorId) => {
    const accessToken = localStorage.getItem("accessToken");

    const doctorDetailsPath =
      `/popular-service/doctor/${doctorId}`;

    if (!accessToken) {
      navigate("/login", {
        state: {
          redirectTo: doctorDetailsPath,
        },
      });

      return;
    }

    navigate(doctorDetailsPath);
  };

  // =====================================
  // LOAD SPECIALIST CATEGORIES
  // =====================================

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);

        const data = await getPopularSubCategories(1);

        console.log("Specialist Categories:", data);

        let results = [];

        if (Array.isArray(data)) {
          results = data;
        } else if (Array.isArray(data?.results)) {
          results = data.results;
        }

        // =====================================
        // REMOVE GENERAL PHYSICIAN
        // SUBCATEGORY ID = 3
        // =====================================

        const specialistCategories = results.filter(
          (item) => Number(item.id) !== 3
        );

        setCategories(specialistCategories);

        // =====================================
        // DEFAULT = ALL
        // =====================================

        setSelectedCategory(null);
      } catch (error) {
        console.error(
          "Specialist categories loading error:",
          error
        );

        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  // =====================================
  // LOAD ALL SPECIALIST DOCTORS
  // =====================================

  const loadAllDoctors = async (specialistCategories) => {
    setDoctorsLoading(true);

    try {
      const doctorRequests = specialistCategories.map(
        (category) => getPopularDoctors(category.id)
      );

      const responses = await Promise.all(doctorRequests);

      let allDoctors = [];

      responses.forEach((data) => {
        if (Array.isArray(data)) {
          allDoctors = [
            ...allDoctors,
            ...data,
          ];
        } else if (Array.isArray(data?.results)) {
          allDoctors = [
            ...allDoctors,
            ...data.results,
          ];
        }
      });

      // =====================================
      // REMOVE DUPLICATE DOCTORS
      // =====================================

      const uniqueDoctors = Array.from(
        new Map(
          allDoctors.map((doctor) => [
            doctor.id,
            doctor,
          ])
        ).values()
      );

      setDoctors(uniqueDoctors);

      console.log(
        "All Specialist Doctors:",
        uniqueDoctors
      );
    } catch (error) {
      console.error(
        "All specialist doctors loading error:",
        error
      );

      setDoctors([]);
    } finally {
      setDoctorsLoading(false);
    }
  };

  // =====================================
  // LOAD DOCTORS
  // =====================================

  useEffect(() => {
    if (categoriesLoading) {
      return;
    }

    // =====================================
    // ALL SPECIALISTS
    // =====================================

    if (!selectedCategory) {
      if (categories.length) {
        loadAllDoctors(categories);
      } else {
        setDoctors([]);
      }

      return;
    }

    // =====================================
    // SINGLE CATEGORY
    // =====================================

    const loadDoctors = async () => {
      setDoctorsLoading(true);

      try {
        const data = await getPopularDoctors(
          selectedCategory.id
        );

        console.log(
          `${selectedCategory.name} Doctors:`,
          data
        );

        if (Array.isArray(data)) {
          setDoctors(data);
        } else if (Array.isArray(data?.results)) {
          setDoctors(data.results);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error(
          "Specialist doctors loading error:",
          error
        );

        setDoctors([]);
      } finally {
        setDoctorsLoading(false);
      }
    };

    loadDoctors();
  }, [
    selectedCategory,
    categories,
    categoriesLoading,
  ]);

  // =====================================
  // CATEGORY ICON
  // =====================================

  const getCategoryIcon = (category) => {
    const icon =
      category.icon ||
      category.image ||
      category.photo;

    // api.js already converts backend media
    // URLs to relative URLs.
    const iconUrl = icon || null;

    if (iconUrl) {
      return (
        <img
          src={iconUrl}
          alt={
            category.name_en ||
            category.name ||
            "Specialty"
          }
          className="h-10 w-10 object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none";

            const fallback =
              event.currentTarget.nextElementSibling;

            if (fallback) {
              fallback.style.display = "flex";
            }
          }}
        />
      );
    }

    return (
      <HeartPulse
        size={30}
        className="text-[#2F6FED]"
      />
    );
  };

  // =====================================
  // CATEGORY NAME
  // =====================================

  const getCategoryName = (category) => {
    return (
      category.name_en ||
      category.name ||
      category.name_bn ||
      "Specialty"
    );
  };

  // =====================================
  // LOADING
  // =====================================

  if (categoriesLoading) {
    return (
      <section className="w-full min-w-0 overflow-hidden">
        {/* HEADER SKELETON */}

        <div className="mb-8">
          <div className="h-9 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* CATEGORY SKELETON */}

        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="
                h-[120px]
                w-[190px]
                min-w-[190px]
                shrink-0
                animate-pulse
                rounded-[16px]
                bg-gray-200
              "
            />
          ))}
        </div>
      </section>
    );
  }

  // =====================================
  // NO CATEGORIES
  // =====================================

  if (!categories.length) {
    return (
      <section className="w-full min-w-0">
        {/* HEADER */}

        <div className="mb-8">
          <h2
            className="
              text-2xl
              font-extrabold
              text-[#212121]
              md:text-3xl
            "
          >
            Our Specialist Doctors
          </h2>

          <p className="mt-2 text-[#7A7A7A]">
            Choose a specialty to find the right
            specialist doctor.
          </p>
        </div>

        {/* EMPTY STATE */}

        <div
          className="
            rounded-[16px]
            border
            border-[#EEEEEE]
            bg-white
            px-6
            py-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <HeartPulse size={28} />
          </div>

          <p
            className="
              mt-4
              font-semibold
              text-[#212121]
            "
          >
            No specialist categories available
            right now.
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#7A7A7A]
            "
          >
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
    // api.js already handles backend media URLs.
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
      "Specialist Doctor";

    const experience =
      doctor.years_of_experience;

    const fee =
      doctor.doctor_fees;

    return (
      <button
        type="button"
        onClick={() => handleDoctorClick(doctor.id)}
        aria-label={`View ${doctorName} details`}
        className="
          group
          flex
          h-[350px]
          w-[280px]
          min-w-[280px]
          max-w-[280px]
          shrink-0
          flex-col
          overflow-hidden
          rounded-[16px]
          border
          border-white/15
          bg-gradient-to-r
          from-[#BEE9FF]
          to-[#DFF8EF]
          text-left
          shadow-[
            -3px_-3px_6px_rgba(255,255,255,0.20),
            3px_4px_8px_rgba(0,0,0,0.13)
          ]
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-[
            -3px_-3px_8px_rgba(255,255,255,0.25),
            3px_5px_10px_rgba(0,0,0,0.16)
          ]
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
              shadow-[0_4px_12px_rgba(0,0,0,0.12)]
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
                  event.currentTarget.style.display =
                    "none";

                  const fallback =
                    event.currentTarget
                      .nextElementSibling;

                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            )}

            {/* FALLBACK */}

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
            CONTENT
        ===================================== */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            p-5
            text-center
          "
        >
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
                  mt-3
                  inline-flex
                  self-center
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white/60
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-[#212121]
                "
              >
                <BriefcaseMedical size={14} />

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
                  line-clamp-1
                  text-sm
                  font-bold
                  text-[#212121]
                "
                title={`Consultation Fee: ${fee}`}
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
              w-full
              items-center
              justify-between
              gap-3
              border-t
              border-white/40
              pt-4
            "
          >
            <span
              className="
                min-w-0
                truncate
                text-sm
                font-semibold
                text-[#212121]
              "
            >
              View Doctor
            </span>

            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/80
                text-[#2F6FED]
                shadow-sm
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:bg-white
              "
            >
              <ArrowRight
                size={18}
                strokeWidth={2.5}
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

      <div className="mb-8">
        <h2
          className="
            text-2xl
            font-extrabold
            text-[#212121]
            md:text-3xl
          "
        >
          Our Specialist Doctors
        </h2>

        <p className="mt-2 text-[#7A7A7A]">
          Choose a specialty to find the right
          specialist doctor.
        </p>
      </div>

      {/* =====================================
          CATEGORY LIST
          NO AUTO MOVEMENT
      ===================================== */}

      <div
        className="
          mb-8
          w-full
          overflow-x-auto
          pb-3
          scrollbar-thin
        "
      >
        <div
          className="
            flex
            w-max
            gap-5
          "
        >
          {/* =====================================
              ALL CATEGORY
          ===================================== */}

          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`
              group
              flex
              h-[120px]
              w-[190px]
              min-w-[190px]
              shrink-0
              flex-col
              items-center
              justify-center
              rounded-[16px]
              border
              p-4
              text-center
              transition-all
              duration-300

              ${
                selectedCategory === null
                  ? `
                    border-white/30
                    bg-gradient-to-r
                    from-[#BEE9FF]
                    to-[#DFF8EF]
                    shadow-[
                      -3px_-3px_6px_rgba(255,255,255,0.20),
                      3px_4px_8px_rgba(0,0,0,0.13)
                    ]
                    -translate-y-1
                  `
                  : `
                    border-white/15
                    bg-gradient-to-r
                    from-[#BEE9FF]/60
                    to-[#DFF8EF]/60
                    shadow-[
                      -3px_-3px_6px_rgba(255,255,255,0.15),
                      3px_4px_8px_rgba(0,0,0,0.08)
                    ]
                    hover:-translate-y-1
                  `
              }
            `}
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
              "
            >
              <Stethoscope
                size={30}
                className="text-[#2F6FED]"
              />
            </div>

            <h3
              className="
                mt-3
                text-sm
                font-bold
                text-[#212121]
              "
            >
              All
            </h3>
          </button>

          {/* =====================================
              SPECIALIST CATEGORIES
          ===================================== */}

          {categories.map((category) => {
            const isActive =
              selectedCategory?.id === category.id;

            const categoryName =
              getCategoryName(category);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`
                  group
                  flex
                  h-[120px]
                  w-[190px]
                  min-w-[190px]
                  shrink-0
                  flex-col
                  items-center
                  justify-center
                  rounded-[16px]
                  border
                  p-4
                  text-center
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        border-white/30
                        bg-gradient-to-r
                        from-[#BEE9FF]
                        to-[#DFF8EF]
                        shadow-[
                          -3px_-3px_6px_rgba(255,255,255,0.20),
                          3px_4px_8px_rgba(0,0,0,0.13)
                        ]
                        -translate-y-1
                      `
                      : `
                        border-white/15
                        bg-gradient-to-r
                        from-[#BEE9FF]/60
                        to-[#DFF8EF]/60
                        shadow-[
                          -3px_-3px_6px_rgba(255,255,255,0.15),
                          3px_4px_8px_rgba(0,0,0,0.08)
                        ]
                        hover:-translate-y-1
                      `
                  }
                `}
              >
                {/* CATEGORY ICON */}

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                  "
                >
                  {getCategoryIcon(category)}

                  {/* Icon fallback */}

                  <div
                    className="
                      absolute
                      inset-0
                      hidden
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#2F6FED]
                    "
                  >
                    <HeartPulse size={30} />
                  </div>
                </div>

                {/* CATEGORY NAME */}

                <h3
                  className="
                    mt-3
                    max-w-full
                    line-clamp-1
                    text-sm
                    font-bold
                    text-[#212121]
                  "
                  title={categoryName}
                >
                  {categoryName}
                </h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================
          SELECTED TITLE
      ===================================== */}

      <div className="mb-6">
        <h3
          className="
            mt-4
            text-xl
            font-extrabold
            text-[#212121]
            md:text-2xl
          "
        >
          {selectedCategory
            ? `${getCategoryName(
                selectedCategory
              )} Specialists`
            : "All Specialist Doctors"}
        </h3>
      </div>

      {/* =====================================
          DOCTOR LOADING
      ===================================== */}

      {doctorsLoading ? (
        <div
          className="
            flex
            gap-5
            overflow-hidden
            py-3
          "
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[350px]
                w-[280px]
                min-w-[280px]
                shrink-0
                animate-pulse
                rounded-[16px]
                bg-gray-200
              "
            />
          ))}
        </div>
      ) : !doctors.length ? (
        /* =====================================
           NO DOCTORS
        ===================================== */

        <div
          className="
            rounded-[16px]
            border
            border-[#EEEEEE]
            bg-white
            px-6
            py-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Stethoscope size={28} />
          </div>

          <p
            className="
              mt-4
              font-semibold
              text-[#212121]
            "
          >
            No doctors available right now.
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#7A7A7A]
            "
          >
            Please check again later.
          </p>
        </div>
      ) : (
        /* =====================================
           DOCTOR VIEWPORT
        ===================================== */

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
              w-8
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
              w-8
              bg-gradient-to-l
              from-[#F2F2F2]
              to-transparent
            "
          />

          {/* MOVING DOCTOR TRACK */}

          <div
            className="
              flex
              w-max
              gap-5
              py-4
              hover:[animation-play-state:paused]
            "
            style={{
              animation:
                "specialistDoctorsMarquee 100s linear infinite",
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
      )}

      {/* =====================================
          ANIMATION
      ===================================== */}

      <style>
        {`
          @keyframes specialistDoctorsMarquee {
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

export default SpecialistDoctors;
