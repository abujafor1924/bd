import { useParams } from "react-router-dom";

import {
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  Hospital,
  Video,
  Percent
} from "lucide-react";


import premiumBanner from "../assets/images/bellevie_wroktwo.jpg";



function PremiumPackageDetails() {


  const { slug } = useParams();



  const packages = {


    shohay: {

      name: "Shohay",

      bangla: "সহায়",

      yearly: "BDT 900",

      monthly: "BDT 75",


      benefits: [

        {
          title: "Life Coverage",
          value: "BDT 100,000",
          icon: ShieldCheck
        },

        {
          title: "Accidental Death Benefit",
          value: "BDT 200,000",
          icon: HeartPulse
        },

        {
          title: "Permanent Partial Disability & Permanent Total Disability",
          value: "BDT 100,000",
          icon: ShieldCheck
        },

        {
          title: "Critical Illness",
          value: "N/A",
          icon: HeartPulse
        },

        {
          title: "IPD",
          value: "BDT 5,000",
          icon: Hospital
        },

        {
          title: "OPD",
          value: "N/A",
          icon: Stethoscope
        },

        {
          title: "Telemedicine",
          value:
          "24/7 Unlimited Audio & Video Doctor Consultancy (Up to 6 family members)",
          icon: Video
        },

        {
          title: "Discount Facilities",
          value:
          "Up to 50% Discount facilities at 50+ Hospitals & Diagnostics centers all around Bangladesh",
          icon: Percent
        }

      ]

    },


    shoshti: {

  name:"Shoshti",

  bangla:"স্বস্তি",

  yearly:"BDT 2,580",

  monthly:"BDT 375",


  benefits:[

    {
      title:"Life Coverage",
      value:"BDT 175,000",
      icon:ShieldCheck
    },

    {
      title:"Accidental Death Benefit",
      value:"BDT 350,000",
      icon:HeartPulse
    },

    {
      title:"IPD",
      value:"BDT 20,000",
      icon:Hospital
    },
    {
          title: "OPD",
          value: "N/A",
          icon: Stethoscope
        },

        {
          title: "Telemedicine",
          value:
          "24/7 Unlimited Audio & Video Doctor Consultancy (Up to 6 family members)",
          icon: Video
        },

        {
          title: "Discount Facilities",
          value:
          "Up to 50% Discount facilities at 50+ Hospitals & Diagnostics centers all around Bangladesh",
          icon: Percent
        }

  ]

},
prottoy: {

  name: "Prottoy",

  bangla: "প্রত্যয়",

  yearly: "BDT 6,240",

  monthly: "BDT 520",


  benefits: [

    {
      title: "Life Coverage",
      value: "BDT 350,000",
      icon: ShieldCheck
    },

    {
      title: "Accidental Death Benefit",
      value: "BDT 700,000",
      icon: HeartPulse
    },

    {
      title: "Permanent Partial Disability & Permanent Total Disability",
      value: "BDT 250,000",
      icon: ShieldCheck
    },

    {
      title: "Critical Illness",
      value: "BDT 300,000",
      icon: HeartPulse
    },

    {
      title: "IPD",
      value: "BDT 50,000",
      icon: Hospital
    },

    {
      title: "OPD",
      value: "BDT 5,000",
      icon: Stethoscope
    },

    {
      title: "Telemedicine",
      value:
      "24/7 Unlimited Audio & Video Doctor Consultancy (Up to 6 family members)",
      icon: Video
    },

    {
      title: "Discount Facilities",
      value:
      "Up to 50% Discount facilities at 50+ Hospitals & Diagnostics centers all around Bangladesh",
      icon: Percent
    }

  ]

},
nirbor: {

  name: "Nirbor",

  bangla: "নির্ভর",

  yearly: "BDT 1,620",

  monthly: "BDT 135",


  benefits: [

    {
      title: "Life Coverage",
      value: "BDT 150,000",
      icon: ShieldCheck
    },

    {
      title: "Accidental Death Benefit",
      value: "BDT 300,000",
      icon: HeartPulse
    },

    {
      title: "Permanent Partial Disability & Permanent Total Disability",
      value: "BDT 150,000",
      icon: ShieldCheck
    },

    {
      title: "Critical Illness",
      value: "N/A",
      icon: HeartPulse
    },

    {
      title: "IPD",
      value: "BDT 10,000",
      icon: Hospital
    },

    {
      title: "OPD",
      value: "N/A",
      icon: Stethoscope
    },

    {
      title: "Telemedicine",
      value:
      "24/7 Unlimited Audio & Video Doctor Consultancy (Up to 6 family members)",
      icon: Video
    },

    {
      title: "Discount Facilities",
      value:
      "Up to 50% Discount facilities at 50+ Hospitals & Diagnostics centers all around Bangladesh",
      icon: Percent
    }

  ]

},

ashtha: {

  name: "Ashtha",

  bangla: "আস্থা",

  yearly: "BDT 4,500",

  monthly: "BDT 375",


  benefits: [

    {
      title: "Life Coverage",
      value: "BDT 250,000",
      icon: ShieldCheck
    },

    {
      title: "Accidental Death Benefit",
      value: "BDT 500,000",
      icon: HeartPulse
    },

    {
      title: "Permanent Partial Disability & Permanent Total Disability",
      value: "BDT 200,000",
      icon: ShieldCheck
    },

    {
      title: "Critical Illness",
      value: "BDT 250,000",
      icon: HeartPulse
    },

    {
      title: "IPD",
      value: "BDT 30,000",
      icon: Hospital
    },

    {
      title: "OPD",
      value: "BDT 2,000",
      icon: Stethoscope
    },

    {
      title: "Telemedicine",
      value:
      "24/7 Unlimited Audio & Video Doctor Consultancy (Up to 6 family members)",
      icon: Video
    },

    {
      title: "Discount Facilities",
      value:
      "Up to 50% Discount facilities at 50+ Hospitals & Diagnostics centers all around Bangladesh",
      icon: Percent
    }

  ]

},

shurokka: {

  name: "Shurokka",

  bangla: "সুরক্ষা",

  yearly: "BDT 3,000",

  monthly: "BDT 250",


  benefits: [

    {
      title: "Life Coverage",
      value: "BDT 300,000",
      icon: ShieldCheck
    },

    {
      title: "Accidental Death Benefit",
      value: "N/A",
      icon: HeartPulse
    },

    {
      title: "Permanent Partial Disability & Permanent Total Disability",
      value: "N/A",
      icon: ShieldCheck
    },

    {
      title: "Critical Illness",
      value: "BDT 300,000",
      icon: HeartPulse
    },

    {
      title: "IPD",
      value: "N/A",
      icon: Hospital
    },

    {
      title: "OPD",
      value: "N/A",
      icon: Stethoscope
    },

    {
      title: "Telemedicine",
      value:
      "24/7 Unlimited Audio & Video Doctor Consultancy (Up to 6 family members)",
      icon: Video
    },

    {
      title: "Discount Facilities",
      value:
      "Up to 50% Discount facilities at 50+ Hospitals & Diagnostics centers all around Bangladesh",
      icon: Percent
    }

  ]

},



  };





  const currentPackage = packages[slug];





  if(!currentPackage){

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

        Package Not Found

      </div>

    );

  }







