import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  Crown,
  ListChecks,
  Sparkles,
} from "lucide-react";

import { subscriptionPackages } from "../data/subscriptionPackages";

function SubscriptionPackageDetails() {
  const { id } = useParams();

  const packageData = subscriptionPackages.find(
    (item) => item.id === id
  );

  // =====================================
  // NOT FOUND
  // =====================================

  if (!packageData) {
    return (
      <section className="w-full min-w-0">
        <div className="mx-auto flex min-h-[520px] w-full max-w-5xl items-center justify-center px-4">
          <div
            className="
              w-full
              max-w-lg
              rounded-[28px]
              border
              border-[#EEEEEE]
              bg-white
              p-8
              text-center
              shadow-[0_12px_40px_rgba(0,0,0,0.06)]
              sm:p-10
            "
          >
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-[24px]
                bg-[#D9F7E8]
                text-[#2F6FED]
                shadow-sm
              "
            >
              <Crown size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-[#212121]">
              Package Not Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#7A7A7A]">
              The subscription package you are looking for could not be
              found.
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
                shadow-[0_6px_18px_rgba(47,111,237,0.20)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#245bd0]
                hover:shadow-[0_8px_22px_rgba(47,111,237,0.28)]
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

  const {
    name,
    icon,
    shortDescription,
    badge,
    content,
  } = packageData;

  // =====================================
  // MAIN
  // =====================================

  return (
    <section className="w-full min-w-0 pb-10">
      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================
            TOP NAVIGATION
        ===================================== */}

        <div className="mb-6 flex items-center justify-between">
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
              px-4
              py-2.5
              text-sm
              font-bold
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
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-[#BEE9FF]
              bg-[#D9F7E8]
              px-4
              py-2
              text-xs
              font-bold
              text-[#2F6FED]
              sm:inline-flex
            "
          >
            <Sparkles size={15} />
            BelleVie Healthcare
          </div>
        </div>

        {/* =====================================
            HERO
        ===================================== */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white
            bg-gradient-to-br
            from-[#BEE9FF]
            via-[#EAF8FF]
            to-[#DFF8EF]
            shadow-[0_16px_45px_rgba(0,0,0,0.08)]
          "
        >
          {/* Decorative Shapes */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
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
              -bottom-28
              -left-20
              h-72
              w-72
              rounded-full
              bg-white/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[22%]
              top-10
              h-10
              w-10
              rounded-full
              bg-white/25
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              items-center
              px-5
              py-10
              text-center
              sm:px-8
              md:px-12
              md:py-14
            "
          >
            {/* Icon */}

            <div
              className="
                relative
                flex
                h-32
                w-32
                items-center
                justify-center
                overflow-hidden
                rounded-[30px]
                border-[5px]
                border-white
                bg-white
                p-5
                shadow-[0_14px_35px_rgba(0,0,0,0.12)]
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:shadow-[0_18px_40px_rgba(47,111,237,0.16)]
                md:h-36
                md:w-36
              "
            >
              <img
                src={icon}
                alt={name}
                className="
                  h-full
                  w-full
                  object-contain
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
                onError={(e) => {
                  e.currentTarget.style.display = "none";

                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display =
                      "flex";
                  }
                }}
              />

              <div
                className="
                  absolute
                  inset-0
                  hidden
                  items-center
                  justify-center
                  bg-white
                  text-[#2F6FED]
                "
              >
                <Crown size={46} />
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
                bg-white/75
                px-4
                py-2
                text-xs
                font-extrabold
                uppercase
                tracking-wide
                text-[#2F6FED]
                shadow-sm
                backdrop-blur-sm
              "
            >
              <Sparkles size={15} />
              {badge}
            </div>

            {/* Title */}

            <h1
              className="
                mt-5
                max-w-4xl
                text-3xl
                font-extrabold
                leading-tight
                tracking-tight
                text-[#212121]
                sm:text-4xl
                md:text-5xl
              "
            >
              {name}
            </h1>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-3xl
                text-sm
                leading-7
                text-[#5F6668]
                sm:text-base
                md:text-lg
              "
            >
              {shortDescription}
            </p>
          </div>
        </div>

        {/* =====================================
            CONTENT + SIDEBAR
        ===================================== */}

        <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* =====================================
              LEFT CONTENT
          ===================================== */}

          <div className="min-w-0">

            {/* INTRO */}

            {content.intro && (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#EEEEEE]
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                  md:p-8
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-[#D9F7E8]
                    opacity-60
                  "
                />

                <div className="relative flex items-start gap-4">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      min-w-[48px]
                      items-center
                      justify-center
                      rounded-[16px]
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Sparkles size={21} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-xs
                        font-extrabold
                        uppercase
                        tracking-wider
                        text-[#2F6FED]
                      "
                    >
                      Package Overview
                    </p>

                    <h2
                      className="
                        mt-1
                        text-xl
                        font-extrabold
                        text-[#212121]
                        md:text-2xl
                      "
                    >
                      About This Package
                    </h2>

                    <p
                      className="
                        mt-3
                        text-sm
                        font-semibold
                        leading-7
                        text-[#2F6FED]
                        md:text-base
                      "
                    >
                      {content.intro}
                    </p>
                  </div>
                </div>

                {content.description && (
                  <p
                    className="
                      relative
                      mt-6
                      border-t
                      border-[#EEEEEE]
                      pt-5
                      text-sm
                      leading-7
                      text-[#7A7A7A]
                      md:text-base
                    "
                  >
                    {content.description}
                  </p>
                )}
              </div>
            )}

            {/* SECTIONS */}

            <div className="mt-7 space-y-6">
              {content.sections?.map((section, sectionIndex) => (
                <div
                  key={`${section.title}-${sectionIndex}`}
                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#EEEEEE]
                    bg-white
                    shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                  "
                >
                  {/* Section Header */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                      border-b
                      border-[#EEEEEE]
                      bg-gradient-to-r
                      from-[#F8FCFF]
                      to-[#F7FFFB]
                      px-5
                      py-5
                      md:px-7
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        min-w-[44px]
                        items-center
                        justify-center
                        rounded-[14px]
                        bg-[#D9F7E8]
                        text-[#2F6FED]
                        shadow-sm
                      "
                    >
                      <ListChecks size={20} />
                    </div>

                    <div className="min-w-0">
                      <h2
                        className="
                          text-lg
                          font-extrabold
                          text-[#212121]
                          md:text-xl
                        "
                      >
                        {section.title}
                      </h2>

                      {section.subtitle && (
                        <p className="mt-1 text-sm text-[#7A7A7A]">
                          {section.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Section Content */}

                  <div className="p-5 md:p-7">

                    {/* LIST */}

                    {section.type === "list" && (
                      <div className="grid gap-3">
                        {section.items?.map((item, index) => (
                          <div
                            key={index}
                            className="
                              group/item
                              flex
                              items-start
                              gap-3
                              rounded-[16px]
                              border
                              border-transparent
                              bg-[#F8F8F8]
                              px-4
                              py-3.5
                              transition-all
                              duration-300
                              hover:border-[#D9F7E8]
                              hover:bg-[#F7FFFB]
                            "
                          >
                            <div
                              className="
                                mt-0.5
                                flex
                                h-6
                                w-6
                                min-w-[24px]
                                items-center
                                justify-center
                                rounded-full
                                bg-[#D9F7E8]
                                text-[#2F6FED]
                              "
                            >
                              <Check size={14} strokeWidth={3} />
                            </div>

                            <p
                              className="
                                text-sm
                                leading-6
                                text-[#212121]
                              "
                            >
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* PRICING */}

                    {section.type === "pricing" && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {section.items?.map((item, index) => (
                          <div
                            key={index}
                            className="
                              group/price
                              rounded-[18px]
                              border
                              border-[#EEEEEE]
                              bg-[#F9FCFB]
                              p-5
                              transition-all
                              duration-300
                              hover:-translate-y-1
                              hover:border-[#BEE9FF]
                              hover:shadow-[0_8px_22px_rgba(0,0,0,0.06)]
                            "
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p
                                  className="
                                    text-sm
                                    font-bold
                                    text-[#212121]
                                  "
                                >
                                  {item.title}
                                </p>

                                <p
                                  className="
                                    mt-2
                                    text-xl
                                    font-extrabold
                                    text-[#2F6FED]
                                  "
                                >
                                  {item.price}
                                </p>
                              </div>

                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  min-w-[40px]
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#D9F7E8]
                                  text-[#2F6FED]
                                  transition-transform
                                  duration-300
                                  group-hover/price:translate-x-1
                                "
                              >
                                <ChevronRight size={17} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* BENEFITS */}

                    {section.type === "benefits" && (
                      <div className="space-y-4">
                        {section.items?.map((benefit, index) => (
                          <div
                            key={index}
                            className="
                              group/benefit
                              rounded-[18px]
                              border
                              border-[#EEEEEE]
                              bg-[#FAFAFA]
                              p-5
                              transition-all
                              duration-300
                              hover:border-[#D9F7E8]
                              hover:bg-[#F9FFFC]
                            "
                          >
                            <div className="flex items-start gap-4">

                              <div
                                className="
                                  flex
                                  h-10
                                  w-10
                                  min-w-[40px]
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#2F6FED]
                                  text-xs
                                  font-extrabold
                                  text-white
                                  shadow-[0_5px_14px_rgba(47,111,237,0.18)]
                                "
                              >
                                {benefit.number}
                              </div>

                              <div className="min-w-0 flex-1">
                                <h3
                                  className="
                                    text-base
                                    font-extrabold
                                    text-[#212121]
                                  "
                                >
                                  {benefit.title}
                                </h3>

                                <div className="mt-3 space-y-2.5">
                                  {benefit.items?.map(
                                    (item, itemIndex) => (
                                      <div
                                        key={itemIndex}
                                        className="flex items-start gap-2"
                                      >
                                        <CircleCheck
                                          size={17}
                                          className="mt-0.5 min-w-[17px] text-[#2F6FED]"
                                        />

                                        <p
                                          className="
                                            text-sm
                                            leading-6
                                            text-[#7A7A7A]
                                          "
                                        >
                                          {item}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* PARAGRAPH */}

                    {section.type === "paragraph" && (
                      <div className="space-y-4">
                        {section.paragraphs?.map(
                          (paragraph, index) => (
                            <p
                              key={index}
                              className="
                                text-sm
                                leading-7
                                text-[#7A7A7A]
                                md:text-base
                              "
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>
                    )}

                    {/* HIGHLIGHT */}

                    {section.type === "highlight" && (
                      <div
                        className="
                          relative
                          overflow-hidden
                          rounded-[20px]
                          bg-gradient-to-br
                          from-[#BEE9FF]
                          via-[#EAF8FF]
                          to-[#DFF8EF]
                          p-6
                          md:p-8
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
                            bg-white/30
                          "
                        />

                        <div className="relative">
                          <div
                            className="
                              flex
                              h-12
                              w-12
                              items-center
                              justify-center
                              rounded-[15px]
                              bg-white/80
                              text-[#2F6FED]
                              shadow-sm
                            "
                          >
                            <Sparkles size={21} />
                          </div>

                          <h3
                            className="
                              mt-5
                              text-xl
                              font-extrabold
                              leading-7
                              text-[#212121]
                              md:text-2xl
                            "
                          >
                            {section.heading}
                          </h3>

                          {section.items?.length > 0 && (
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                              {section.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-[14px]
                                    border
                                    border-white/60
                                    bg-white/65
                                    px-4
                                    py-3
                                    backdrop-blur-sm
                                  "
                                >
                                  <div
                                    className="
                                      flex
                                      h-6
                                      w-6
                                      min-w-[24px]
                                      items-center
                                      justify-center
                                      rounded-full
                                      bg-[#D9F7E8]
                                      text-[#2F6FED]
                                    "
                                  >
                                    <Check
                                      size={14}
                                      strokeWidth={3}
                                    />
                                  </div>

                                  <span
                                    className="
                                      text-sm
                                      font-semibold
                                      text-[#212121]
                                    "
                                  >
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================
              RIGHT SIDEBAR
          ===================================== */}

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div
              className="
                overflow-hidden
                rounded-[24px]
                border
                border-[#EEEEEE]
                bg-white
                shadow-[0_10px_35px_rgba(0,0,0,0.06)]
              "
            >
              {/* SIDEBAR HEADER */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#BEE9FF]
                  via-[#EAF8FF]
                  to-[#DFF8EF]
                  p-6
                  text-center
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-white/30
                  "
                />

                <div
                  className="
                    relative
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white
                    bg-white
                    p-3
                    shadow-[0_8px_22px_rgba(0,0,0,0.08)]
                  "
                >
                  <img
                    src={icon}
                    alt={name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <h3
                  className="
                    relative
                    mt-4
                    text-lg
                    font-extrabold
                    leading-6
                    text-[#212121]
                  "
                >
                  {name}
                </h3>

                <span
                  className="
                    relative
                    mt-3
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/80
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-[#2F6FED]
                    shadow-sm
                  "
                >
                  <Sparkles size={13} />
                  {badge}
                </span>
              </div>

              {/* SIDEBAR BODY */}

              <div className="p-5">
                <p
                  className="
                    text-sm
                    leading-6
                    text-[#7A7A7A]
                  "
                >
                  {shortDescription}
                </p>

                <div className="mt-5 border-t border-[#EEEEEE] pt-5">
                  <p
                    className="
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-wider
                      text-[#7A7A7A]
                    "
                  >
                    Package Includes
                  </p>

                  <div className="mt-4 space-y-3">
                    {content.sections
                      ?.slice(0, 5)
                      .map((section, index) => (
                        <div
                          key={index}
                          className="
                            flex
                            items-center
                            gap-2.5
                          "
                        >
                          <div
                            className="
                              flex
                              h-6
                              w-6
                              min-w-[24px]
                              items-center
                              justify-center
                              rounded-full
                              bg-[#D9F7E8]
                              text-[#2F6FED]
                            "
                          >
                            <Check size={13} strokeWidth={3} />
                          </div>

                          <span
                            className="
                              line-clamp-1
                              text-sm
                              font-medium
                              text-[#212121]
                            "
                          >
                            {section.title}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <Link
                  to="/"
                  className="
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#2F6FED]
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_6px_18px_rgba(47,111,237,0.20)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#245bd0]
                    hover:shadow-[0_8px_22px_rgba(47,111,237,0.28)]
                  "
                >
                  Explore More Packages
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* =====================================
            BOTTOM CTA
        ===================================== */}

        <div
          className="
            relative
            mt-8
            overflow-hidden
            rounded-[26px]
            border
            border-white
            bg-gradient-to-br
            from-[#BEE9FF]
            via-[#EAF8FF]
            to-[#DFF8EF]
            px-6
            py-9
            text-center
            shadow-[0_10px_35px_rgba(0,0,0,0.06)]
            md:px-10
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-44
              w-44
              rounded-full
              bg-white/25
            "
          />

          <div
            className="
              relative
              mx-auto
              flex
              h-13
              w-13
              items-center
              justify-center
              rounded-[16px]
              bg-white/80
              text-[#2F6FED]
              shadow-sm
            "
          >
            <Sparkles size={23} />
          </div>

          <h2
            className="
              relative
              mt-5
              text-2xl
              font-extrabold
              tracking-tight
              text-[#212121]
              md:text-3xl
            "
          >
            Better Healthcare Starts With Better Protection
          </h2>

          <p
            className="
              relative
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-[#7A7A7A]
              md:text-base
            "
          >
            Explore our subscription packages and choose the healthcare
            support that best fits your needs.
          </p>

          <Link
            to="/"
            className="
              relative
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-bold
              text-[#2F6FED]
              shadow-[0_6px_18px_rgba(0,0,0,0.08)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]
            "
          >
            View All Packages
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionPackageDetails;