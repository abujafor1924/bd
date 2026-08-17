import {
  ShieldCheck,
  HeartPulse,
  Hospital,
  Video,
  Plane,
  Wallet,
  CheckCircle2,
  Star,
} from "lucide-react";

import probashiBanner from "../assets/images/bellevie_wroktwo.jpg";

function ProbashiDetails() {
  const benefits = [
    {
      title: "Life Coverage",
      value: "BDT 500,000",
      icon: ShieldCheck,
    },
    {
      title: "Permanent Total Disability",
      value: "BDT 50,000 - 200,000",
      icon: HeartPulse,
    },
    {
      title: "Funeral Benefit",
      value: "Up to BDT 20,000",
      icon: Wallet,
    },
    {
      title: "Repatriation of Mortal Remains",
      value: "BDT 15,000",
      icon: Plane,
    },
    {
      title: "Loss of Income",
      value: "Maximum six month coverage - BDT 50,000",
      icon: Wallet,
    },
    {
      title: "Hospitalization",
      value: "BDT 50,000 (BDT 5,000/day, up to 5 days in a row)",
      icon: Hospital,
    },
    {
      title: "Telemedicine",
      value:
        "24/7 Unlimited Audio & Video Doctor Consultancy (Up to six members of Family)",
      icon: Video,
    },
  ];

  return (
    <section className="pb-14">

    {/* =====================================
    HERO BANNER
===================================== */}

<div
  className="
    relative
    mb-12
    w-full
    overflow-hidden
    rounded-[2rem]
    shadow-[0_10px_35px_rgba(0,0,0,0.08)]
  "
>
  <img
  src={probashiBanner}
  alt="Bellevie Guardian NRB Health Support"
  className="
    block
    w-full
    h-[320px]
    md:h-[340px]
    lg:h-[480px]
    object-cover
  "
/>

  {/* Banner Badge */}

  <div
    className="
      absolute
      bottom-5
      left-5
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-white/95
      px-4
      py-2
      text-sm
      font-semibold
      text-[#2F6FED]
      shadow-lg
      md:bottom-7
      md:left-7
    "
  >
    <ShieldCheck size={17} />

    Bellevie HealthSaver
  </div>
</div>


      {/* =====================================
          ANNUAL PREMIUM
      ===================================== */}

      <div className="mt-10">

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
            shadow-[0_10px_30px_rgba(0,0,0,0.07)]
            md:p-9
          "
        >

          {/* Decorative circle */}

          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-white/30
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#2F6FED]
                "
              >
                <Wallet size={18} />

                Annual Premium
              </div>

              <p className="mt-2 text-sm text-[#7A7A7A]">
                Affordable yearly healthcare protection
              </p>

            </div>


            <div className="sm:text-right">

              <h2
                className="
                  text-4xl
                  font-extrabold
                  text-[#212121]
                  md:text-5xl
                "
              >
                BDT 6,250
              </h2>

              <p className="mt-1 text-sm font-medium text-[#7A7A7A]">
                Per Year
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          BENEFITS HEADER
      ===================================== */}

      <div className="mt-14 mb-7">

        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-[#2F6FED]
          "
        >
          Package Benefits
        </p>


        <div
          className="
            mt-1
            flex
            flex-col
            justify-between
            gap-2
            md:flex-row
            md:items-end
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-extrabold
                text-[#212121]
              "
            >
              Benefits & Coverage
            </h2>

            <p className="mt-2 text-sm text-[#7A7A7A]">
              Explore the coverage included with your NRB Health Support
              package.
            </p>

          </div>


          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              bg-[#D9F7E8]
              px-4
              py-2
              text-xs
              font-semibold
              text-green-700
            "
          >
            <CheckCircle2 size={15} />

            7 Benefits Included
          </div>

        </div>

      </div>


      {/* =====================================
          BENEFITS GRID
      ===================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        {benefits.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
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
                p-6
                shadow-[0_8px_25px_rgba(0,0,0,0.07)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_14px_32px_rgba(47,111,237,0.12)]
              "
            >

              {/* Decorative circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-white/25
                  transition-transform
                  duration-500
                  group-hover:scale-125
                "
              />


              <div className="relative flex items-start gap-4">

                {/* Icon */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/90
                    text-[#2F6FED]
                    shadow-[0_5px_15px_rgba(0,0,0,0.07)]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <Icon size={27} />
                </div>


                {/* Content */}

                <div className="min-w-0">

                  <h3
                    className="
                      text-lg
                      font-bold
                      leading-6
                      text-[#212121]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-[#6F7377]
                    "
                  >
                    {item.value}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* =====================================
          BOTTOM NOTE
      ===================================== */}

      <div
        className="
          mt-8
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-[#EEEEEE]
          bg-white
          p-5
          shadow-[0_6px_20px_rgba(0,0,0,0.04)]
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#D9F7E8]
            text-[#2F6FED]
          "
        >
          <CheckCircle2 size={19} />
        </div>


        <div>

          <h3 className="font-semibold text-[#212121]">
            Healthcare support for you and your family
          </h3>

          <p className="mt-1 text-sm leading-6 text-[#7A7A7A]">
            This package provides healthcare and support benefits designed
            to help protect you and eligible family members.
          </p>

        </div>

      </div>

    </section>
  );
}

export default ProbashiDetails;