return (

<section className="pb-12">





{/* Banner */}

<div
  className="
    relative
    mb-10
    w-full
    overflow-hidden
    rounded-3xl
    bg-white
    shadow-[0_8px_30px_rgba(0,0,0,0.08)]
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

  {/* Banner Content */}

  <div
    className="
      absolute
      inset-0
      flex
      items-center
    "
  >
    <div
      className="
        px-6
        md:px-10
        lg:px-14
      "
    >
      <span
        className="
          inline-flex
          rounded-full
          bg-white
          px-5
          py-2
          text-sm
          font-semibold
          text-[#2F6FED]
          shadow-sm
        "
      >
        Bellevie Guardian Health Programme
      </span>

      <h1
        className="
          mt-5
          text-3xl
          font-bold
          text-white
          md:text-5xl
          lg:text-6xl
        "
      >
        {currentPackage.name}

        <span className="ml-2">
          ({currentPackage.bangla})
        </span>
      </h1>

      <p
        className="
          mt-3
          max-w-xl
          text-base
          text-white
          md:text-lg
        "
      >
        Affordable healthcare protection with premium benefits.
      </p>
    </div>
  </div>
</div>






{/* Premium Card */}


<div className="
mt-10
grid
gap-6
md:grid-cols-2
">



<div className="
rounded-3xl
bg-gradient-to-r
from-[#BEE9FF]
to-[#DFF8EF]
p-7
shadow-[0_8px_25px_rgba(0,0,0,0.08)]
">


<p className="
text-[#7A7A7A]
">

Yearly Premium

</p>


<h2 className="
mt-2
text-4xl
font-bold
text-[#212121]
">

{currentPackage.yearly}

</h2>


</div>





<div className="
rounded-3xl
bg-gradient-to-r
from-[#DFF8EF]
to-[#BEE9FF]
p-7
shadow-[0_8px_25px_rgba(0,0,0,0.08)]
">


<p className="
text-[#7A7A7A]
">

Monthly Premium

</p>


<h2 className="
mt-2
text-4xl
font-bold
text-[#2F6FED]
">

{currentPackage.monthly}

</h2>


</div>



</div>









{/* Benefits */}



<div className="mt-14">


<h2 className="
mb-8
text-3xl
font-bold
text-[#212121]
">

Benefits & Coverage

</h2>





<div className="
grid
gap-6
md:grid-cols-2
">



{
currentPackage.benefits.map((item,index)=>{


const Icon = item.icon;



return (


<div

key={index}

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
transition
duration-300
hover:-translate-y-2
"


>


<div className="
flex
items-start
gap-4
">



<div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-white
text-[#2F6FED]
shadow
">


<Icon size={28}/>


</div>





<div>


<h3 className="
text-lg
font-bold
text-[#212121]
">

{item.title}

</h3>


<p className="
mt-2
leading-7
text-[#7A7A7A]
">

{item.value}

</p>


</div>



</div>


</div>


)


})
}




</div>



</div>






</section>

);


}


export default PremiumPackageDetails;