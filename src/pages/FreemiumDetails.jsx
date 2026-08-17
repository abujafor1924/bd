import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  ArrowLeft,
} from "lucide-react";

const details = {
  freemium: {
    title: "Freemium Package",
    subtitle: "Essential healthcare support for everyday needs.",
    text: "Basic healthcare benefits package designed to give you convenient access to essential healthcare services.",
    features: [
      "Essential healthcare support",
      "Access to selected healthcare services",
      "Convenient healthcare assistance",
      "Easy access to healthcare information",
    ],
  },

  premium: {
    title: "Premium Package",
    subtitle: "Complete healthcare support with premium benefits.",
    text: "A comprehensive healthcare package designed for individuals and families who want enhanced healthcare support and premium benefits.",
    features: [
      "Premium healthcare benefits",
      "Enhanced healthcare support",
      "Priority healthcare assistance",
      "Access to selected premium services",
    ],
  },

  probashi: {
    title: "Probashi Package",
    subtitle: "Healthcare support for Bangladeshis living abroad.",
    text: "A dedicated healthcare solution for Bangladeshi expatriates, helping them access reliable healthcare support for themselves and their families.",
    features: [
      "Healthcare support for expatriates",
      "Dedicated healthcare assistance",
      "Support for family healthcare needs",
      "Convenient access to healthcare services",
    ],
  },
};

function HealthSaverDetails() {
  const { type } = useParams();

  const data = details[type];

  // ==============================
  // INVALID TYPE
  // ==============================

  if (!data) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div
          className="
            w-full
            max-w-xl
            rounded-3xl
            border
            border-[#EEEEEE]
            bg-white
            p-8
            text-center
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            <HeartPulse size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#212121]">
            Package Not Found
          </h1>

          <p className="mt-2 text-[#7A7A7A]">
            The healthcare package you are looking for does not exist.
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
              font-semibold
              text-white
              transition
              hover:bg-[#245bd0]
            "
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12">
      {/* ==============================
          BACK BUTTON
      ============================== */}

      <Link
        to="/"
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#EEEEEE]
          bg-white
          px-4
          py-2.5
          text-sm
          font-semibold
          text-[#212121]
          shadow-sm
          transition
          hover:border-[#D9F7E8]
          hover:bg-[#D9F7E8]
          hover:text-[#2F6FED]
        "
      >
        <ArrowLeft size={17} />
        Back to HealthSaver
      </Link>

      {/* ==============================
          HERO CARD
      ============================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-white/70
          bg-gradient-to-br
          from-[#BEE9FF]
          via-[#D5F4F0]
          to-[#DFF8EF]
          p-7
          shadow-[0_12px_35px_rgba(0,0,0,0.07)]
          md:p-10
        "
      >
        {/* Decorative circles */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-48
            w-48
            rounded-full
            bg-white/30
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-56
            w-56
            rounded-full
            bg-white/20
          "
        />

        <div className="relative max-w-3xl">
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/70
              px-4
              py-2
              text-sm
              font-semibold
              text-[#2F6FED]
              backdrop-blur-sm
            "
          >
            <ShieldCheck size={18} />

            Bellevie HealthSaver
          </div>

          {/* Title */}

          <h1
            className="
              mt-6
              text-3xl
              font-extrabold
              leading-tight
              text-[#212121]
              md:text-5xl
            "
          >
            {data.title}
          </h1>

          {/* Subtitle */}

          <p
            className="
              mt-4
              text-lg
              font-semibold
              leading-7
              text-[#212121]
              md:text-xl
            "
          >
            {data.subtitle}
          </p>

          {/* Description */}

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-[#5F6368]
              md:text-base
            "
          >
            {data.text}
          </p>
        </div>
      </div>

      {/* ==============================
          BENEFITS
      ============================== */}

      <div className="mt-8">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2F6FED]">
            Package Benefits
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#212121] md:text-3xl">
            What you get
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-[#EEEEEE]
                bg-white
                p-5
                shadow-[0_6px_20px_rgba(0,0,0,0.04)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_10px_25px_rgba(0,0,0,0.07)]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#D9F7E8]
                  text-[#2F6FED]
                "
              >
                <CheckCircle2 size={21} />
              </div>

              <div>
                <p className="font-semibold text-[#212121]">
                  {feature}
                </p>

                <p className="mt-1 text-sm leading-5 text-[#7A7A7A]">
                  Included as part of your selected HealthSaver package.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==============================
          CTA
      ============================== */}

      <div
        className="
          mt-8
          flex
          flex-col
          items-start
          justify-between
          gap-5
          rounded-3xl
          bg-white
          p-6
          shadow-[0_8px_25px_rgba(0,0,0,0.06)]
          md:flex-row
          md:items-center
          md:p-7
        "
      >
        <div>
          <h3 className="text-xl font-bold text-[#212121]">
            Interested in this package?
          </h3>

          <p className="mt-1 text-sm text-[#7A7A7A]">
            Explore our healthcare services and get started with Bellevie.
          </p>
        </div>

        <Link
          to="/book-appointment"
          className="
            inline-flex
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#2F6FED]
            px-6
            py-3
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#245bd0]
            hover:shadow-md
          "
        >
          Book Appointment
        </Link>
      </div>
    </section>
  );
}

export default HealthSaverDetails;