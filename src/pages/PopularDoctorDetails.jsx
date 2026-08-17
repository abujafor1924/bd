import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BriefcaseMedical,
  CalendarDays,
  Clock3,
  DollarSign,
  Hospital,
  MapPin,
  Phone,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { getPopularDoctorDetails } from "../services/popularService";

function PopularDoctorDetails() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadDoctorDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        setImageError(false);

        const data = await getPopularDoctorDetails(id);

        console.log("Popular Doctor Details:", data);

        setDoctor(data);
      } catch (error) {
        console.error("Popular doctor details loading error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDoctorDetails();
    }
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="w-full pb-12">
        {/* Back Skeleton */}
        <div className="mb-6 h-10 w-24 animate-pulse rounded-xl bg-gray-200" />

        {/* Main Skeleton */}
        <div className="overflow-hidden rounded-[28px] border border-[#EEEEEE] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          {/* Hero */}
          <div className="bg-[#EAF7F1] px-6 py-10 md:px-10 lg:px-14">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="h-40 w-40 shrink-0 animate-pulse rounded-full bg-gray-200 md:h-44 md:w-44" />

              <div className="w-full space-y-4 text-center md:text-left">
                <div className="mx-auto h-7 w-32 animate-pulse rounded-full bg-gray-200 md:mx-0" />
                <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-gray-200 md:mx-0" />
                <div className="mx-auto h-6 w-48 animate-pulse rounded-lg bg-gray-200 md:mx-0" />

                <div className="flex justify-center gap-3 md:justify-start">
                  <div className="h-9 w-36 animate-pulse rounded-xl bg-gray-200" />
                  <div className="h-9 w-28 animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-4 h-32 animate-pulse rounded-2xl bg-gray-200" />
              </div>

              <div>
                <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-4 h-28 animate-pulse rounded-2xl bg-gray-200" />
              </div>
            </div>

            <div className="h-96 animate-pulse rounded-3xl bg-gray-200" />
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !doctor) {
    return (
      <section className="flex min-h-[520px] w-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[28px] border border-[#EEEEEE] bg-white p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.07)] sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D9F7E8] text-[#2F6FED]">
            <Stethoscope size={38} />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold text-[#212121]">
            Doctor Not Found
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7A7A7A]">
            We could not load this doctor's information. Please try again or
            return to the home page.
          </p>

          <Link
            to="/"
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
              font-bold
              text-white
              shadow-[0_5px_15px_rgba(47,111,237,0.20)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#245bd0]
              hover:shadow-[0_8px_20px_rgba(47,111,237,0.25)]
            "
          >
            <ArrowLeft size={18} />
            Go Home
          </Link>
        </div>
      </section>
    );
  }

  // ==========================================
  // DATA
  // ==========================================

  const doctorName =
    doctor.name_en ||
    doctor.name ||
    doctor.name_bn ||
    "Doctor";

  const designation =
    doctor.designation_en ||
    doctor.designation ||
    doctor.designation_bn ||
    "Medical Specialist";

  const doctorDetails =
    doctor.doctor_details_en ||
    doctor.doctor_details ||
    doctor.doctor_details_bn ||
    "No doctor details available.";

  const schedule =
    doctor.doctor_sedule ||
    "Schedule information is not available.";

  const hospital = doctor.hospital || {};

  const hospitalName =
    hospital.name_en ||
    hospital.name ||
    hospital.name_bn ||
    "Hospital";

  const hospitalAddress =
    hospital.address_en ||
    hospital.address ||
    hospital.address_bn ||
    "Address not available.";

  const hospitalContact =
    hospital.contact_details_en ||
    hospital.contact_details ||
    hospital.contact_details_bn ||
    "Contact information not available.";

  const hasExperience =
    doctor.years_of_experience !== undefined &&
    doctor.years_of_experience !== null &&
    doctor.years_of_experience !== "";

  const hasFee =
    doctor.doctor_fees !== undefined &&
    doctor.doctor_fees !== null &&
    doctor.doctor_fees !== "";

  const hasDoctorContact =
    doctor.contact_details !== undefined &&
    doctor.contact_details !== null &&
    doctor.contact_details !== "";

  const hasImage = doctor.image && !imageError;

  // ==========================================
  // SECTION TITLE COMPONENT
  // ==========================================

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-[#D9F7E8]
          text-[#2F6FED]
        "
      >
        <Icon size={21} />
      </div>

      <h2 className="text-xl font-extrabold text-[#212121] sm:text-2xl">
        {title}
      </h2>
    </div>
  );

  return (
    <section className="w-full pb-12">
      {/* ==========================================
          BACK BUTTON
      ========================================== */}

      <Link
        to="/"
        className="
          mb-5
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
          text-[#212121]
          shadow-sm
          transition-all
          duration-200
          hover:-translate-x-0.5
          hover:border-[#D9F7E8]
          hover:bg-[#D9F7E8]
          hover:text-[#2F6FED]
        "
      >
        <ArrowLeft size={17} />
        Back
      </Link>

      {/* ==========================================
          MAIN CARD
      ========================================== */}

      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-[#EEEEEE]
          bg-white
          shadow-[0_12px_40px_rgba(0,0,0,0.07)]
        "
      >
        {/* ========================================
            HERO
        ======================================== */}

        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#BEE9FF]
            via-[#E8F9F3]
            to-[#D9F7E8]
            px-5
            py-9
            sm:px-8
            md:px-10
            md:py-12
            lg:px-14
          "
        >
          {/* Decorative Circle 1 */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              bg-white/25
            "
          />

          {/* Decorative Circle 2 */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              left-[35%]
              h-52
              w-52
              rounded-full
              bg-white/20
            "
          />

          {/* Decorative Circle 3 */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-10
              -left-16
              h-32
              w-32
              rounded-full
              bg-white/20
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              items-center
              gap-7
              md:flex-row
              md:items-center
              md:gap-9
            "
          >
            {/* ====================================
                DOCTOR IMAGE
            ==================================== */}

            <div
              className="
                relative
                h-40
                w-40
                shrink-0
                overflow-hidden
                rounded-full
                border-[7px]
                border-white
                bg-white
                shadow-[0_12px_30px_rgba(0,0,0,0.14)]
                sm:h-44
                sm:w-44
                md:h-48
                md:w-48
              "
            >
              {hasImage ? (
                <img
                  src={doctor.image}
                  alt={doctorName}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    bg-[#F8FAFC]
                    text-[#2F6FED]
                  "
                >
                  <UserRound
                    size={68}
                    strokeWidth={1.7}
                  />
                </div>
              )}
            </div>

            {/* ====================================
                DOCTOR INFO
            ==================================== */}

            <div className="min-w-0 text-center md:text-left">
              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/70
                  bg-white/80
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-[#2F6FED]
                  shadow-sm
                  backdrop-blur-sm
                "
              >
                <Stethoscope size={16} />
                Popular Doctor
              </div>

              {/* Name */}

              <h1
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  leading-tight
                  tracking-tight
                  text-[#212121]
                  sm:text-4xl
                  lg:text-[42px]
                "
              >
                {doctorName}
              </h1>

              {/* Designation */}

              <p
                className="
                  mt-2
                  text-base
                  font-bold
                  text-[#2F6FED]
                  sm:text-lg
                "
              >
                {designation}
              </p>

              {/* Stats */}

              {(hasExperience || hasFee) && (
                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    justify-center
                    gap-2.5
                    md:justify-start
                  "
                >
                  {hasExperience && (
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/70
                        bg-white/80
                        px-3.5
                        py-2
                        text-xs
                        font-bold
                        text-[#212121]
                        shadow-sm
                        backdrop-blur-sm
                        sm:text-sm
                      "
                    >
                      <Clock3
                        size={16}
                        className="shrink-0 text-[#2F6FED]"
                      />

                      <span>
                        {doctor.years_of_experience} Years Experience
                      </span>
                    </div>
                  )}

                  {hasFee && (
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/70
                        bg-white/80
                        px-3.5
                        py-2
                        text-xs
                        font-bold
                        text-[#212121]
                        shadow-sm
                        backdrop-blur-sm
                        sm:text-sm
                      "
                    >
                      <DollarSign
                        size={16}
                        className="shrink-0 text-[#2F6FED]"
                      />

                      <span>{doctor.doctor_fees}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div
          className="
            grid
            gap-8
            p-5
            sm:p-7
            md:p-10
            lg:grid-cols-3
            lg:gap-10
          "
        >
          {/* ======================================
              LEFT CONTENT
          ====================================== */}

          <div className="min-w-0 space-y-9 lg:col-span-2">
            {/* ====================================
                ABOUT DOCTOR
            ==================================== */}

            <div>
              <SectionTitle
                icon={BriefcaseMedical}
                title="About Information"
              />

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-[#EEEEEE]
                  bg-[#F8FAFC]
                  p-5
                  sm:p-6
                "
              >
                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-7
                    text-[#555]
                    sm:text-[15px]
                  "
                >
                  {doctorDetails}
                </p>
              </div>
            </div>

            {/* ====================================
                SCHEDULE
            ==================================== */}

            <div>
              <SectionTitle
                icon={CalendarDays}
                title="Doctor Schedule"
              />

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-[#EEEEEE]
                  bg-white
                  p-5
                  shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                  sm:p-6
                "
              >
                <div
                  className="
                    rounded-xl
                    bg-[#F8FAFC]
                    px-4
                    py-4
                  "
                >
                  <p
                    className="
                      whitespace-pre-line
                      text-sm
                      leading-7
                      text-[#555]
                      sm:text-[15px]
                    "
                  >
                    {schedule}
                  </p>
                </div>
              </div>
            </div>

            {/* ====================================
                SPECIALITIES
            ==================================== */}

            {doctor.subcategories?.length > 0 && (
              <div>
                <SectionTitle
                  icon={Stethoscope}
                  title="Specialities"
                />

                <div className="mt-4 flex flex-wrap gap-3">
                  {doctor.subcategories.map((item) => (
                    <div
                      key={item.id}
                      className="
                        flex
                        items-center
                        gap-2.5
                        rounded-full
                        border
                        border-[#EEEEEE]
                        bg-white
                        px-3.5
                        py-2
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-[#D9F7E8]
                        hover:bg-[#F8FFFB]
                      "
                    >
                      {item.icon ? (
                        <img
                          src={item.icon}
                          alt=""
                          className="
                            h-7
                            w-7
                            rounded-full
                            object-contain
                          "
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-[#D9F7E8]
                            text-[#2F6FED]
                          "
                        >
                          <Stethoscope size={14} />
                        </div>
                      )}

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-[#212121]
                        "
                      >
                        {item.name_en ||
                          item.name ||
                          item.name_bn ||
                          "Speciality"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ======================================
              HOSPITAL SIDEBAR
          ====================================== */}

          <div className="min-w-0">
            <div
              className="
                overflow-hidden
                rounded-[24px]
                border
                border-[#EEEEEE]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                lg:sticky
                lg:top-24
              "
            >
              {/* Hospital Header */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#BEE9FF]
                  to-[#DFF8EF]
                  p-6
                "
              >
                {/* Decorative */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-white/25
                  "
                />

                <div
                  className="
                    relative
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

                <p
                  className="
                    relative
                    mt-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#2F6FED]
                  "
                >
                  Hospital / Clinic
                </p>

                <h2
                  className="
                    relative
                    mt-1.5
                    text-xl
                    font-extrabold
                    leading-snug
                    text-[#212121]
                  "
                >
                  {hospitalName}
                </h2>
              </div>

              {/* Hospital Information */}

              <div className="space-y-5 p-5 sm:p-6">
                {/* Address */}

                <div className="flex gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <MapPin size={18} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-[#7A7A7A]
                      "
                    >
                      Address
                    </p>

                    <p
                      className="
                        mt-1
                        whitespace-pre-line
                        text-sm
                        leading-6
                        text-[#555]
                      "
                    >
                      {hospitalAddress}
                    </p>
                  </div>
                </div>

                {/* Hospital Contact */}

                <div className="flex gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Phone size={18} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-[#7A7A7A]
                      "
                    >
                      Hospital Contact
                    </p>

                    <p
                      className="
                        mt-1
                        whitespace-pre-line
                        text-sm
                        leading-6
                        text-[#555]
                      "
                    >
                      {hospitalContact}
                    </p>
                  </div>
                </div>

                {/* Doctor Contact */}

                {hasDoctorContact && (
                  <div className="flex gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#D9F7E8]
                        text-[#2F6FED]
                      "
                    >
                      <Phone size={18} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-[#7A7A7A]
                        "
                      >
                        Doctor Contact
                      </p>

                      <p
                        className="
                          mt-1
                          whitespace-pre-line
                          text-sm
                          leading-6
                          text-[#555]
                        "
                      >
                        {doctor.contact_details}
                      </p>
                    </div>
                  </div>
                )}

                {/* Divider */}

                <div className="border-t border-[#EEEEEE]" />

                {/* Consultation Fee */}

                {hasFee && (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#CBEEDD]
                      bg-[#D9F7E8]
                      p-4
                    "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <DollarSign
                          size={19}
                          className="shrink-0 text-[#2F6FED]"
                        />

                        <span className="text-sm font-semibold text-[#555]">
                          Consultation Fee
                        </span>
                      </div>

                      <span
                        className="
                          shrink-0
                          text-lg
                          font-extrabold
                          text-[#212121]
                        "
                      >
                        {doctor.doctor_fees}
                      </span>
                    </div>
                  </div>
                )}

                {/* Appointment Button */}

                <Link
                  to={`/doctor-appointment/${id}`}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#2F6FED]
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_5px_15px_rgba(47,111,237,0.20)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#245bd0]
                    hover:shadow-[0_8px_20px_rgba(47,111,237,0.25)]
                    active:translate-y-0
                  "
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </Link>

                <p className="text-center text-[11px] leading-5 text-[#7A7A7A]">
                  Schedule your consultation with this doctor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularDoctorDetails;