import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Share2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

import { getSocialMediaServices } from "../services/socialMediaService";

function SocialMediaServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD SOCIAL MEDIA SERVICES
  ========================================================= */

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);

        const response = await getSocialMediaServices();

        console.log("Social Media Services:", response);

        if (Array.isArray(response)) {
          setServices(response);
        } else if (Array.isArray(response?.results)) {
          setServices(response.results);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error(
          "Social media services loading error:",
          error
        );

        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="w-full overflow-hidden pb-10">

        <div className="mb-8">
          <div className="h-7 w-36 animate-pulse rounded-full bg-gray-200" />

          <div className="mt-4 h-9 w-64 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-[340px]
                animate-pulse
                rounded-[30px]
                bg-gray-200
              "
            />
          ))}
        </div>
      </section>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!services.length) {
    return (
      <section className="w-full pb-10">

        <div
          className="
            flex
            min-h-[260px]
            flex-col
            items-center
            justify-center
            rounded-[30px]
            border
            border-[#EEEEEE]
            bg-white
            p-8
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Share2 size={28} />
          </div>

          <h3
            className="
              mt-5
              text-xl
              font-bold
              text-[#212121]
            "
          >
            No Social Services Available
          </h3>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#7A7A7A]
            "
          >
            Social media services are currently unavailable.
            Please check again later.
          </p>
        </div>

      </section>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <section className="w-full overflow-hidden pb-10">

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="mb-8">

        

        <h2
          className="
            mt-4
            text-3xl
            font-extrabold
            tracking-tight
            text-[#212121]
            md:text-4xl
          "
        >
          Social Service
        </h2>

      </div>


      {/* =====================================================
          SOCIAL MEDIA CARDS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {services.map((service) => {

          const serviceName =
            service.name_en ||
            service.name ||
            service.name_bn ||
            "Social Media";

          return (
            <Link
              key={service.id}
              to={`/social-media-services/${service.id}`}
              className="
                group
                relative
                flex
                min-h-[340px]
                flex-col
                overflow-hidden
                rounded-[30px]
                border
                border-white
                bg-gradient-to-br
                from-[#E8F8FF]
                via-[#F4FCFF]
                to-[#E7FAF2]
                p-6
                text-center
                shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_8px_24px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
                hover:-translate-y-3
                hover:shadow-[-5px_-5px_12px_rgba(255,255,255,1),6px_14px_35px_rgba(0,0,0,0.12)]
              "
            >

              {/* =================================================
                  TOP DECORATIVE SHAPE
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-14
                  -top-14
                  h-36
                  w-36
                  rounded-full
                  bg-[#BEE9FF]/50
                  transition-all
                  duration-700
                  group-hover:scale-150
                  group-hover:bg-[#BEE9FF]/70
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -left-16
                  -bottom-16
                  h-40
                  w-40
                  rounded-full
                  bg-[#D9F7E8]/60
                  transition-all
                  duration-700
                  group-hover:scale-125
                "
              />


              {/* =================================================
                  SMALL TOP BADGE
              ================================================= */}

              <div className="relative flex justify-center">

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white/75
                    px-3
                    py-1.5
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#7A7A7A]
                    shadow-sm
                    backdrop-blur-sm
                  "
                >
                  <Share2
                    size={12}
                    className="text-[#2F6FED]"
                  />

                  Connect
                </span>

              </div>


              {/* =================================================
                  ICON
              ================================================= */}

              <div className="relative mt-5 flex justify-center">

                <div
                  className="
                    relative
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-[0_10px_30px_rgba(47,111,237,0.12)]
                    ring-1
                    ring-white
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:shadow-[0_15px_35px_rgba(47,111,237,0.20)]
                  "
                >

                  {/* Inner Circle */}

                  <div
                    className="
                      flex
                      h-[82px]
                      w-[82px]
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-full
                      bg-gradient-to-br
                      from-[#D9F7E8]
                      to-[#E8F5FF]
                    "
                  >

                    {service.icon ? (
                      <img
                        src={service.icon}
                        alt={serviceName}
                        className="
                          h-14
                          w-14
                          object-contain
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />
                    ) : (
                      <span
                        className="
                          text-3xl
                          font-extrabold
                          text-[#2F6FED]
                        "
                      >
                        {serviceName
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}

                  </div>

                </div>

              </div>


              {/* =================================================
                  SERVICE NAME
              ================================================= */}

              <div className="relative flex flex-1 flex-col">

                <h3
                  className="
                    mt-6
                    min-h-[56px]
                    text-xl
                    font-extrabold
                    leading-7
                    text-[#212121]
                    transition-all
                    duration-300
                    group-hover:text-[#2F6FED]
                  "
                >
                  {serviceName}
                </h3>


                {/* =================================================
                    SHORT DESCRIPTION
                ================================================= */}

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-[230px]
                    text-sm
                    leading-6
                    text-[#7A7A7A]
                  "
                >
                  Connect with BelleVie through our official
                  {` ${serviceName}`} platform.
                </p>


                {/* =================================================
                    CTA
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
                      rounded-2xl
                      border
                      border-white/80
                      bg-white/60
                      px-4
                      py-3
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      group-hover:bg-white/90
                      group-hover:shadow-sm
                    "
                  >

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
                        Visit Page
                      </span>

                      <ExternalLink
                        size={14}
                        className="
                          text-[#7A7A7A]
                          transition-colors
                          duration-300
                          group-hover:text-[#2F6FED]
                        "
                      />

                    </div>


                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#2F6FED]
                        text-white
                        shadow-[0_5px_15px_rgba(47,111,237,0.25)]
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:bg-[#2358CB]
                      "
                    >
                      <ArrowRight size={17} />
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

export default SocialMediaServices;