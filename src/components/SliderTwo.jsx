import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSliderTwo } from "../services/sliderService";

function SliderTwo() {
  const [sliders, setSliders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH SLIDER TWO
  // ==============================

  useEffect(() => {
    const loadSliders = async () => {
      try {
        const response = await getSliderTwo();

        console.log("Slider Two:", response);

        if (Array.isArray(response)) {
          setSliders(response);
        } else if (Array.isArray(response?.results)) {
          setSliders(response.results);
        } else {
          setSliders([]);
        }
      } catch (error) {
        console.error("Slider Two loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSliders();
  }, []);

  // ==============================
  // AUTO SLIDE
  // ==============================

  useEffect(() => {
    if (sliders.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sliders.length]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <section className="w-full">
        <div
          className="
            w-full
            aspect-[16/5]
            min-h-[160px]
            overflow-hidden
            rounded-2xl
            bg-gray-200
            animate-pulse
          "
        />
      </section>
    );
  }

  // ==============================
  // EMPTY
  // ==============================

  if (!sliders.length) {
    return null;
  }

  return (
    <section className="w-full">
      {/* ==============================
          SLIDER CONTAINER
      ============================== */}

      <div
        className="
          relative
          w-full
          aspect-[16/5]
          min-h-[160px]
          overflow-hidden
          rounded-2xl
          bg-white
        "
      >
        {/* ==============================
            SLIDES
        ============================== */}

        {sliders.map((slider, index) => (
          <Link
            key={slider.id}
            to={`/slider-two/${slider.id}`}
            className={`
              absolute
              inset-0
              block
              transition-opacity
              duration-700
              ${
                index === activeIndex
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }
            `}
          >
            <img
              src={slider.image?.replace(
                "http://66.29.151.40:6060",
                ""
              )}
              alt={`Slider ${index + 1}`}
              className="
                block
                h-full
                w-full
                object-cover
              "
            />
          </Link>
        ))}

        {/* ==============================
            DOTS
        ============================== */}

        {sliders.length > 1 && (
          <div
            className="
              absolute
              bottom-4
              left-1/2
              z-20
              flex
              -translate-x-1/2
              gap-2
            "
          >
            {sliders.map((slider, index) => (
              <button
                key={slider.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`
                  h-2
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index === activeIndex
                      ? "w-7 bg-[#2F6FED]"
                      : "w-2 bg-white/80"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SliderTwo;