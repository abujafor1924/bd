import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  HeartPulse,
  Truck,
  Headphones,
  Sparkles,
} from "lucide-react";

import medicalAccessoriesDetails from "../data/medicalAccessories";
import medicalAccessoriesService from "../services/medicalAccessoriesService";

const MedicalAccessoriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category || null);
  const [loading, setLoading] = useState(!location.state?.category);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) {
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const data = await medicalAccessoriesService.getMedicalAccessoryCategories();
          const list = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
          const found = list.find((item) => String(item.id) === String(id));
          if (found) {
            setCategory(found);
          } else {
            setError("Category not found");
          }
        } catch (err) {
          console.error("Error fetching category:", err);
          setError("Failed to load category details");
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }
  }, [id, category]);

  // Try to find matching static details or fallback to dynamic generation
  const getDetails = (cat) => {
    if (!cat) return null;
    const catName = (cat.name_en || cat.name || "").toLowerCase().trim();
    
    if (catName && medicalAccessoriesDetails[catName]) {
      return medicalAccessoriesDetails[catName];
    }
    
    // Check if any title match in the keys
    const matchedKey = Object.keys(medicalAccessoriesDetails).find(
      (key) =>
        medicalAccessoriesDetails[key].title?.toLowerCase().trim() === catName
    );
    if (matchedKey) {
      return medicalAccessoriesDetails[matchedKey];
    }
    
    // Fallback to ID-based match
    if (medicalAccessoriesDetails[id]) {
      return medicalAccessoriesDetails[id];
    }
    
    // Generate high-quality fallback details dynamically so all categories look the same
    const name = cat.name_en || cat.name || cat.name_bn || "Medical Accessory";
    const desc = cat.details_en || cat.details || cat.details_bn || `${name} are premium-quality medical accessories designed to support health and wellness.`;
    return {
      title: name,
      subtitle: "Premium healthcare accessories",
      description: desc,
      features: [
        "Clinically tested quality",
        "Recommended by health experts",
        "Durable and premium design",
        "Supports recovery and everyday care",
      ],
      products: [
        {
          name: `Standard ${name}`,
          description: `High-quality standard ${name.toLowerCase()} designed for everyday support.`,
        },
        {
          name: `Premium ${name}`,
          description: `Enhanced ergonomic version of ${name.toLowerCase()} for maximum comfort.`,
        },
        {
          name: `Portable ${name}`,
          description: `Travel-friendly, lightweight version of ${name.toLowerCase()} for on-the-go care.`,
        },
      ],
    };
  };

  const details = getDetails(category);

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {
    return (
      <section className="w-full min-w-0 pb-12">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2F6FED] border-t-transparent"></div>
        </div>
      </section>
    );
  }

  // =====================================
  // NOT FOUND / ERROR STATE
  // =====================================

  if ((!category && !details) || error) {
    return (
      <section className="w-full min-w-0 pb-12">
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-[28px]
              border
              border-[#EEEEEE]
              bg-white
              p-8
              text-center
              shadow-[0_12px_40px_rgba(0,0,0,0.07)]
            "
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D9F7E8]/60" />

            <div className="relative">
              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#D9F7E8]
                  text-[#2F6FED]
                  shadow-sm
                "
              >
                <HeartPulse size={34} />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold text-[#212121]">
                Category Not Found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#7A7A7A]">
                {error || "Sorry, we couldn't find the medical accessory category you're looking for."}
              </p>

              <button
                onClick={() => navigate("/")}
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
                "
              >
                Back to Home
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categoryName =
    category?.name_en ||
    category?.name ||
    category?.name_bn ||
    details?.title ||
    "Medical Category";

  const categoryDetails =
    category?.details_en ||
    category?.details ||
    category?.details_bn ||
    details?.description ||
    "";

  return (
    <section className="w-full min-w-0 pb-12">
      {/* =====================================
          BACK NAVIGATION
      ===================================== */}

      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="
            group
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
            font-semibold
            text-[#212121]
            shadow-sm
            transition-all
            duration-300
            hover:border-[#D9F7E8]
            hover:bg-[#D9F7E8]
            hover:text-[#2F6FED]
          "
        >
          <ArrowLeft
            size={17}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Medical Accessories
        </button>
      </div>

      {/* =====================================
          HERO
      ===================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-white
          bg-gradient-to-br
          from-[#BEE9FF]
          via-[#EAF8FF]
          to-[#DFF8EF]
          shadow-[0_14px_45px_rgba(0,0,0,0.08)]
        "
      >
        {/* Decorative Elements */}

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
            bg-white/20
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[35%]
            top-1/2
            h-32
            w-32
            -translate-y-1/2
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            relative
            grid
            items-center
            gap-8
            p-5
            sm:p-7
            md:grid-cols-[0.9fr_1.1fr]
            md:p-10
            lg:p-12
          "
        >
          {/* IMAGE */}

          <div
            className="
              relative
              flex
              min-h-[280px]
              items-center
              justify-center
              overflow-hidden
              rounded-[26px]
              border
              border-white/70
              bg-white/45
              p-8
              shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
              backdrop-blur-sm
              md:min-h-[390px]
            "
          >
            <div
              className="
                absolute
                left-5
                top-5
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/85
                px-4
                py-2
                text-xs
                font-bold
                text-[#2F6FED]
                shadow-sm
                backdrop-blur-sm
              "
            >
              <Sparkles size={14} />
              Medical Accessories
            </div>

            <div
              className="
                absolute
                h-56
                w-56
                rounded-full
                bg-white/40
                blur-sm
              "
            />

            {category?.image ? (
              <img
                src={category.image}
                alt={categoryName}
                className="
                  relative
                  z-10
                  max-h-[280px]
                  w-full
                  object-contain
                  drop-shadow-[0_18px_22px_rgba(0,0,0,0.12)]
                  transition-transform
                  duration-500
                  hover:scale-105
                "
              />
            ) : (
              <HeartPulse
                size={90}
                className="relative z-10 text-[#2F6FED]"
              />
            )}

            <div
              className="
                absolute
                bottom-5
                right-5
                h-16
                w-16
                rounded-full
                bg-[#D9F7E8]/80
              "
            />
          </div>

          {/* CONTENT */}

          <div className="relative">
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
                font-bold
                uppercase
                tracking-wider
                text-[#2F6FED]
                shadow-sm
                backdrop-blur-sm
              "
            >
              <span className="h-2 w-2 rounded-full bg-[#2F6FED]" />
              Medical Category
            </div>

            <h1
              className="
                mt-5
                max-w-2xl
                text-3xl
                font-extrabold
                leading-tight
                tracking-tight
                text-[#212121]
                sm:text-4xl
                lg:text-5xl
              "
            >
              {categoryName}
            </h1>

            {details?.subtitle && (
              <p
                className="
                  mt-4
                  max-w-xl
                  text-base
                  font-bold
                  leading-7
                  text-[#2F6FED]
                  md:text-lg
                "
              >
                {details.subtitle}
              </p>
            )}

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-[#5F6668]
                md:text-base
              "
            >
              {categoryDetails}
            </p>

            {/* BENEFITS */}

            <div
              className="
                mt-7
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-4
                md:grid-cols-2
                lg:grid-cols-4
              "
            >
              {[
                {
                  icon: ShieldCheck,
                  title: "Quality Care",
                },
                {
                  icon: HeartPulse,
                  title: "Health Focused",
                },
                {
                  icon: Truck,
                  title: "Easy Delivery",
                },
                {
                  icon: Headphones,
                  title: "Support",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-2xl
                      border
                      border-white/60
                      bg-white/55
                      p-3.5
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/75
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-[#2F6FED]
                        shadow-sm
                      "
                    >
                      <Icon size={19} />
                    </div>

                    <p className="mt-2 text-xs font-bold text-[#212121]">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FEATURES
      ===================================== */}

      {details?.features && details.features.length > 0 && (
        <section className="mt-9">
          <div className="mb-6">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#D9F7E8]
                px-3.5
                py-2
                text-xs
                font-bold
                text-[#2F6FED]
              "
            >
              <CheckCircle2 size={15} />
              Why Choose This Category
            </div>

            <h2
              className="
                mt-3
                text-2xl
                font-extrabold
                tracking-tight
                text-[#212121]
                md:text-3xl
              "
            >
              Designed for Better Care
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A7A7A]">
              Carefully selected medical accessories designed to support
              better healthcare and everyday wellbeing.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {details.features.map((feature, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#EEEEEE]
                  bg-white
                  p-5
                  shadow-[0_6px_24px_rgba(0,0,0,0.05)]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
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
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#D9F7E8]
                    text-[#2F6FED]
                  "
                >
                  <CheckCircle2 size={23} />
                </div>

                <h3
                  className="
                    relative
                    mt-5
                    text-sm
                    font-extrabold
                    leading-6
                    text-[#212121]
                  "
                >
                  {feature}
                </h3>

                <div
                  className="
                    mt-4
                    h-1
                    w-8
                    rounded-full
                    bg-[#2F6FED]
                    transition-all
                    duration-300
                    group-hover:w-14
                  "
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================
          PRODUCTS
      ===================================== */}

      {details?.products && details.products.length > 0 && (
        <section className="mt-10">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#D9F7E8]
                  px-3.5
                  py-2
                  text-xs
                  font-bold
                  text-[#2F6FED]
                "
              >
                <HeartPulse size={15} />
                Explore Products
              </div>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-[#212121]
                  md:text-3xl
                "
              >
                Available Products
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#7A7A7A]">
              Explore our range of products available under this medical
              accessory category.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {details.products.map((product, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#EEEEEE]
                  bg-white
                  p-6
                  shadow-[0_6px_24px_rgba(0,0,0,0.05)]
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-[0_14px_34px_rgba(0,0,0,0.09)]
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
                    bg-[#D9F7E8]
                    opacity-50
                    transition-transform
                    duration-500
                    group-hover:scale-125
                  "
                />

                <div className="relative flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#D9F7E8]
                      text-sm
                      font-extrabold
                      text-[#2F6FED]
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F2F2F2]
                      text-[#7A7A7A]
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:bg-[#D9F7E8]
                      group-hover:text-[#2F6FED]
                    "
                  >
                    <ArrowRight size={17} />
                  </div>
                </div>

                <h3
                  className="
                    relative
                    mt-5
                    text-lg
                    font-extrabold
                    text-[#212121]
                    transition-colors
                    duration-300
                    group-hover:text-[#2F6FED]
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    relative
                    mt-2
                    text-sm
                    leading-6
                    text-[#7A7A7A]
                  "
                >
                  {product.description}
                </p>

                <div className="relative mt-5 border-t border-[#EEEEEE] pt-4">
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#F2F2F2]
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-[#2F6FED]
                    "
                  >
                    <CheckCircle2 size={14} />
                    Available in this category
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================
          BOTTOM CTA
      ===================================== */}

      <section
        className="
          relative
          mt-10
          overflow-hidden
          rounded-[30px]
          bg-gradient-to-br
          from-[#2F6FED]
          to-[#245bd0]
          px-6
          py-10
          text-center
          shadow-[0_14px_40px_rgba(47,111,237,0.20)]
          md:px-12
          md:py-12
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-52
            w-52
            rounded-full
            bg-white/10
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
            bg-white/10
          "
        />

        <div className="relative">
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white/15
              text-white
              backdrop-blur-sm
            "
          >
            <HeartPulse size={28} />
          </div>

          <h2
            className="
              mt-5
              text-2xl
              font-extrabold
              text-white
              md:text-3xl
            "
          >
            Need Help Choosing the Right Product?
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-white/80
            "
          >
            Our team is here to help you find the right medical accessory
            for your healthcare needs.
          </p>

          <button
            onClick={() => navigate("/contact-us")}
            className="
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
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            Contact Us
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </section>
  );
};

export default MedicalAccessoriesDetails;
