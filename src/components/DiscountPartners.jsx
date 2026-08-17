import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  Building2,
} from "lucide-react";

import { getCollaborations } from "../services/collaborationService";

function DiscountPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);

  // =====================================
  // IMAGE URL
  // =====================================

  const getImageUrl = (image) => {
    return image || null;
  };

  // =====================================
  // LOAD PARTNERS
  // =====================================

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const response = await getCollaborations();

        console.log("Discount Partners:", response);

        if (Array.isArray(response)) {
          setPartners(response);
        } else if (Array.isArray(response?.results)) {
          setPartners(response.results);
        } else {
          setPartners([]);
        }
      } catch (error) {
        console.error(
          "Discount partners loading error:",
          error
        );

        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  // =====================================
  // SLIDER CONTROL
  // =====================================

  const moveSlider = (direction) => {
    if (!sliderRef.current) return;

    const cardWidth =
      sliderRef.current.clientWidth >= 1024
        ? 300
        : 295;

    sliderRef.current.scrollBy({
      left:
        direction === "next"
          ? cardWidth
          : -cardWidth,
      behavior: "smooth",
    });
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <section className="w-full min-w-0 overflow-hidden">
        <div className="mb-6">
          <div className="h-9 w-52 animate-pulse rounded-full bg-gray-200" />

          <div className="mt-4 h-9 w-80 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex gap-5 overflow-hidden">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[360px]
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
      </section>
    );
  }

  // =====================================
  // EMPTY
  // =====================================

  if (!partners.length) {
    return null;
  }

  // =====================================
  // MAIN
  // =====================================

  return (
    <section className="w-full min-w-0 overflow-hidden">
      {/* HEADER */}

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2
            className="
              mt-4
              text-2xl
              font-extrabold
              text-[#212121]
              md:text-3xl
            "
          >
            Our Discount Partners
          </h2>

          <p className="mt-2 text-[#7A7A7A]">
            Get exclusive healthcare discounts from
            our trusted partners.
          </p>
        </div>

        {/* DESKTOP CONTROLS */}

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => moveSlider("prev")}
            aria-label="Previous partners"
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
              transition-all
              duration-200
              hover:border-[#2F6FED]
              hover:bg-[#D9F7E8]
              hover:text-[#2F6FED]
            "
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => moveSlider("next")}
            aria-label="Next partners"
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
              transition-all
              duration-200
              hover:bg-[#245bd0]
            "
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER VIEWPORT */}

      <div className="relative min-w-0">
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-6
            bg-gradient-to-r
            from-[#F2F2F2]
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-6
            bg-gradient-to-l
            from-[#F2F2F2]
            to-transparent
          "
        />

        {/* CAROUSEL */}

        <div
          ref={sliderRef}
          className="
            flex
            gap-5
            overflow-x-auto
            scroll-smooth
            pb-5
            scrollbar-hide
            snap-x
            snap-mandatory
          "
        >
          {partners.map((partner) => {
            const partnerName =
              partner.name_en ||
              partner.name ||
              partner.name_bn ||
              "Partner";

            const partnerDetails =
              partner.details_en ||
              partner.details ||
              partner.details_bn ||
              "";

            const iconUrl = getImageUrl(partner.icon);

            return (
              <Link
                key={partner.id}
                to={`/discount-partner/${partner.id}`}
                className="
                  group
                  w-[280px]
                  min-w-[280px]
                  max-w-[280px]
                  shrink-0
                  snap-start
                  overflow-hidden
                  rounded-[16px]
                  border
                  border-white/15
                  bg-gradient-to-r
                  from-[#BEE9FF]
                  to-[#DFF8EF]
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
                "
              >
                {/* PARTNER ICON */}

                <div
                  className="
                    flex
                    w-full
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
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={partnerName}
                        className="
                          h-full
                          w-full
                          object-contain
                          p-3
                        "
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";

                          const fallback =
                            e.currentTarget
                              .nextElementSibling;

                          if (fallback) {
                            fallback.style.display =
                              "flex";
                          }
                        }}
                      />
                    ) : null}

                    <div
                      style={{
                        display: iconUrl
                          ? "none"
                          : "flex",
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
                      <Building2 size={42} />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5 text-center">
                  <h3
                    className="
                      line-clamp-1
                      text-lg
                      font-bold
                      text-[#212121]
                      transition-colors
                      duration-200
                      group-hover:text-[#2F6FED]
                    "
                  >
                    {partnerName}
                  </h3>

                  <div className="mt-3 flex justify-center">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-white/70
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        text-[#2F6FED]
                        shadow-sm
                      "
                    >
                      <BadgePercent size={15} />
                      Exclusive Discount
                    </span>
                  </div>

                  <p
                    className="
                      mt-4
                      line-clamp-3
                      min-h-[60px]
                      whitespace-pre-line
                      text-sm
                      leading-5
                      text-[#7A7A7A]
                    "
                  >
                    {partnerDetails ||
                      "Special healthcare discounts available."}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/40
                      pt-4
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[#212121]
                      "
                    >
                      View Details
                    </span>

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-white/70
                        text-[#2F6FED]
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:translate-x-1
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

      {/* MOBILE CONTROLS */}

      <div className="mt-3 flex justify-center gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => moveSlider("prev")}
          aria-label="Previous partners"
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
          "
        >
          <ArrowLeft size={18} />
        </button>

        <button
          type="button"
          onClick={() => moveSlider("next")}
          aria-label="Next partners"
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
          "
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

export default DiscountPartners;