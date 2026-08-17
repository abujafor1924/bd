import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Hospital,
} from "lucide-react";

import { getForeignTreatmentCountries } from "../services/foreignTreatmentService.js";

function ForeignTreatmentCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  // =========================================
  // LOAD COUNTRIES
  // =========================================

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);

        const response =
          await getForeignTreatmentCountries();

        console.log(
          "Foreign Treatment Countries:",
          response
        );

        if (Array.isArray(response)) {
          setCountries(response);
        } else if (
          Array.isArray(response?.results)
        ) {
          setCountries(response.results);
        } else {
          setCountries([]);
        }
      } catch (error) {
        console.error(
          "Foreign treatment countries loading error:",
          error
        );

        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // =========================================
  // RESPONSIVE CARD COUNT
  // =========================================

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateCards();

    window.addEventListener(
      "resize",
      updateCards
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateCards
      );
    };
  }, []);

  // =========================================
  // MAX INDEX
  // =========================================

  const maxIndex = Math.max(
    0,
    countries.length - visibleCards
  );

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  // =========================================
  // NAVIGATION
  // =========================================

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="w-full min-w-0 overflow-hidden">
        {/* HEADER SKELETON */}

        <div className="mb-7 flex items-end justify-between">
          <div>
            <div className="h-9 w-52 animate-pulse rounded-xl bg-gray-200" />

            <div className="mt-4 h-8 w-72 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-gray-200" />
          </div>

          <div className="hidden gap-2 sm:flex">
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>

        {/* CARD SKELETON */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[350px]
                animate-pulse
                overflow-hidden
                rounded-[24px]
                bg-gray-200
              "
            />
          ))}
        </div>
      </section>
    );
  }

  // =========================================
  // EMPTY
  // =========================================

  if (!countries.length) {
    return null;
  }

  // =========================================
  // CARD WIDTH
  // =========================================

  const gap = 20;

  const cardWidth =
    visibleCards === 1
      ? "100%"
      : visibleCards === 2
      ? `calc((100% - ${gap}px) / 2)`
      : visibleCards === 3
      ? `calc((100% - ${gap * 2}px) / 3)`
      : `calc((100% - ${gap * 3}px) / 4)`;

  // =========================================
  // SLIDER POSITION
  // =========================================

  const translateX =
    currentIndex === 0
      ? "0px"
      : `calc(-${currentIndex} * (${cardWidth} + ${gap}px))`;

  // =========================================
  // MAIN
  // =========================================

  return (
    <section className="w-full min-w-0 overflow-hidden">
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-7 flex items-end justify-between gap-5">
        {/* HEADER CONTENT */}

        <div className="min-w-0">
          {/* LABEL */}

          

          {/* TITLE */}

          <h2
            className="
              mt-4
              text-2xl
              font-extrabold
              tracking-tight
              text-[#212121]
              md:text-3xl
            "
          >
            International Healthcare
          </h2>

          {/* DESCRIPTION */}

          
        </div>

        {/* DESKTOP NAVIGATION */}

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous countries"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#EEEEEE]
              bg-white
              text-[#212121]
              shadow-[0_4px_15px_rgba(0,0,0,0.06)]
              transition-all
              duration-300
              hover:-translate-x-0.5
              hover:border-[#BEE9FF]
              hover:bg-[#D9F7E8]
              hover:text-[#2F6FED]
              active:scale-95
            "
          >
            <ArrowLeft size={19} />
          </button>

          {/* NEXT */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next countries"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[#2F6FED]
              text-white
              shadow-[0_6px_18px_rgba(47,111,237,0.25)]
              transition-all
              duration-300
              hover:translate-x-0.5
              hover:bg-[#2358CB]
              active:scale-95
            "
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>

      {/* =========================================
          CAROUSEL VIEWPORT
      ========================================= */}

      <div className="relative w-full overflow-hidden">
        {/* LEFT FADE */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-20
            h-full
            w-7
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
            w-7
            bg-gradient-to-l
            from-[#F2F2F2]
            to-transparent
          "
        />

        {/* TRACK */}

        <div
          className="
            flex
            py-3
            transition-transform
            duration-500
            ease-out
          "
          style={{
            gap: `${gap}px`,
            transform: `translateX(${translateX})`,
          }}
        >
          {countries.map((country) => {
            const countryName =
              country.name_en ||
              country.name ||
              country.name_bn ||
              "Country";

            return (
              <Link
                key={country.id}
                to={`/foreign-treatment/country/${country.id}`}
                style={{
                  width: cardWidth,
                  minWidth: cardWidth,
                }}
                className="
                  group
                  shrink-0
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/70
                  bg-gradient-to-br
                  from-[#BEE9FF]
                  via-[#D7F5F0]
                  to-[#DFF8EF]
                  shadow-[-3px_-3px_7px_rgba(255,255,255,0.8),3px_5px_12px_rgba(0,0,0,0.10)]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),5px_8px_18px_rgba(0,0,0,0.14)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#2F6FED]
                  focus:ring-offset-2
                "
              >
                {/* =====================================
                    FLAG AREA
                ===================================== */}

                <div
                  className="
                    relative
                    h-[165px]
                    overflow-hidden
                    bg-white/30
                  "
                >
                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-10
                      bg-gradient-to-t
                      from-black/10
                      via-transparent
                      to-white/20
                    "
                  />

                  {/* FLAG */}

                  {country.flag ? (
                    <img
                      src={country.flag}
                      alt={countryName}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-110
                      "
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";

                        const fallback =
                          event.currentTarget
                            .nextElementSibling;

                        if (fallback) {
                          fallback.style.display =
                            "flex";
                        }
                      }}
                    />
                  ) : null}

                  {/* FALLBACK */}

                  <div
                    style={{
                      display: country.flag
                        ? "none"
                        : "flex",
                    }}
                    className="
                      absolute
                      inset-0
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-white/85
                        text-[#2F6FED]
                        shadow-lg
                      "
                    >
                      <Globe2 size={38} />
                    </div>
                  </div>

                  {/* HOSPITAL BADGE */}

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      z-20
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-white/90
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-[#212121]
                      shadow-sm
                      backdrop-blur
                    "
                  >
                    <Hospital
                      size={14}
                      className="text-[#2F6FED]"
                    />

                    {country.hospital_count ?? 0}{" "}
                    Hospitals
                  </div>
                </div>

                {/* =====================================
                    CONTENT
                ===================================== */}

                <div className="p-5">
                  {/* COUNTRY NAME */}

                  <h3
                    className="
                      line-clamp-1
                      text-lg
                      font-extrabold
                      text-[#212121]
                      transition-colors
                      duration-300
                      group-hover:text-[#2F6FED]
                    "
                    title={countryName}
                  >
                    {countryName}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-1.5
                      line-clamp-2
                      min-h-[40px]
                      text-sm
                      leading-5
                      text-[#7A7A7A]
                    "
                  >
                    Trusted hospitals and healthcare
                    services available for international
                    patients.
                  </p>

                  {/* DIVIDER */}

                  <div
                    className="
                      my-4
                      border-t
                      border-white/70
                    "
                  />

                  {/* ACTION */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      className="
                        whitespace-nowrap
                        text-sm
                        font-bold
                        text-[#212121]
                      "
                    >
                      Explore Treatment
                    </span>

                    <span
                      className="
                        flex
                        h-10
                        w-10
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
                        group-hover:bg-[#2F6FED]
                        group-hover:text-white
                      "
                    >
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* =========================================
          MOBILE CONTROLS
      ========================================= */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          sm:hidden
        "
      >
        {/* VIEW ALL */}

        <Link
          to="/foreign-treatment"
          className="
            inline-flex
            items-center
            gap-1
            text-sm
            font-semibold
            text-[#2F6FED]
            transition
            hover:underline
          "
        >
          View All

          <ArrowRight size={16} />
        </Link>

        {/* MOBILE ARROWS */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous countries"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[#EEEEEE]
              bg-white
              text-[#212121]
              shadow-sm
              transition
              hover:bg-[#D9F7E8]
              hover:text-[#2F6FED]
              active:scale-95
            "
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next countries"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#2F6FED]
              text-white
              shadow-sm
              transition
              hover:bg-[#2358CB]
              active:scale-95
            "
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* =========================================
          DESKTOP VIEW ALL
      ========================================= */}

      <div className="mt-5 hidden sm:block">
        <Link
          to="/foreign-treatment"
          className="
            inline-flex
            items-center
            gap-1
            text-sm
            font-semibold
            text-[#2F6FED]
            transition
            hover:underline
          "
        >
          View All

          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export default ForeignTreatmentCountries;