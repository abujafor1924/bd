import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Phone,
  Stethoscope,
  MapPin,
  Hospital,
  ShieldCheck,
  Clock3,
  Users,
  AlertCircle,
} from "lucide-react";

import { getForeignTreatmentHospitals } from "../services/foreignTreatmentService";

/* =========================================================
   STATIC HOSPITAL DETAILS
   ========================================================= */

const hospitalStaticDetails = {
  22: {
    description:
      "This hospital provides advanced medical treatment and comprehensive healthcare services for international patients. Patients can receive specialist consultation, diagnostic services and coordinated treatment support.",

    location: "Bangladesh",

    departments: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Oncology",
    ],

    facilities: [
      "Modern diagnostic facilities",
      "Experienced specialist doctors",
      "Advanced treatment facilities",
      "International patient support",
    ],

    patientServices: [
      "Appointment assistance",
      "Medical consultation",
      "Treatment coordination",
      "International patient support",
    ],

    contactNumbers: [
      "01805-464400",
      "01805-46391",
      "01805-464392",
    ],

    workingHours: "24/7 Emergency Services",
  },

  // =======================================================
  // ADD MORE HOSPITAL IDs HERE
  // =======================================================
  //
  // 61: {
  //   description: "...",
  //   location: "...",
  //   departments: [...],
  //   facilities: [...],
  //   patientServices: [...],
  //   contactNumbers: [
  //     "01805-464400",
  //     "01805-46391",
  //     "01805-464392",
  //   ],
  //   workingHours: "24/7 Emergency Services",
  // },
};


/* =========================================================
   COMPONENT
   ========================================================= */

