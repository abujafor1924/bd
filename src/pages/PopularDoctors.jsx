import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  Building2,
  Clock,
  ArrowRight,
} from "lucide-react";

import { getPopularDoctors } from "../services/popularService";

function PopularDoctors() {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const subcategoryName =
    location.state?.subcategoryName || "Our Doctors";

  // ==========================================
  // LOAD DOCTORS
  // ==========================================

  useEffect(() => {
    loadDoctors();
  }, [subcategoryId]);

  const loadDoctors = async () => {
    try {
      setLoading(true);

      const data = await getPopularDoctors(subcategoryId);

      setDoctors(data.results || []);
    } catch (error) {
      console.log("Popular doctors loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DOCTOR CLICK
  // ==========================================

  const handleDoctorClick = (doctorId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login", {
        state: {
          redirectTo: `/popular-service/doctor/${doctorId}`,
        },
      });

      return;
    }

    navigate(`/popular-service/doctor/${doctorId}`);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="pb-12">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="
                h-[420px]
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

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="pb-12">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="mb-8">

        <span
          className="
            inline-flex
            rounded-full
            bg-[#D9F7E8]
            px-4
            py-1.5
            text-xs
            font-semibold
            text-[#2F6FED]
          "
        >
          Our Doc
        </span>

        <h1
  className="
    mt-3
    text-2xl
    font-bold
    text-[#212121]
    md:text-3xl
  "
>
  {subcategoryName}
</h1>

        <p
          className="
            mt-2
            text-sm
            text-[#7A7A7A]
          "
        >
          Find the right doctor for your healthcare needs.
        </p>

      </div>


      {/* ======================================
          DOCTOR GRID
      ====================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {doctors.map((doctor) => (

          <div
            key={doctor.id}
            onClick={() => handleDoctorClick(doctor.id)}
            className="
              group
              cursor-pointer
              overflow-hidden
              rounded-2xl
              border
              border-[#EEEEEE]
              bg-white
              shadow-[0_5px_20px_rgba(0,0,0,0.06)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]
            "
          >

            {/* ==================================
                IMAGE
            ================================== */}

            <div
              className="
                relative
                flex
                h-[210px]
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-[#F2FBF7]
                to-[#EEF6FF]
              "
            >

              {/* Background decoration */}

              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-[#D9F7E8]
                  opacity-60
                  blur-xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-10
                  -left-10
                  h-24
                  w-24
                  rounded-full
                  bg-[#BEE9FF]
                  opacity-50
                  blur-xl
                "
              />

              {/* Doctor */}

              <img
                src={doctor.image}
                alt={doctor.name}
                className="
                  relative
                  z-10
                  h-full
                  w-full
                  object-contain
                  px-3
                  pt-3
                  transition-transform
                  duration-500
                  group-hover:scale-[1.03]
                "
              />

              {/* Badge */}

              <div
                className="
                  absolute
                  left-3
                  top-3
                  z-20
                  rounded-full
                  bg-white/90
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-[#2F6FED]
                  shadow-sm
                  backdrop-blur
                "
              >
                Doctor
              </div>

            </div>


            {/* ==================================
                CARD CONTENT
            ================================== */}

            <div className="p-4">

              {/* Name */}

              <h2
                className="
                  truncate
                  text-lg
                  font-bold
                  text-[#212121]
                  transition-colors
                  group-hover:text-[#2F6FED]
                "
              >
                {doctor.name}
              </h2>

              {/* Designation */}

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  font-medium
                  text-[#7A7A7A]
                "
              >
                {doctor.designation}
              </p>


              {/* ==================================
                  INFORMATION
              ================================== */}

              <div className="mt-3 space-y-2.5">

                {/* Hospital */}

                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Building2 size={14} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] text-[#7A7A7A]">
                      Hospital
                    </p>

                    <p
                      className="
                        truncate
                        text-[11px]
                        font-medium
                        text-[#212121]
                      "
                    >
                      {doctor.hospital_name || "N/A"}
                    </p>

                  </div>

                </div>


                {/* Experience */}

                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Clock size={14} />
                  </div>

                  <div>

                    <p className="text-[9px] text-[#7A7A7A]">
                      Experience
                    </p>

                    <p className="text-[11px] font-medium text-[#212121]">
                      {doctor.years_of_experience || 0} Years
                    </p>

                  </div>

                </div>


                {/* Fee */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    bg-[#F8FAFC]
                    px-2.5
                    py-2
                  "
                >

                  <div className="flex items-center gap-2">

                    <div
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#D9F7E8]
                        text-[#2F6FED]
                        text-sm
                        font-bold
                      "
                    >
                      ৳
                    </div>

                    <div>

                      <p className="text-[9px] text-[#7A7A7A]">
                        Consultation Fee
                      </p>

                      <p className="text-xs font-bold text-[#212121]">
                        ৳ {doctor.doctor_fees}
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* ==================================
                  VIEW DETAILS
              ================================== */}

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDoctorClick(doctor.id);
                }}
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#2F6FED]
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-[#245bd0]
                  hover:shadow-md
                "
              >
                View Details

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>

            </div>

          </div>

        ))}

      </div>


      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {!doctors.length && (
        <div
          className="
            rounded-2xl
            border
            border-[#EEEEEE]
            bg-white
            p-10
            text-center
            shadow-sm
          "
        >
          <p className="text-sm text-[#7A7A7A]">
            No doctors found in this category.
          </p>
        </div>
      )}

    </section>
  );
}

export default PopularDoctors;