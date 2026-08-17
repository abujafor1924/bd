import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSliders } from "../services/sliderService";


function HeroSlider() {

  const [sliders, setSliders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadSliders = async () => {

      try {

        const data = await getSliders();

        setSliders(data.results || []);

      } catch (error) {

        console.log("Slider Error:", error);

      } finally {

        setLoading(false);

      }

    };


    loadSliders();

  }, []);



  // Auto slider

  useEffect(() => {

    if (sliders.length <= 1) return;


    const timer = setInterval(() => {

      setActiveIndex((prev) =>
        prev === sliders.length - 1 ? 0 : prev + 1
      );

    }, 4000);


    return () => clearInterval(timer);


  }, [sliders]);



  if (loading) {

    return (
      <div className="
        w-full
        h-[250px]
        md:h-[320px]
        lg:h-[380px]
        rounded-2xl
        bg-gray-200
        animate-pulse
      "/>
    );

  }



  if (!sliders.length) {

    return null;

  }



  const currentSlider = sliders[activeIndex];



  return (

    <div className="
      relative
      w-full
      overflow-hidden
      rounded-2xl
      bg-white
    ">


      <Link to={`/slider/${currentSlider.id}`}>

        <img
  src={currentSlider.image}
  alt={`Banner ${currentSlider.id}`}
  className="
    w-full
    h-[280px]
    md:h-[350px]
    lg:h-[420px]
    rounded-2xl
    object-fill
    transition-all
    duration-700
  "
/>

      </Link>



      {/* Dots */}

      <div className="
        absolute
        bottom-4
        left-1/2
        flex
        -translate-x-1/2
        gap-2
      ">

        {
          sliders.map((slider,index)=>(

            <button

              key={slider.id}

              onClick={() => setActiveIndex(index)}

              className={`
                h-3
                w-3
                rounded-full

                ${
                  activeIndex === index
                  ? "bg-[#2F6FED]"
                  : "bg-white border"
                }
              `}

            />

          ))
        }

      </div>


    </div>

  );

}


export default HeroSlider;