function ForeignHospitalDetails() {
  const { hospitalId } = useParams();

  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =========================================================
     LOAD HOSPITAL FROM EXISTING HOSPITAL API
     ========================================================= */

  useEffect(() => {
    loadHospital();
  }, [hospitalId]);


  const loadHospital = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getForeignTreatmentHospitals();

      console.log(
        "Foreign Treatment Hospitals:",
        response
      );

      const hospitals =
        Array.isArray(response)
          ? response
          : response?.results || [];

      const selectedHospital =
        hospitals.find(
          (item) =>
            String(item.id) === String(hospitalId)
        );

      if (!selectedHospital) {
        setError("Hospital information not found.");
        setHospital(null);
        return;
      }

      setHospital(selectedHospital);

    } catch (error) {
      console.error(
        "Failed to load hospital:",
        error
      );

      setError(
        "Unable to load hospital information."
      );

      setHospital(null);
    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     LOADING
     ========================================================= */

  if (loading) {
    return (
      <section className="w-full min-w-0 pb-12">

        {/* Back Skeleton */}

        <div className="mb-6 h-10 w-44 animate-pulse rounded-xl bg-gray-200" />

        {/* Hero Skeleton */}

        <div className="overflow-hidden rounded-[28px] bg-gray-200">
          <div className="h-[320px] animate-pulse" />
        </div>

        {/* Quick Info Skeleton */}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-36
                animate-pulse
                rounded-3xl
                bg-gray-200
              "
            />
          ))}

        </div>

        {/* About Skeleton */}

        <div className="mt-8 h-64 animate-pulse rounded-3xl bg-gray-200" />

        {/* Department + Facilities Skeleton */}

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div className="h-72 animate-pulse rounded-3xl bg-gray-200" />

          <div className="h-72 animate-pulse rounded-3xl bg-gray-200" />

        </div>

        {/* Patient Services Skeleton */}

        <div className="mt-6 h-56 animate-pulse rounded-3xl bg-gray-200" />

      </section>
    );
  }


  /* =========================================================
     ERROR
     ========================================================= */

  if (error || !hospital) {
    return (
      <section className="w-full min-w-0 pb-12">

        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            rounded-[28px]
            bg-white
            p-8
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          "
        >

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-red-500
            "
          >
            <AlertCircle size={32} />
          </div>


          <h2
            className="
              mt-5
              text-2xl
              font-bold
              text-[#212121]
            "
          >
            Hospital Not Found
          </h2>


          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-[#7A7A7A]
            "
          >
            {error || "Hospital information is unavailable."}
          </p>


          <Link
            to="/foreign-treatment"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#2F6FED]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_6px_18px_rgba(47,111,237,0.25)]
              transition
              hover:bg-[#2358CB]
            "
          >
            <ArrowLeft size={17} />

            Back to Hospitals
          </Link>

        </div>

      </section>
    );
  }


  /* =========================================================
     STATIC DETAILS
     ========================================================= */

  const details =
    hospitalStaticDetails[hospitalId] || {
      description:
        "Detailed hospital information will be available soon.",

      location: "International Hospital",

      departments: [
        "Multiple specialties available",
      ],

      facilities: [
        "Modern healthcare facilities",
        "Specialist medical services",
        "International patient support",
      ],

      patientServices: [
        "Appointment assistance",
        "Treatment coordination",
      ],

      contactNumbers: [
        "01805-464400",
        "01805-464391",
        "01805-464392",
      ],

      workingHours:
        "Contact hospital for details",
    };


  /* =========================================================
     HOSPITAL BASIC INFORMATION FROM API
     ========================================================= */

  const hospitalName =
    hospital.name_en ||
    hospital.name ||
    "Hospital";

  const hospitalNameBn =
    hospital.name_bn;

  const hospitalLogo =
    hospital.icon ||
    hospital.logo;

  const speciality =
    hospital.speciality_en ||
    hospital.speciality ||
    hospital.speciality_bn ||
    "Multiple specialties available";


  /* =========================================================
     MAIN
     ========================================================= */

  return (
    <section className="w-full min-w-0 pb-12">

      {/* =====================================================
          BACK
      ===================================================== */}

      <Link
        to="/foreign-treatment"
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#EEEEEE]
          bg-white
          px-4
          py-2.5
          text-sm
          font-semibold
          text-[#2F6FED]
          shadow-sm
          transition
          hover:-translate-x-0.5
          hover:bg-[#F8FBFF]
        "
      >
        <ArrowLeft size={18} />

        Back to Foreign Treatment
      </Link>


      {/* =====================================================
          HERO
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/60
          bg-gradient-to-br
          from-[#BEE9FF]
          via-[#D7F5F0]
          to-[#DFF8EF]
          p-7
          shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_8px_24px_rgba(0,0,0,0.10)]
          md:p-10
        "
      >

        {/* Decorative Circle */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-72
            w-72
            rounded-full
            bg-white/30
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-20
            h-64
            w-64
            rounded-full
            bg-white/20
          "
        />


        <div
          className="
            relative
            z-10
            grid
            items-center
            gap-8
            md:grid-cols-[auto_1fr]
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <div
            className="
              flex
              h-28
              w-28
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[26px]
              bg-white
              p-3
              shadow-[0_8px_25px_rgba(0,0,0,0.10)]
              md:h-36
              md:w-36
            "
          >

            {hospitalLogo ? (
              <img
                src={hospitalLogo}
                alt={hospitalName}
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            ) : (
              <Building2
                size={52}
                className="text-[#2F6FED]"
              />
            )}

          </div>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div>

            {/* Partner Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/80
                px-4
                py-2
                text-sm
                font-bold
                text-[#2F6FED]
                shadow-sm
                backdrop-blur
              "
            >
              <CheckCircle2 size={17} />

              Preferred Hospital Partner
            </div>


            {/* Hospital Name */}

            <h1
              className="
                mt-5
                max-w-4xl
                text-3xl
                font-extrabold
                leading-tight
                tracking-tight
                text-[#212121]
                md:text-5xl
              "
            >
              {hospitalName}
            </h1>


            {/* Bangla Name */}

            {hospitalNameBn && (
              <p
                className="
                  mt-2
                  text-base
                  font-semibold
                  text-[#2F6FED]
                  md:text-lg
                "
              >
                {hospitalNameBn}
              </p>
            )}


            {/* SPECIALTY */}

            <div
              className="
                mt-5
                flex
                max-w-3xl
                items-start
                gap-3
                rounded-2xl
                bg-white/65
                p-4
                backdrop-blur-sm
              "
            >

              <Stethoscope
                size={20}
                className="mt-0.5 shrink-0 text-[#2F6FED]"
              />

              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-[#7A7A7A]
                  "
                >
                  Specialty
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-semibold
                    leading-6
                    text-[#212121]
                    md:text-base
                  "
                >
                  {speciality}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          QUICK INFO
      ===================================================== */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {/* =================================================
            LOCATION
        ================================================= */}

        <div
          className="
            rounded-[24px]
            bg-white
            p-5
            shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          "
        >

          <MapPin
            size={25}
            className="text-[#2F6FED]"
          />

          <p className="mt-4 text-sm text-[#7A7A7A]">
            Location
          </p>

          <p className="mt-1 font-bold text-[#212121]">
            {details.location}
          </p>

        </div>


        {/* =================================================
            CONTACT
        ================================================= */}

        <div
          className="
            rounded-[24px]
            bg-white
            p-5
            shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          "
        >

          <Phone
            size={25}
            className="text-[#2F6FED]"
          />

          <p className="mt-4 text-sm text-[#7A7A7A]">
            Contact
          </p>

          <div className="mt-2 space-y-1">

            {details.contactNumbers.map(
              (number, index) => (
                <a
                  key={index}
                  href={`tel:${number.replace(/-/g, "")}`}
                  className="
                    block
                    font-bold
                    text-[#212121]
                    transition
                    hover:text-[#2F6FED]
                    hover:underline
                  "
                >
                  {number}
                </a>
              )
            )}

          </div>

        </div>


        {/* =================================================
            HOURS
        ================================================= */}

        <div
          className="
            rounded-[24px]
            bg-white
            p-5
            shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          "
        >

          <Clock3
            size={25}
            className="text-[#2F6FED]"
          />

          <p className="mt-4 text-sm text-[#7A7A7A]">
            Service Hours
          </p>

          <p className="mt-1 font-bold text-[#212121]">
            {details.workingHours}
          </p>

        </div>


        {/* =================================================
            PARTNERSHIP
        ================================================= */}

        <div
          className="
            rounded-[24px]
            bg-white
            p-5
            shadow-[0_6px_20px_rgba(0,0,0,0.06)]
          "
        >

          <ShieldCheck
            size={25}
            className="text-[#2F6FED]"
          />

          <p className="mt-4 text-sm text-[#7A7A7A]">
            Partnership
          </p>

          <p className="mt-1 font-bold text-[#212121]">
            Preferred Partner
          </p>

        </div>

      </div>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <div className="mt-8">

        <div
          className="
            rounded-[26px]
            border
            border-[#EEEEEE]
            bg-white
            p-7
            shadow-[0_8px_25px_rgba(0,0,0,0.06)]
            md:p-9
          "
        >

          <div className="flex items-start gap-5">

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#D9F7E8]
                text-[#2F6FED]
              "
            >
              <Stethoscope size={27} />
            </div>


            <div className="min-w-0">

              <p className="text-sm font-semibold text-[#2F6FED]">
                About the Hospital
              </p>

              <h2
                className="
                  mt-1
                  text-2xl
                  font-extrabold
                  text-[#212121]
                  md:text-3xl
                "
              >
                Hospital Description
              </h2>

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-[#7A7A7A]
                  md:text-base
                  md:leading-8
                "
              >
                {details.description}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          DEPARTMENTS + FACILITIES
      ===================================================== */}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        {/* =================================================
            DEPARTMENTS
        ================================================= */}

        <div
          className="
            rounded-[26px]
            bg-gradient-to-br
            from-[#BEE9FF]
            to-[#DFF8EF]
            p-7
            shadow-[-3px_-3px_7px_rgba(255,255,255,0.8),3px_5px_15px_rgba(0,0,0,0.08)]
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-[#2F6FED]
                shadow-sm
              "
            >
              <Hospital size={27} />
            </div>


            <div>

              <p className="text-sm text-[#7A7A7A]">
                Medical Departments
              </p>

              <h2 className="text-xl font-extrabold text-[#212121]">
                Available Departments
              </h2>

            </div>

          </div>


          <div className="mt-6 space-y-3">

            {details.departments.map(
              (department, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-white/70
                    p-3
                  "
                >

                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#2F6FED]"
                  />

                  <span className="text-sm font-medium text-[#212121]">
                    {department}
                  </span>

                </div>
              )
            )}

          </div>

        </div>


        {/* =================================================
            FACILITIES
        ================================================= */}

        <div
          className="
            rounded-[26px]
            bg-gradient-to-br
            from-[#DFF8EF]
            to-[#BEE9FF]
            p-7
            shadow-[-3px_-3px_7px_rgba(255,255,255,0.8),3px_5px_15px_rgba(0,0,0,0.08)]
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-[#2F6FED]
                shadow-sm
              "
            >
              <ShieldCheck size={27} />
            </div>


            <div>

              <p className="text-sm text-[#7A7A7A]">
                Hospital Facilities
              </p>

              <h2 className="text-xl font-extrabold text-[#212121]">
                Facilities & Services
              </h2>

            </div>

          </div>


          <div className="mt-6 space-y-3">

            {details.facilities.map(
              (facility, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-white/70
                    p-3
                  "
                >

                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#2F6FED]"
                  />

                  <span className="text-sm font-medium text-[#212121]">
                    {facility}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          INTERNATIONAL PATIENT SERVICES
      ===================================================== */}

      <div
        className="
          mt-6
          rounded-[26px]
          border
          border-[#BEE9FF]
          bg-gradient-to-r
          from-[#EAF8FF]
          to-[#E9FAF3]
          p-7
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-[#2F6FED]
              shadow-sm
            "
          >
            <Users size={27} />
          </div>


          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-[#2F6FED]">
              International Patients
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#212121]">
              Patient Support Services
            </h2>

          </div>

        </div>


        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          {details.patientServices.map(
            (service, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-white/70
                  p-4
                "
              >

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-[#2F6FED]"
                />

                <span className="text-sm font-medium text-[#212121]">
                  {service}
                </span>

              </div>
            )
          )}

        </div>

      </div>


      

    </section>
  );
}

export default ForeignHospitalDetails;