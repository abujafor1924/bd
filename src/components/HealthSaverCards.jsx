import { Link } from "react-router-dom";

import freemiumIcon from "../assets/health-icons/freemium.png";
import premiumIcon from "../assets/health-icons/premium.png";
import probashiIcon from "../assets/health-icons/nrb_package.png";

const schemes = [
  {
    id: 1,
    title: "Freemium Package",
    icon: freemiumIcon,
    path: "/health-saver/freemium",
  },
  {
    id: 2,
    title: "Premium Package",
    icon: premiumIcon,
    path: "/health-saver/premium",
  },
  {
    id: 3,
    title: "Probashi Package",
    icon: probashiIcon,
    path: "/health-saver/probashi",
  },
];

function HealthSaverCards() {
  return (
    <section className="mt-16 pb-10">
      {/* ==============================
          SECTION HEADER
      ============================== */}

      <div className="mb-8">
        

        <h2 className="text-3xl font-extrabold text-[#212121] md:text-4xl">
          Bellevie Health Protection Plan
        </h2>

        
      </div>

      {/* ==============================
          CARDS
      ============================== */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/70
              bg-gradient-to-br
              from-[#BEE9FF]
              via-[#D5F4F0]
              to-[#DFF8EF]
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[0_18px_40px_rgba(47,111,237,0.16)]
            "
          >
            {/* Decorative Circle */}

            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-white/30
                transition-transform
                duration-500
                group-hover:scale-125
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-16
                -left-16
                h-36
                w-36
                rounded-full
                bg-white/20
                transition-transform
                duration-500
                group-hover:scale-125
              "
            />

            {/* ==============================
                IMAGE
            ============================== */}

            <div
              className="
                relative
                flex
                h-56
                w-full
                items-center
                justify-center
                overflow-hidden
                px-5
                pt-5
              "
            >
              <img
                src={item.icon}
                alt={item.title}
                className="
                  h-full
                  w-full
                  object-contain
                  drop-shadow-[0_8px_12px_rgba(0,0,0,0.08)]
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-105
                "
              />
            </div>

            {/* ==============================
                CARD TITLE
            ============================== */}

            <div className="relative px-5 pb-7 pt-2 text-center">
              <h3
                className="
                  text-xl
                  font-extrabold
                  text-[#212121]
                  transition-colors
                  duration-300
                  group-hover:text-[#2F6FED]
                "
              >
                {item.title}
              </h3>

              <div
                className="
                  mx-auto
                  mt-3
                  h-1
                  w-10
                  rounded-full
                  bg-[#2F6FED]/70
                  transition-all
                  duration-300
                  group-hover:w-16
                "
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HealthSaverCards;