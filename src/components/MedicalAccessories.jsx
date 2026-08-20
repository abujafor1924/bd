import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, HeartPulse, Sparkles } from "lucide-react";

import medicalAccessoriesService from "../services/medicalAccessoriesService";

const MedicalAccessories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =====================================
  // LOAD CATEGORIES
  // =====================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await medicalAccessoriesService.getMedicalAccessoryCategories();

        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data?.results)) {
          setCategories(data.results);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Medical Accessories categories error:", err);
        setError("Unable to load medical accessories.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =====================================
  // CATEGORY CLICK
  // =====================================

  const handleCategoryClick = (category) => {
    navigate(`/medical-accessories/${category.id}`, {
      state: {
        category,
      },
    });
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <section className="w-full min-w-0 py-8">
        <div className="mb-7">
          <div className="h-7 w-52 animate-pulse rounded-xl bg-gray-200" />
          <div className="mt-3 h-4 w-72 max-w-full animate-pulse rounded bg-gray-200" />
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-5
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-6
            xl:grid-cols-8
          "
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="
                min-h-[190px]
                animate-pulse
                rounded-[24px]
                border
                border-[#EEEEEE]
                bg-white
                p-5
                shadow-[0_6px_22px_rgba(0,0,0,0.05)]
              "
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-gray-200" />

              <div className="mx-auto mt-5 h-4 w-20 rounded bg-gray-200" />

              <div className="mx-auto mt-2 h-3 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {
    return (
      <section className="w-full min-w-0 py-8">
        <div
          className="
            flex
            min-h-[220px]
            flex-col
            items-center
            justify-center
            rounded-[28px]
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
              rounded-[20px]
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <HeartPulse size={30} />
          </div>

          <p className="mt-5 text-sm font-semibold text-[#7A7A7A]">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // =====================================
  // EMPTY
  // =====================================

  if (!categories.length) {
    return null;
  }

  // =====================================
  // MAIN
  // =====================================

  return (
    <section className="w-full min-w-0 py-8">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-7">
        

        <h2
          className="
            mt-4
            text-2xl
            font-extrabold
            tracking-tight
            text-[#212121]
            md:text-3xl
          "
        >
          Medical Accessories
        </h2>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-[#7A7A7A]
            md:text-base
          "
        >
          Explore our range of medical accessories designed to support
          everyday healthcare needs.
        </p>
      </div>

      {/* =====================================
          CATEGORIES
      ===================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-5
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
        "
      >
        {categories.map((category) => {
          const categoryName =
            category.name_en ||
            category.name ||
            category.name_bn ||
            "Medical Accessory";

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className="
                group
                relative
                flex
                min-h-[200px]
                flex-col
                overflow-hidden
                rounded-[24px]
                border
                border-white
                bg-gradient-to-br
                from-[#BEE9FF]
                via-[#EAF8FF]
                to-[#DFF8EF]
                p-5
                text-center
                shadow-[-3px_-3px_8px_rgba(255,255,255,0.75),4px_7px_20px_rgba(0,0,0,0.07)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.85),6px_12px_28px_rgba(0,0,0,0.11)]
                focus:outline-none
                focus:ring-2
                focus:ring-[#2F6FED]/30
              "
            >
              {/* Decorative Circle */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-white/30
                  transition-transform
                  duration-500
                  group-hover:scale-125
                "
              />

              {/* Small Icon */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-white/70
                  text-[#2F6FED]
                  opacity-0
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:opacity-100
                "
              >
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </div>

              {/* Image */}

              <div
                className="
                  relative
                  mx-auto
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-4
                  border-white
                  bg-white
                  p-3
                  shadow-[0_8px_22px_rgba(0,0,0,0.08)]
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:shadow-[0_10px_28px_rgba(47,111,237,0.14)]
                "
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={categoryName}
                    className="
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-300
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
                ) : null}

                <div
                  style={{
                    display: category.image ? "none" : "flex",
                  }}
                  className="
                    absolute
                    inset-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#D9F7E8]
                    text-[#2F6FED]
                  "
                >
                  <HeartPulse size={34} />
                </div>
              </div>

              {/* Name */}

              <div className="relative mt-5 flex flex-1 flex-col">
                <h3
                  className="
                    line-clamp-2
                    min-h-[40px]
                    text-sm
                    font-extrabold
                    leading-5
                    text-[#212121]
                    transition-colors
                    duration-300
                    group-hover:text-[#2F6FED]
                  "
                >
                  {categoryName}
                </h3>

                {/* Bottom Action */}

                <div
                  className="
                    mt-auto
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    pt-4
                    text-xs
                    font-bold
                    text-[#7A7A7A]
                    transition-colors
                    duration-300
                    group-hover:text-[#2F6FED]
                  "
                >
                  Explore

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MedicalAccessories;