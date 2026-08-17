import { Link } from "react-router-dom";

import {
  Plane,
  Stethoscope,
  ArrowRight,
  CalendarCheck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function BookAppointment() {
  const appointmentOptions = [
    {
      id: 1,
      title: "Foreign Treatment",
      description: "Browse hospitals and packages",
      details:
        "Explore international treatment options, trusted hospitals, treatment packages, and healthcare facilities.",
      icon: Plane,
      path: "/foreign-treatment",
      badge: "International Care",
      number: "01",
    },
    {
      id: 2,
      title: "Top Doctors",
      description: "Find a specialist and book quickly",
      details:
        "Find experienced specialists and choose the right doctor for your healthcare needs.",
      icon: Stethoscope,
      path: "/popular-service/1",
      badge: "Specialist Care",
      number: "02",
    },
  ];

  return (
    <section className="w-full min-w-0 pb-12">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-9">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#D9F7E8]
            px-4
            py-2
            text-sm
            font-bold
            text-[#2F6FED]
          "
        >
          <CalendarCheck size={18} />
          Book Appointment
        </div>

        <h1
          className="
            mt-5
            text-3xl
            font-extrabold
            leading-tight
            tracking-tight
            text-[#212121]
            md:text-4xl
            lg:text-5xl
          "
        >
          Choose Your Healthcare Service
        </h1>

        <p
          className="
            mt-3
            max-w-2xl
            text-sm
            leading-7
            text-[#7A7A7A]
            md:text-base
          "
        >
          Choose the healthcare service that best fits your needs and explore
          trusted hospitals, treatment packages, and specialist doctors.
        </p>
      </div>

      {/* =====================================
          CARDS
      ===================================== */}

      <div className="grid gap-7 lg:grid-cols-2">
        {appointmentOptions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className="
                group
                relative
                flex
                min-h-[390px]
                flex-col
                overflow-hidden
                rounded-[30px]
                border
                border-white/70
                bg-gradient-to-br
                from-[#BEE9FF]
                via-[#D9F7E8]
                to-[#DFF8EF]
                p-6
                shadow-[0_10px_35px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
                md:p-8
              "
            >
              {/* =====================================
                  BACKGROUND DECORATION
              ===================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  bg-white/30
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-20
                  h-56
                  w-56
                  rounded-full
                  bg-white/20
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  right-10
                  top-24
                  h-2
                  w-2
                  rounded-full
                  bg-white/70
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  right-20
                  top-32
                  h-3
                  w-3
                  rounded-full
                  bg-white/50
                "
              />

              {/* =====================================
                  TOP ROW
              ===================================== */}

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/75
                      text-xs
                      font-extrabold
                      text-[#2F6FED]
                      shadow-sm
                    "
                  >
                    {item.number}
                  </span>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-white/75
                      px-3
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
                </div>

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/80
                    bg-white/80
                    text-[#2F6FED]
                    shadow-sm
                    transition-all
                    duration-500
                    group-hover:rotate-[-8deg]
                    group-hover:scale-110
                  "
                >
                  <ArrowRight size={21} />
                </div>
              </div>

              {/* =====================================
                  ICON
              ===================================== */}

              <div className="relative z-10 mt-8">
                <div
                  className="
                    relative
                    flex
                    h-[88px]
                    w-[88px]
                    items-center
                    justify-center
                    rounded-[26px]
                    border-[5px]
                    border-white/80
                    bg-white
                    text-[#2F6FED]
                    shadow-[0_12px_30px_rgba(0,0,0,0.10)]
                    transition-all
                    duration-500
                    group-hover:scale-105
                    group-hover:rotate-2
                  "
                >
                  <Icon size={38} strokeWidth={1.8} />

                  <div
                    className="
                      absolute
                      -bottom-2
                      -right-2
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-[#2F6FED]
                      text-white
                      shadow-md
                    "
                  >
                    <ShieldCheck size={15} />
                  </div>
                </div>
              </div>

              {/* =====================================
                  CONTENT
              ===================================== */}

              <div className="relative z-10 mt-7">
                <h2
                  className="
                    text-2xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                    text-[#212121]
                    transition-colors
                    duration-300
                    group-hover:text-[#2F6FED]
                    md:text-3xl
                  "
                >
                  {item.title}
                </h2>

                <p
                  className="
                    mt-2
                    text-base
                    font-bold
                    text-[#2F6FED]
                    md:text-lg
                  "
                >
                  {item.description}
                </p>

                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-6
                    text-[#5F6668]
                    md:text-base
                    md:leading-7
                  "
                >
                  {item.details}
                </p>
              </div>

              {/* =====================================
                  BOTTOM ACTION
              ===================================== */}

              <div
                className="
                  relative
                  z-10
                  mt-auto
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-t
                  border-white/70
                  pt-5
                "
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A7A7A]">
                    Healthcare Service
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#212121]">
                    Explore Now
                  </p>
                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#2F6FED]
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_6px_18px_rgba(47,111,237,0.25)]
                    transition-all
                    duration-300
                    group-hover:bg-[#245bd0]
                    group-hover:shadow-[0_8px_22px_rgba(47,111,237,0.32)]
                  "
                >
                  Get Started
                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BookAppointment;