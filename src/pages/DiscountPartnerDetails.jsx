import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  Building2,
  CalendarDays,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { getCollaborationDetails } from "../services/collaborationService";

const API_BASE_URL = "/api/v1"; // Use the same base URL as defined in src/utils/constants.js

function DiscountPartnerDetails() {
  const { id } = useParams();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (image) => {
    if (!image) return null;

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  /* =========================================================
     LOAD PARTNER DETAILS
  ========================================================= */

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);

        const data = await getCollaborationDetails(id);

        console.log("Discount Partner Details:", data);

        setPartner(data);
      } catch (error) {
        console.error(
          "Discount partner details loading error:",
          error
        );

        setPartner(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDetails();
    }
  }, [id]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="w-full min-w-0 pb-12">
        <div className="mx-auto w-full max-w-6xl">

          {/* Back skeleton */}
          <div className="h-11 w-36 animate-pulse rounded-full bg-gray-200" />

          {/* Hero skeleton */}
          <div
            className="
              mt-6
              overflow-hidden
              rounded-[32px]
              bg-gradient-to-br
              from-[#BEE9FF]
              via-[#EAF8FF]
              to-[#DFF8EF]
              p-8
              md:p-12
            "
          >
            <div className="flex flex-col items-center">

              <div className="h-36 w-36 animate-pulse rounded-full bg-white/70" />

              <div className="mt-7 h-8 w-52 animate-pulse rounded-full bg-white/70" />

              <div className="mt-5 h-12 w-72 animate-pulse rounded-xl bg-white/60" />

              <div className="mt-5 h-4 w-full max-w-2xl animate-pulse rounded bg-white/50" />

              <div className="mt-2 h-4 w-3/4 max-w-xl animate-pulse rounded bg-white/50" />
            </div>
          </div>

          {/* Benefits skeleton */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-56
                  animate-pulse
                  rounded-[28px]
                  bg-gray-200
                "
              />
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="mt-8 h-32 animate-pulse rounded-[28px] bg-gray-200" />
        </div>
      </section>
    );
  }

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!partner) {
    return (
      <section className="w-full min-w-0 pb-12">
        <div className="mx-auto w-full max-w-5xl">

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#EEEEEE]
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#212121]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-x-0.5
              hover:border-[#D9F7E8]
              hover:bg-[#D9F7E8]
              hover:text-[#2F6FED]
            "
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div
            className="
              mt-6
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center
              rounded-[32px]
              border
              border-[#EEEEEE]
              bg-white
              px-6
              py-16
              text-center
              shadow-[0_12px_40px_rgba(0,0,0,0.06)]
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-[24px]
                bg-[#D9F7E8]
                text-[#2F6FED]
              "
            >
              <Building2 size={38} />
            </div>

            <h2
              className="
                mt-6
                text-2xl
                font-extrabold
                tracking-tight
                text-[#212121]
                md:text-3xl
              "
            >
              Partner Not Found
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-md
                text-sm
                leading-7
                text-[#7A7A7A]
              "
            >
              This discount partner could not be found or may
              no longer be available.
            </p>

            <Link
              to="/"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#2F6FED]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                shadow-[0_8px_22px_rgba(47,111,237,0.25)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#245bd0]
              "
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     DATA
  ========================================================= */

  const partnerName =
    partner.name_en ||
    partner.name ||
    partner.name_bn ||
    "Partner";

  const partnerNameBn = partner.name_bn;

  const partnerDetails =
    partner.details_en ||
    partner.details ||
    partner.details_bn ||
    "Special healthcare discounts and benefits are available through this trusted partner.";

  const iconUrl = getImageUrl(partner.icon);

  const formattedDate = partner.created_at
    ? new Date(partner.created_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : null;

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <section className="w-full min-w-0 pb-12">
      <div className="mx-auto w-full max-w-6xl">

        {/* =====================================================
            TOP NAVIGATION
        ===================================================== */}

        <div className="flex items-center justify-between gap-4">

          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#EEEEEE]
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#212121]
              shadow-[0_4px_15px_rgba(0,0,0,0.04)]
              transition-all
              duration-300
              hover:-translate-x-0.5
              hover:border-[#D9F7E8]
              hover:bg-[#D9F7E8]
              hover:text-[#2F6FED]
            "
          >
            <ArrowLeft
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-0.5
              "
            />

            Back to Home
          </Link>

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-[#D9F7E8]
              bg-[#F3FCF7]
              px-4
              py-2
              text-xs
              font-bold
              text-[#2F6FED]
              sm:inline-flex
            "
          >
            <ShieldCheck size={15} />

            Trusted Healthcare Partner
          </div>
        </div>

        {/* =====================================================
            HERO
        ===================================================== */}

        <div
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[32px]
            border
            border-white
            bg-gradient-to-br
            from-[#BEE9FF]
            via-[#EAF8FF]
            to-[#DFF8EF]
            shadow-[-5px_-5px_14px_rgba(255,255,255,0.9),5px_14px_40px_rgba(0,0,0,0.08)]
          "
        >

          {/* Decorative elements */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-72
              w-72
              rounded-full
              bg-white/30
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-28
              -left-24
              h-72
              w-72
              rounded-full
              bg-white/25
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-40
              w-40
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          {/* Hero content */}

          <div
            className="
              relative
              flex
              flex-col
              items-center
              px-5
              py-11
              text-center
              sm:px-8
              md:px-12
              md:py-16
            "
          >

            {/* Logo */}

            <div
              className="
                group
                relative
                flex
                h-36
                w-36
                items-center
                justify-center
                rounded-full
                border-[6px]
                border-white
                bg-white
                shadow-[0_15px_40px_rgba(0,0,0,0.14)]
                transition-transform
                duration-500
                hover:scale-105
                sm:h-40
                sm:w-40
              "
            >

              {/* Verified badge */}

              <div
                className="
                  absolute
                  -right-1
                  -top-1
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-white
                  bg-[#2F6FED]
                  text-white
                  shadow-lg
                "
              >
                <CheckCircle2 size={18} />
              </div>

              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={partnerName}
                  className="
                    h-full
                    w-full
                    rounded-full
                    object-contain
                    p-5
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                  onError={(e) => {
                    e.currentTarget.style.display = "none";

                    const fallback =
                      e.currentTarget.nextElementSibling;

                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />
              ) : null}

              {/* Fallback */}

              <div
                style={{
                  display: iconUrl ? "none" : "flex",
                }}
                className="
                  absolute
                  inset-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#2F6FED]
                "
              >
                <Building2 size={58} />
              </div>
            </div>

            {/* Badge */}

            <div
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/80
                bg-white/80
                px-4
                py-2
                text-xs
                font-bold
                text-[#2F6FED]
                shadow-[0_5px_18px_rgba(0,0,0,0.06)]
                backdrop-blur-md
                sm:text-sm
              "
            >
              <BadgePercent size={17} />

              Exclusive Discount Partner
            </div>

            {/* Name */}

            <h1
              className="
                mt-5
                max-w-4xl
                text-3xl
                font-black
                tracking-tight
                text-[#212121]
                sm:text-4xl
                md:text-5xl
              "
            >
              {partnerName}
            </h1>

            {/* Bangla name */}

            {partnerNameBn &&
              partnerNameBn !== partnerName && (
                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-[#2F6FED]
                    sm:text-base
                  "
                >
                  {partnerNameBn}
                </p>
              )}

            {/* Description */}

            <p
              className="
                mt-5
                max-w-3xl
                whitespace-pre-line
                text-sm
                leading-7
                text-[#596467]
                sm:text-base
                sm:leading-8
                md:text-lg
              "
            >
              {partnerDetails}
            </p>

            {/* Trust indicators */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/75
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#212121]
                  shadow-sm
                  backdrop-blur
                "
              >
                <ShieldCheck
                  size={16}
                  className="text-[#2F6FED]"
                />

                Trusted Partner
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/75
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#212121]
                  shadow-sm
                  backdrop-blur
                "
              >
                <BadgePercent
                  size={16}
                  className="text-[#2F6FED]"
                />

                Exclusive Benefits
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/75
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#212121]
                  shadow-sm
                  backdrop-blur
                "
              >
                <Star
                  size={16}
                  className="text-[#2F6FED]"
                />

                BelleVie Partner
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mt-10 mb-6">

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D9F7E8]
              bg-[#F3FCF7]
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-[#2F6FED]
            "
          >
            <Sparkles size={15} />

            Partner Benefits
          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-black
              tracking-tight
              text-[#212121]
              md:text-3xl
            "
          >
            Why Choose This Partner?
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-[#7A7A7A]
            "
          >
            Enjoy exclusive healthcare benefits and trusted
            services through our collaboration with this partner.
          </p>
        </div>

        {/* =====================================================
            BENEFIT CARDS
        ===================================================== */}

        <div className="grid gap-6 md:grid-cols-3">

          {/* Discount */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[#EEEEEE]
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(0,0,0,0.05)]
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-36
                w-36
                rounded-full
                bg-[#D9F7E8]
                opacity-60
                transition-transform
                duration-500
                group-hover:scale-125
              "
            />

            <div
              className="
                relative
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
              <BadgePercent size={27} />
            </div>

            <h3
              className="
                relative
                mt-6
                text-xl
                font-extrabold
                text-[#212121]
              "
            >
              Exclusive Discount
            </h3>

            <p
              className="
                relative
                mt-3
                text-sm
                leading-7
                text-[#7A7A7A]
              "
            >
              Get special healthcare benefits and exclusive
              discount facilities through this trusted partner.
            </p>

            <div
              className="
                relative
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#F2F2F2]
                px-3.5
                py-2
                text-xs
                font-bold
                text-[#2F6FED]
              "
            >
              <CheckCircle2 size={15} />

              Special Partner Benefit
            </div>
          </div>

          {/* Partner */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[#EEEEEE]
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(0,0,0,0.05)]
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-36
                w-36
                rounded-full
                bg-[#BEE9FF]
                opacity-60
                transition-transform
                duration-500
                group-hover:scale-125
              "
            />

            <div
              className="
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#EAF8FF]
                text-[#2F6FED]
                shadow-sm
              "
            >
              <Handshake size={27} />
            </div>

            <h3
              className="
                relative
                mt-6
                text-xl
                font-extrabold
                text-[#212121]
              "
            >
              Trusted Partnership
            </h3>

            <p
              className="
                relative
                mt-3
                text-sm
                leading-7
                text-[#7A7A7A]
              "
            >
              Access healthcare services through a trusted
              collaboration between BelleVie and this partner.
            </p>

            <div
              className="
                relative
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#F2F2F2]
                px-3.5
                py-2
                text-xs
                font-bold
                text-[#2F6FED]
              "
            >
              <ShieldCheck size={15} />

              Trusted Partner
            </div>
          </div>

          {/* Partner Since */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-[#EEEEEE]
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(0,0,0,0.05)]
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-36
                w-36
                rounded-full
                bg-[#DFF8EF]
                opacity-70
                transition-transform
                duration-500
                group-hover:scale-125
              "
            />

            <div
              className="
                relative
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
              <CalendarDays size={27} />
            </div>

            <h3
              className="
                relative
                mt-6
                text-xl
                font-extrabold
                text-[#212121]
              "
            >
              Partner Since
            </h3>

            <p
              className="
                relative
                mt-3
                text-sm
                leading-7
                text-[#7A7A7A]
              "
            >
              Our collaboration with this partner is part of
              BelleVie's trusted healthcare network.
            </p>

            <div
              className="
                relative
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#F2F2F2]
                px-3.5
                py-2
                text-xs
                font-bold
                text-[#2F6FED]
              "
            >
              <CalendarDays size={15} />

              {formattedDate || "Established Partner"}
            </div>
          </div>
        </div>

        {/* =====================================================
            TRUST STRIP
        ===================================================== */}

        <div
          className="
            mt-8
            rounded-[28px]
            border
            border-[#BEE9FF]
            bg-gradient-to-r
            from-[#EAF8FF]
            to-[#E9FAF3]
            p-6
            md:p-7
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              gap-5
              text-center
              sm:flex-row
              sm:text-left
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-[#2F6FED]
                shadow-sm
              "
            >
              <ShieldCheck size={28} />
            </div>

            <div className="flex-1">

              <h3
                className="
                  text-lg
                  font-extrabold
                  text-[#212121]
                "
              >
                A Trusted Healthcare Collaboration
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-[#7A7A7A]
                "
              >
                BelleVie works with trusted partners to make
                quality healthcare services more accessible
                and convenient.
              </p>
            </div>

            <div
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#2F6FED]
                shadow-sm
              "
            >
              <CheckCircle2 size={15} />

              Verified Partner
            </div>
          </div>
        </div>

        {/* =====================================================
            CTA
        ===================================================== */}

        <div
          className="
            relative
            mt-8
            overflow-hidden
            rounded-[30px]
            bg-[#212121]
            shadow-[0_12px_35px_rgba(0,0,0,0.12)]
          "
        >

          {/* Decorative */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-56
              w-56
              rounded-full
              bg-[#2F6FED]/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-16
              h-48
              w-48
              rounded-full
              bg-[#D9F7E8]/10
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              items-center
              justify-between
              gap-6
              px-6
              py-8
              text-center
              sm:flex-row
              sm:text-left
              md:px-9
              md:py-9
            "
          >

            <div className="flex items-start gap-4">

              <div
                className="
                  hidden
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                  text-[#BEE9FF]
                  sm:flex
                "
              >
                <Sparkles size={23} />
              </div>

              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#BEE9FF]
                  "
                >
                  Discover More
                </p>

                <h3
                  className="
                    mt-1
                    text-xl
                    font-extrabold
                    text-white
                    md:text-2xl
                  "
                >
                  Explore More Healthcare Partners
                </h3>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-white/60
                  "
                >
                  Discover more trusted partners and exclusive
                  healthcare benefits available through BelleVie.
                </p>

              </div>
            </div>

            <Link
              to="/"
              className="
                group
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-[#2F6FED]
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-[0_8px_22px_rgba(47,111,237,0.30)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#245bd0]
                hover:shadow-[0_12px_28px_rgba(47,111,237,0.38)]
              "
            >
              Explore Partners

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DiscountPartnerDetails;
