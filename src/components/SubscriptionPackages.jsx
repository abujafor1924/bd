import { Link } from "react-router-dom";
import {
  ArrowRight,
  Crown,
  HeartPulse,
  Users,
  WalletCards,
  Sparkles,
} from "lucide-react";

// =====================================
// LOCAL PACKAGE ICONS
// =====================================

import familyIcon from "../assets/images/bellevie _family.png";
import eliteIcon from "../assets/images/vip-card.png";
import growIcon from "../assets/images/growth_wtih_bellevie.png";
import leaderIcon from "../assets/images/leadership.png";

// =====================================
// STATIC PACKAGES
// =====================================

const packages = [
  {
    id: "family-care",
    title: "BelleVie Family Care Package",
    shortDescription:
      "Complete healthcare protection and support for your entire family under one membership.",
    icon: familyIcon,
    fallbackIcon: HeartPulse,
    badge: "Family Care",
  },

  {
    id: "elite-membership",
    title: "BelleVie Elite Membership",
    shortDescription:
      "Premium healthcare support with priority access, faster service, and personalized assistance.",
    icon: eliteIcon,
    fallbackIcon: Crown,
    badge: "Premium",
  },

  {
    id: "grow-with-bellevie",
    title: "Grow with BelleVie",
    shortDescription:
      "Build a meaningful income opportunity by helping your community access better healthcare.",
    icon: growIcon,
    fallbackIcon: WalletCards,
    badge: "Opportunity",
  },

  {
    id: "community-leader",
    title: "BelleVie Community Leader",
    shortDescription:
      "Lead your community toward better health protection while building leadership and income opportunities.",
    icon: leaderIcon,
    fallbackIcon: Users,
    badge: "Leadership",
  },
];

// =====================================
// COMPONENT
// =====================================

function SubscriptionPackages() {
  return (
    <section className="w-full min-w-0 pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">

        {/* Section Badge */}

        

        {/* Heading */}

        <h2
          className="
            mt-4
            text-2xl
            font-extrabold
            tracking-tight
            text-[#212121]
            sm:text-3xl
            md:text-4xl
          "
        >
          BelleVie Subscription Packages
        </h2>

        {/* Description */}

        <p
          className="
            mt-3
            max-w-2xl
            text-sm
            leading-6
            text-[#7A7A7A]
            md:text-base
            md:leading-7
          "
        >
          Explore healthcare memberships, premium services, and
          community opportunities designed to support you and your
          family.
        </p>
      </div>


      {/* =====================================================
          PACKAGE GRID
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {packages.map((item) => {
          const FallbackIcon = item.fallbackIcon;

          return (
            <Link
              key={item.id}
              to={`/subscription-package/${item.id}`}
              className="
                group
                relative
                flex
                min-h-[390px]
                flex-col
                overflow-hidden
                rounded-[28px]
                border
                border-white/70
                bg-gradient-to-br
                from-[#BEE9FF]
                via-[#EAF8FF]
                to-[#DFF8EF]
                p-6
                shadow-[-4px_-4px_10px_rgba(255,255,255,0.75),4px_8px_24px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[-5px_-5px_14px_rgba(255,255,255,0.9),6px_14px_34px_rgba(0,0,0,0.13)]
              "
            >

              {/* =================================================
                  DECORATIVE BACKGROUND
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-36
                  w-36
                  rounded-full
                  bg-white/35
                  transition-transform
                  duration-700
                  group-hover:scale-150
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-16
                  -left-16
                  h-40
                  w-40
                  rounded-full
                  bg-white/20
                  transition-transform
                  duration-700
                  group-hover:scale-125
                "
              />

              {/* Small glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-24
                  h-24
                  w-24
                  -translate-x-1/2
                  rounded-full
                  bg-white/20
                  blur-2xl
                "
              />


              {/* =================================================
                  TOP ROW
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-between
                "
              >

                {/* Badge */}

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/70
                    bg-white/75
                    px-3.5
                    py-1.5
                    text-xs
                    font-bold
                    text-[#2F6FED]
                    shadow-sm
                    backdrop-blur-sm
                  "
                >
                  <Sparkles size={13} />

                  {item.badge}
                </span>


                {/* Small Icon */}

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/70
                    bg-white/70
                    text-[#2F6FED]
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover:rotate-12
                    group-hover:scale-110
                  "
                >
                  <HeartPulse size={17} />
                </span>

              </div>


              {/* =================================================
                  PACKAGE ICON
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  justify-center
                  py-7
                "
              >

                <div
                  className="
                    relative
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-[5px]
                    border-white
                    bg-white
                    shadow-[0_12px_30px_rgba(47,111,237,0.14)]
                    transition-all
                    duration-500
                    group-hover:scale-105
                    group-hover:shadow-[0_16px_38px_rgba(47,111,237,0.22)]
                  "
                >

                  {/* Inner Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-2
                      rounded-full
                      bg-gradient-to-br
                      from-[#F8FDFF]
                      to-[#EAF8FF]
                    "
                  />

                  {/* Image */}

                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="
                        relative
                        z-10
                        h-full
                        w-full
                        object-contain
                        p-4
                        transition-transform
                        duration-500
                        group-hover:scale-110
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
                      display: item.icon ? "none" : "flex",
                    }}
                    className="
                      absolute
                      inset-0
                      z-10
                      items-center
                      justify-center
                      text-[#2F6FED]
                    "
                  >
                    <FallbackIcon size={44} />
                  </div>

                </div>

              </div>


              {/* =================================================
                  CONTENT
              ================================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-1
                  flex-col
                  text-center
                "
              >

                {/* Title */}

                <h3
                  className="
                    line-clamp-2
                    min-h-[56px]
                    text-lg
                    font-extrabold
                    leading-7
                    tracking-tight
                    text-[#212121]
                    transition-colors
                    duration-300
                    group-hover:text-[#2F6FED]
                  "
                >
                  {item.title}
                </h3>


                {/* Description */}

                <p
                  className="
                    mt-3
                    line-clamp-3
                    min-h-[66px]
                    text-sm
                    leading-5
                    text-[#6F7678]
                  "
                >
                  {item.shortDescription}
                </p>


                {/* =================================================
                    BOTTOM CTA
                ================================================= */}

                <div
                  className="
                    mt-auto
                    pt-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/70
                      pt-5
                    "
                  >

                    {/* CTA Text */}

                    <div className="flex items-center gap-2">

                      <span
                        className="
                          text-sm
                          font-bold
                          text-[#212121]
                          transition-colors
                          duration-300
                          group-hover:text-[#2F6FED]
                        "
                      >
                        View Details
                      </span>

                    </div>


                    {/* Arrow */}

                    <span
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/70
                        bg-white/80
                        text-[#2F6FED]
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:bg-white
                        group-hover:shadow-md
                      "
                    >
                      <ArrowRight
                        size={18}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                        "
                      />
                    </span>

                  </div>

                </div>

              </div>

            </Link>
          );
        })}

      </div>
    </section>
  );
}

export default SubscriptionPackages;