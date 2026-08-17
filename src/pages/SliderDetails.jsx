import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSliderDetails } from "../services/sliderService";


function SliderDetails() {

  const { id } = useParams();

  const [slider, setSlider] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const loadSlider = async () => {

      try {

        const data = await getSliderDetails(id);

        setSlider(data);

      } catch (error) {

        console.error(
          "Slider Details Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadSlider();

  }, [id]);




  if (loading) {

    return (

      <div className="
        h-[500px]
        rounded-3xl
        bg-[#EEEEEE]
        animate-pulse
      "/>

    );

  }




  if (!slider) {

    return (

      <div className="
        flex
        h-96
        items-center
        justify-center
        rounded-3xl
        bg-white
        text-[#7A7A7A]
      ">

        Slider Not Found

      </div>

    );

  }




  return (

    <div className="
      mx-auto
      max-w-6xl
      space-y-8
      pb-12
    ">



      {/* Hero Image Card */}

      <div className="
        overflow-hidden
        rounded-[32px]
        bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      ">

        <img

          src={slider.image}

          alt={
            slider.alt_text_en ||
            slider.alt_text ||
            "Banner"
          }

          className="
            h-[300px]
            w-full
            object-fill
            md:h-[500px]
          "

        />


      </div>





      {/* Content */}

      <div className="
        rounded-[32px]
        bg-white
        p-6
        md:p-10
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      ">



        {/* Badge */}

        <div className="
          mb-5
          inline-flex
          rounded-full
          bg-[#D9F7E8]
          px-4
          py-2
          text-sm
          font-medium
          text-[#2F6FED]
        ">

          Health Service

        </div>





        {/* Title */}

        <h1 className="
          text-3xl
          font-bold
          leading-tight
          text-[#212121]
          md:text-4xl
        ">

          {
            slider.title_en ||
            slider.title
          }

        </h1>





        {/* Divider */}

        <div className="
          my-6
          h-[2px]
          w-24
          bg-[#2F6FED]
        "/>






        {/* Description */}

        <p className="
          text-base
          leading-8
          text-[#7A7A7A]
          md:text-lg
        ">

          {
            slider.description_en ||
            slider.description
          }

        </p>






        {/* Bottom Info */}

        <div className="
          mt-8
          flex
          flex-col
          gap-4
          border-t
          border-[#EEEEEE]
          pt-6
          md:flex-row
          md:items-center
          md:justify-between
        ">


          <div>

            <p className="
              text-sm
              text-[#7A7A7A]
            ">

              Published Date

            </p>


            <p className="
              mt-1
              font-medium
              text-[#212121]
            ">

              {
                new Date(
                  slider.created_at
                ).toLocaleDateString()
              }

            </p>


          </div>




          {
            slider.link && (

              <a

                href={slider.link}

                target="_blank"

                rel="noreferrer"

                className="
                  rounded-xl
                  bg-[#2F6FED]
                  px-7
                  py-3
                  text-center
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "

              >

                Visit More

              </a>

            )
          }



        </div>



      </div>



    </div>

  );

}


export default SliderDetails;