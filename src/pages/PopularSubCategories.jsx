import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getPopularCategories,
  getPopularSubCategories,
} from "../services/popularService";

function PopularSubCategories() {
  const { categoryId } = useParams();

  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // GENERAL PHYSICIAN SUBCATEGORY ID
  // ==========================================

  const GENERAL_PHYSICIAN_ID = 3;

  // ==========================================
  // LOAD CATEGORY + SUBCATEGORIES
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // ======================================
        // LOAD SELECTED CATEGORY
        // ======================================

        const categoryData = await getPopularCategories();

        const categoryList = Array.isArray(categoryData)
          ? categoryData
          : Array.isArray(categoryData?.results)
            ? categoryData.results
            : Array.isArray(categoryData?.data)
              ? categoryData.data
              : [];

        console.log("Popular Categories API:", categoryData);

        // ======================================
        // FIND CURRENT CATEGORY
        // ======================================

        const currentCategory = categoryList.find(
          (item) => String(item.id) === String(categoryId)
        );

        console.log("Selected Category:", currentCategory);

        if (currentCategory) {
          setCategoryName(
            currentCategory.name ||
              currentCategory.name_en ||
              currentCategory.name_bn ||
              "Doctor Appointments"
          );
        } else {
          setCategoryName("Doctor Appointments");
        }

        // ======================================
        // LOAD SUBCATEGORIES
        // ======================================

        const subCategoryData =
          await getPopularSubCategories(categoryId);

        console.log(
          "Popular Sub Categories:",
          subCategoryData
        );

        const subCategoryList = Array.isArray(subCategoryData)
          ? subCategoryData
          : Array.isArray(subCategoryData?.results)
            ? subCategoryData.results
            : Array.isArray(subCategoryData?.data)
              ? subCategoryData.data
              : [];

        // ======================================
        // REMOVE GENERAL PHYSICIAN
        // ======================================

        const filteredCategories = subCategoryList.filter(
          (item) => item.id !== GENERAL_PHYSICIAN_ID
        );

        setSubCategories(filteredCategories);
      } catch (error) {
        console.error(
          "Popular subcategories loading error:",
          error
        );

        setSubCategories([]);
        setCategoryName("Doctor Appointments");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      loadData();
    }
  }, [categoryId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="mt-10 pb-12">

        {/* HEADER SKELETON */}

        <div className="mb-8">
          <div className="h-10 w-72 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* CARD SKELETON */}

        <div
          className="
            grid
            grid-cols-2
            gap-6
            md:grid-cols-3
            lg:grid-cols-6
          "
        >
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="
                h-48
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

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="pb-12">

      {/* ======================================
          HEADING
      ====================================== */}

      <div className="mb-10">

        <h1
          className="
            text-3xl
            font-bold
            text-[#212121]
            md:text-4xl
          "
        >
          {categoryName}
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-[#7A7A7A]
            md:text-base
          "
        >
          Choose a specialty and find the right doctor
          for your healthcare needs.
        </p>

      </div>

      {/* ======================================
          SUBCATEGORY CARDS
      ====================================== */}

      {subCategories.length > 0 ? (
        <div
          className="
            grid
            grid-cols-2
            gap-6
            md:grid-cols-3
            lg:grid-cols-6
          "
        >

          {subCategories.map((item) => (
            <Link
              key={item.id}
              to={`/popular-service/subcategory/${item.id}`}
              state={{ subcategoryName: item.name }}
              className="
                group
                rounded-3xl
                border
                border-white/40
                bg-gradient-to-r
                from-[#BEE9FF]
                to-[#DFF8EF]
                p-6
                text-center
                shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.12)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >

              {/* ==================================
                  ICON
              ================================== */}

              <div
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >

                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="
                      h-12
                      w-12
                      object-contain
                    "
                  />
                ) : (
                  <span
                    className="
                      text-sm
                      font-bold
                      text-[#2F6FED]
                    "
                  >
                    +
                  </span>
                )}

              </div>

              {/* ==================================
                  NAME
              ================================== */}

              <h3
                className="
                  mt-5
                  font-bold
                  text-[#212121]
                  transition-colors
                  duration-300
                  group-hover:text-[#2F6FED]
                "
              >
                {item.name}
              </h3>

            </Link>
          ))}

        </div>
      ) : (

        // ======================================
        // EMPTY STATE
        // ======================================

        <div
          className="
            rounded-3xl
            border
            border-[#EEEEEE]
            bg-white
            px-6
            py-12
            text-center
            shadow-sm
          "
        >
          <p className="text-sm text-[#7A7A7A]">
            No doctor specialties available.
          </p>
        </div>

      )}

    </section>
  );
}

export default PopularSubCategories;