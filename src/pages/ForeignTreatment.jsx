import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Plane,
  ArrowRight,
  Globe2,
  Hospital,
} from "lucide-react";

import { getForeignTreatmentCountries } from "../services/foreignTreatmentService";

function ForeignTreatment() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const data = await getForeignTreatmentCountries();

      setCountries(data?.results || []);
    } catch (error) {
      console.error(
        "Failed to load foreign treatment countries:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="pb-12">

        {/* Hero Skeleton */}

        <div className="h-[260px] animate-pulse rounded-3xl bg-gray-200" />

        {/* Cards Skeleton */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-3xl bg-gray-200"
            />
          ))}

        </div>

      </section>
    );
  }

  return (
    <section className="pb-12">

      {/* ================= HERO ================= */}

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
          md:p-12
        "
      >

        <div className="relative z-10 max-w-3xl">

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
            <Plane size={17} />

            Foreign Treatment
          </span>


          <h1
            className="
              mt-5
              text-4xl
              font-extrabold
              leading-tight
              text-white
              md:text-5xl
            "
          >
            International
            <br />
            Healthcare Support
          </h1>


          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-white/90
              md:text-lg
            "
          >
            Explore hospitals and healthcare facilities across different
            countries and find the right treatment option for your needs.
          </p>

        </div>


        {/* Decorative Elements */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-64
            w-64
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-24
            right-20
            h-64
            w-64
            rounded-full
            bg-white/10
          "
        />

      </div>


      {/* ================= COUNTRY HEADER ================= */}

      <div className="mb-8 mt-12">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
              shadow-sm
            "
          >
            <Globe2 size={27} />
          </div>


          <div>

            <h2
              className="
                text-3xl
                font-bold
                text-[#212121]
              "
            >
              Choose a Country
            </h2>

            <p className="mt-1 text-[#7A7A7A]">
              Select a country to explore available hospitals.
            </p>

          </div>

        </div>

      </div>


      {/* ================= COUNTRIES ================= */}

      {countries.length === 0 ? (

        <div
          className="
            flex
            min-h-64
            items-center
            justify-center
            rounded-3xl
            bg-white
            text-[#7A7A7A]
            shadow-sm
          "
        >
          No countries available.
        </div>

      ) : (

        <div
          className="
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {countries.map((country) => (

            <Link
              key={country.id}
              to={`/foreign-treatment/country/${country.id}`}
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
                p-7
                shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_10px_rgba(0,0,0,0.10)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              {/* Decorative Circle */}

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

                {/* Flag */}

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
                    shadow-md
                  "
                >

                  {country.flag ? (

                    <img
                      src={country.flag}
                      alt={country.name_en || country.name}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                  ) : (

                    <Globe2
                      size={34}
                      className="text-[#2F6FED]"
                    />

                  )}

                </div>


                {/* Country Name */}

                <h3
                  className="
                    mt-6
                    text-2xl
                    font-bold
                    text-[#212121]
                  "
                >
                  {country.name_en || country.name}
                </h3>


                {/* Bangla Name */}

                {country.name_bn && (
                  <p
                    className="
                      mt-1
                      text-base
                      font-semibold
                      text-[#2F6FED]
                    "
                  >
                    {country.name_bn}
                  </p>
                )}


                {/* Hospital Count */}

                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white/80
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#7A7A7A]
                  "
                >

                  <Hospital
                    size={17}
                    className="text-[#2F6FED]"
                  />

                  {country.hospital_count || 0} Hospitals

                </div>


                {/* Bottom CTA */}

                <div
                  className="
                    mt-7
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
                    View Hospitals
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

export default ForeignTreatment;