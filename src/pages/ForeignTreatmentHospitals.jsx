import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Hospital,
  ArrowRight,
  Stethoscope,
  Globe2,
} from "lucide-react";

import {
  getCountryHospitals,
  getForeignTreatmentCountry,
} from "../services/foreignTreatmentService";

function ForeignTreatmentHospitals() {
  const { id } = useParams();

  const [country, setCountry] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOAD COUNTRY + HOSPITALS
  // =========================================

  useEffect(() => {
    loadHospitals();
  }, [id]);

  const loadHospitals = async () => {
    try {
      setLoading(true);

      const [countryData, hospitalData] = await Promise.all([
        getForeignTreatmentCountry(id),
        getCountryHospitals(id),
      ]);

      console.log("Foreign Treatment Country:", countryData);
      console.log("Foreign Treatment Hospitals:", hospitalData);

      // COUNTRY
      setCountry(countryData);

      // HOSPITALS
      if (Array.isArray(hospitalData)) {
        setHospitals(hospitalData);
      } else if (Array.isArray(hospitalData?.results)) {
        setHospitals(hospitalData.results);
      } else {
        setHospitals([]);
      }
    } catch (error) {
      console.error(
        "Failed to load foreign treatment hospitals:",
        error
      );

      setCountry(null);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // COUNTRY NAME
  // =========================================

  const countryName =
    country?.name_en ||
    country?.name ||
    country?.name_bn ||
    "Hospital";

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="pb-12">

        {/* =========================================
            HERO SKELETON
        ========================================= */}

        <div
          className="
            h-[230px]
            animate-pulse
            rounded-3xl
            bg-gray-200
          "
        />

        {/* =========================================
            SECTION TITLE SKELETON
        ========================================= */}

        <div className="mb-8 mt-12 flex items-center gap-4">

          <div
            className="
              h-14
              w-14
              animate-pulse
              rounded-2xl
              bg-gray-200
            "
          />

          <div>

            <div
              className="
                h-8
                w-48
                animate-pulse
                rounded-lg
                bg-gray-200
              "
            />

            <div
              className="
                mt-2
                h-4
                w-72
                animate-pulse
                rounded
                bg-gray-200
              "
            />

          </div>

        </div>

        {/* =========================================
            CARDS SKELETON
        ========================================= */}

        <div
          className="
            mt-10
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="
                h-64
                animate-pulse
                rounded-3xl
                bg-gray-200
              "
            />
          ))}
        </div>

      </section>
    );
  }

  // =========================================
  // MAIN
  // =========================================

  return (
    <section className="pb-12">

      {/* =========================================
          HEADER
      ========================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-[#2F6FED]
          to-[#4BA3FF]
          p-8
          shadow-[0_8px_30px_rgba(47,111,237,0.18)]
          md:p-10
        "
      >

        <div className="relative z-10">

          {/* =========================================
              BADGE
          ========================================= */}

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/20
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
            "
          >
            <Globe2 size={17} />

            Foreign Treatment
          </span>

          {/* =========================================
              TITLE
          ========================================= */}

          <h1
            className="
              mt-5
              text-3xl
              font-extrabold
              text-white
              md:text-4xl
            "
          >
            Available Hospitals
          </h1>

          {/* =========================================
              DESCRIPTION
          ========================================= */}

          <p
            className="
              mt-3
              max-w-2xl
              leading-7
              text-white/90
            "
          >
            Explore hospitals and their available
            specialties. Select a hospital to view
            complete details.
          </p>

        </div>

        {/* =========================================
            DECORATIVE CIRCLE
        ========================================= */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-56
            w-56
            rounded-full
            bg-white/10
          "
        />

      </div>

      {/* =========================================
          SECTION TITLE
      ========================================= */}

      <div className="mb-8 mt-12">

        <div className="flex items-center gap-4">

          {/* ICON */}

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Hospital size={28} />
          </div>

          {/* COUNTRY NAME */}

          <div className="min-w-0">

            <h2
              className="
                text-3xl
                font-bold
                text-[#212121]
              "
            >
              {countryName}
            </h2>

            <p className="mt-1 text-[#7A7A7A]">
              Choose a hospital to explore more
              information.
            </p>

          </div>

        </div>

      </div>

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {hospitals.length === 0 ? (

        <div
          className="
            flex
            min-h-64
            flex-col
            items-center
            justify-center
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >

          {/* ICON */}

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Hospital size={30} />
          </div>

          {/* TITLE */}

          <h3
            className="
              mt-5
              text-xl
              font-bold
              text-[#212121]
            "
          >
            No Hospitals Found
          </h3>

          {/* DESCRIPTION */}

          <p className="mt-2 text-[#7A7A7A]">
            There are currently no hospitals available
            for {countryName}.
          </p>

        </div>

      ) : (

        /* =========================================
           HOSPITAL CARDS
        ========================================= */

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {hospitals.map((hospital) => (

            <Link
              key={hospital.id}
              to={`/book-appointment/foreign-hospital/${hospital.id}`}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/50
                bg-gradient-to-r
                from-[#BEE9FF]
                to-[#DFF8EF]
                p-6
                shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_10px_rgba(0,0,0,0.10)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              {/* =========================================
                  DECORATIVE CIRCLE
              ========================================= */}

              <div
                className="
                  absolute
                  -right-8
                  -top-8
                  h-28
                  w-28
                  rounded-full
                  bg-white/30
                  transition-transform
                  duration-500
                  group-hover:scale-125
                "
              />

              <div className="relative">

                {/* =========================================
                    HOSPITAL ICON / IMAGE
                ========================================= */}

                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    text-[#2F6FED]
                    shadow-md
                  "
                >

                  {hospital.icon ? (

                    <img
                      src={hospital.icon}
                      alt={
                        hospital.name_en ||
                        hospital.name ||
                        "Hospital"
                      }
                      className="
                        h-full
                        w-full
                        object-contain
                        p-2
                      "
                    />

                  ) : (

                    <Hospital size={36} />

                  )}

                </div>

                {/* =========================================
                    HOSPITAL NAME
                ========================================= */}

                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    leading-tight
                    text-[#212121]
                  "
                >
                  {hospital.name_en ||
                    hospital.name ||
                    "Hospital"}
                </h3>

                {/* =========================================
                    BANGLA NAME
                ========================================= */}

                {hospital.name_bn && (
                  <p
                    className="
                      mt-1
                      font-medium
                      text-[#2F6FED]
                    "
                  >
                    {hospital.name_bn}
                  </p>
                )}

                {/* =========================================
                    SPECIALTY
                ========================================= */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    bg-white/70
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-[#212121]
                    "
                  >

                    <Stethoscope
                      size={18}
                      className="text-[#2F6FED]"
                    />

                    Specialty

                  </div>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-[#7A7A7A]
                    "
                  >
                    {hospital.speciality_en ||
                      hospital.speciality ||
                      hospital.speciality_bn ||
                      "Multiple specialties available"}
                  </p>

                </div>

                {/* =========================================
                    BOTTOM CTA
                ========================================= */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/60
                    pt-5
                  "
                >

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[#7A7A7A]
                    "
                  >
                    View Details
                  </span>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#2F6FED]
                      shadow
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    <ArrowRight size={19} />
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}

export default ForeignTreatmentHospitals;