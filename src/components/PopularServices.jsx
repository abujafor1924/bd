import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

import { getPopularCategories } from "../services/popularService";

function PopularServices() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getPopularCategories();

      const categoryList = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setCategories(categoryList);

      // setCategories(data || []);
      console.log("Popular Categories API:", data);
    } catch (error) {
      console.log("Popular Categories Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // SHOW ONLY FIRST 3 ROWS
  // Desktop = 6 columns
  // 6 × 3 = 18 cards
  // =====================================

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 18);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <section className="mt-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#212121]">
            Popular Services
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {[...Array(18)].map((_, index) => (
            <div
              key={index}
              className="
                h-44
                animate-pulse
                rounded-3xl
                bg-gray-200
              "
            />
          ))}
        </div>
      </section>
    );
  }

  // =====================================
  // NO DATA
  // =====================================

  if (!categories.length) {
    return (
      <section className="mt-12">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-[#7A7A7A]">
            No popular services available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2
            className="
              text-3xl
              font-bold
              text-[#212121]
              md:text-4xl
            "
          >
            Popular Services
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#7A7A7A]
            "
          >
            Explore our most popular healthcare services
          </p>
        </div>
      </div>

      {/* =====================================
          SERVICE GRID
      ===================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-4
          sm:gap-5
          md:grid-cols-3
          lg:grid-cols-6
          lg:gap-6
        "
      >
        {visibleCategories.map((item) => (
          <Link
            key={item.id}
            to={`/popular-service/${item.id}`}
            className="
              group
              flex
              min-h-[180px]
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-white/60
              bg-gradient-to-br
              from-[#BEE9FF]
              to-[#DFF8EF]
              p-5
              text-center
              shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.10)]
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[-4px_-4px_8px_rgba(255,255,255,0.7),4px_6px_12px_rgba(0,0,0,0.14)]
            "
          >
            {/* ICON */}

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <img
                src={item.icon}
                alt={item.name}
                className="
                  h-12
                  w-12
                  object-contain
                "
              />
            </div>

            {/* NAME */}

            <h3
              className="
                mt-5
                line-clamp-2
                text-sm
                font-bold
                leading-5
                text-[#212121]
                transition-colors
                group-hover:text-[#2F6FED]
              "
            >
              {item.name}
            </h3>
          </Link>
        ))}
      </div>

      {/* =====================================
          SHOW MORE / SHOW LESS
      ===================================== */}

      {categories.length > 18 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#2F6FED]
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-[#2F6FED]
              shadow-sm
              transition-all
              duration-300
              hover:bg-[#2F6FED]
              hover:text-white
              hover:shadow-md
            "
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show More
                <ChevronDown size={18} />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

export default PopularServices;