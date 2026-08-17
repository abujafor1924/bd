
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Share2,
} from "lucide-react";

import {
  getSocialMediaServiceDetails,
} from "../services/socialMediaService";

function SocialMediaServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getSocialMediaServiceDetails(id);

        console.log(
          "Social Media Service Details:",
          data
        );

        setService(data);
      } catch (err) {
        console.error(
          "Social Media Service Details Error:",
          err
        );

        setError(
          "Unable to load this service."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadService();
    }
  }, [id]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <section className="w-full">
        <div className="mx-auto max-w-5xl">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 overflow-hidden rounded-3xl bg-white">
            <div className="h-48 animate-pulse bg-gray-200" />

            <div className="space-y-4 p-8">
              <div className="mx-auto h-10 w-64 animate-pulse rounded bg-gray-200" />

              <div className="mx-auto h-4 w-full max-w-2xl animate-pulse rounded bg-gray-200" />

              <div className="mx-auto h-4 w-4/5 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error || !service) {
    return (
      <section className="flex min-h-[450px] w-full items-center justify-center">
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Share2 size={40} />
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-[#212121]
            "
          >
            Service Not Found
          </h2>

          <p className="mt-2 text-[#7A7A7A]">
            {error || "This service could not be found."}
          </p>

          <Link
            to="/"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#2F6FED]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#2459C7]
            "
          >
            <ArrowLeft size={17} />
            Back Home
          </Link>
        </div>
      </section>
    );
  }

  // ==============================
  // DATA
  // ==============================

  const serviceName =
    service.name_en ||
    service.name ||
    service.name_bn ||
    "Social Media Service";

  const serviceDetails =
    service.details_en ||
    service.details ||
    service.details_bn ||
    "No details available.";

  const icon = service.icon || null;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl">
        {/* ==============================
            BACK BUTTON
        ============================== */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-[#2F6FED]
            transition-all
            hover:gap-3
          "
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* ==============================
            MAIN CARD
        ============================== */}

        <div
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[32px]
            border
            border-white/70
            bg-gradient-to-r
            from-[#BEE9FF]
            to-[#DFF8EF]
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          "
        >
          {/* Decorative circles */}

          <div
            className="
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-white/25
            "
          />

          <div
            className="
              absolute
              -bottom-24
              -left-20
              h-56
              w-56
              rounded-full
              bg-white/20
            "
          />

          {/* ==============================
              CONTENT
          ============================== */}

          <div className="relative px-6 py-10 md:px-12 md:py-14">
            {/* ICON */}

            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-white
                  bg-white
                  shadow-[0_10px_35px_rgba(47,111,237,0.15)]
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              >
                {icon ? (
                  <img
                    src={icon}
                    alt={serviceName}
                    className="
                      h-20
                      w-20
                      object-contain
                    "
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";

                      const fallback =
                        e.currentTarget
                          .nextElementSibling;

                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                ) : null}

                <div
                  style={{
                    display: icon ? "none" : "flex",
                  }}
                  className="
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-[#D9F7E8]
                    text-[#2F6FED]
                  "
                >
                  <Share2 size={40} />
                </div>
              </div>
            </div>

            {/* LABEL */}

            <div className="mt-7 text-center">
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-white/75
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-[#2F6FED]
                "
              >
                Social Media Service
              </span>
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-4
                text-center
                text-3xl
                font-extrabold
                text-[#212121]
                md:text-4xl
              "
            >
              {serviceName}
            </h1>

            {/* DETAILS */}

            <div
              className="
                mx-auto
                mt-8
                max-w-3xl
                rounded-2xl
                border
                border-white/70
                bg-white/65
                p-6
                md:p-8
              "
            >
              <h2
                className="
                  text-lg
                  font-bold
                  text-[#212121]
                "
              >
                About This Service
              </h2>

              <p
                className="
                  mt-4
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-[#5F6368]
                  md:text-base
                "
              >
                {serviceDetails}
              </p>
            </div>

            {/* LINK */}

            {service.link && (
              <div className="mt-8 flex justify-center">
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#2F6FED]
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_6px_20px_rgba(47,111,237,0.25)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#2459C7]
                  "
                >
                  Visit Page
                  <ExternalLink size={18} />
                </a>
              </div>
            )}

            {/* BOTTOM */}

            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#2F6FED]
                  transition-all
                  hover:gap-3
                "
              >
                Explore More Services
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialMediaServiceDetails;
