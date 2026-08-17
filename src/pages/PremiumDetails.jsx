import { Link } from "react-router-dom";

import premiumBanner from "../assets/images/bellevie_wroktwo.jpg";


function PremiumDetails() {


  const premiumPackages = [

    {
      id: 1,
      slug: "shohay",
      english: "Shohay",
      bangla: "সহায়",
      yearly: "BDT 1,620",
      monthly: "BDT 135",
    },


    {
      id: 2,
      slug: "shoshti",
      english: "Shoshti",
      bangla: "স্বস্তি",
      yearly: "BDT 2,580",
      monthly: "BDT 375",
    },


    {
      id: 3,
      slug: "prottoy",
      english: "Prottoy",
      bangla: "প্রত্যয়",
      yearly: "BDT 4,500",
      monthly: "BDT 520",
    },


    {
      id: 4,
      slug: "nirbor",
      english: "Nirbor",
      bangla: "নির্ভর",
      yearly: "BDT 1,620",
      monthly: "BDT 215",
    },


    {
      id: 5,
      slug: "ashtha",
      english: "Ashtha",
      bangla: "আস্থা",
      yearly: "BDT 4,500",
      monthly: "BDT 375",
    },


    {
      id: 6,
      slug: "shurokka",
      english: "Shurokka",
      bangla: "সুরক্ষা",
      yearly: "BDT 3,000",
      monthly: "BDT 250",
    },


  ];



  return (


    <section className="pb-12">



     {/* Banner */}

<div
  className="
    relative
    mb-12
    w-full
    overflow-hidden
    rounded-3xl
    bg-white
  "
>
  <img
    src={premiumBanner}
    alt="Bellevie Guardian Health Programme"
    className="
      block
      h-[320px]
      w-full
      object-cover
      object-center
      md:h-[420px]
      lg:h-[500px]
    "
  />
</div>





      {/* Package Header */}



      <div className="
        mb-8
      ">



        <h2 className="
          text-3xl
          font-bold
          text-[#212121]
        ">

          BelleVie Guardian Health Programme

        </h2>

      </div>







      {/* Package Cards */}



      <div
        id="packages"
        className="
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
        "
      >




        {
          premiumPackages.map((item)=>(



            <Link


              key={item.id}


              to={`/health-saver/premium/${item.slug}`}


              className="
                group
                rounded-3xl
                border
                border-white/40
                bg-gradient-to-r
                from-[#BEE9FF]
                to-[#DFF8EF]
                p-6
                shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.12)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "



            >




              <div className="
                flex
                items-center
                justify-between
              ">



                <div>


                  <h3 className="
                    text-2xl
                    font-bold
                    text-[#212121]
                  ">


                    {item.english}


                  </h3>



                  <p className="
                    mt-1
                    text-lg
                    font-semibold
                    text-[#2F6FED]
                  ">


                    {item.bangla}


                  </p>



                </div>



                <div className="
                  rounded-2xl
                  bg-white
                  px-3
                  py-2
                  text-sm
                  font-bold
                  text-[#2F6FED]
                ">

                  Plan

                </div>



              </div>







              <div className="
                mt-6
                rounded-2xl
                bg-white/70
                p-5
              ">




                <p className="
                  text-sm
                  text-[#7A7A7A]
                ">

                  Yearly Premium

                </p>




                <h4 className="
                  mt-1
                  text-2xl
                  font-bold
                  text-[#212121]
                ">


                  {item.yearly}


                </h4>






                <div className="
                  my-4
                  border-t
                  border-[#EEEEEE]
                "/>







                <p className="
                  text-sm
                  text-[#7A7A7A]
                ">

                  Monthly Premium

                </p>





                <h4 className="
                  mt-1
                  text-2xl
                  font-bold
                  text-[#2F6FED]
                ">


                  {item.monthly}


                </h4>



              </div>







              <div className="
                mt-6
                flex
                items-center
                justify-between
              ">


                <span className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-[#7A7A7A]
                ">

                  Premium Plan

                </span>




                <span className="
                  rounded-lg
                  bg-[#2F6FED]
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  transition
                  group-hover:bg-[#2459C7]
                ">

                  View Details →

                </span>



              </div>






            </Link>



          ))
        }



      </div>





    </section>



  );

}


export default PremiumDetails;