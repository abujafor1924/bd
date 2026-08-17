
import {
  FileText,
  ShieldCheck,
  UserCheck,
  Stethoscope,
  CreditCard,
  CalendarCheck,
  LockKeyhole,
  Plane,
  Scale,
  RefreshCw,
} from "lucide-react";

function TermsConditions() {

  const terms = [
    {
      id: 1,
      title: "Service Role",
      icon: ShieldCheck,
      content:
        "BelleVie provides healthcare assistance and coordination services, including doctor appointments, healthcare service information, and assistance in accessing available medical services. BelleVie acts as a healthcare support and coordination platform and does not replace the professional judgment of qualified healthcare providers.",
    },

    {
      id: 2,
      title: "Patient Responsibility",
      icon: UserCheck,
      content:
        "Patients are responsible for providing accurate, complete, and up-to-date medical and personal information. Patients should follow the instructions and recommendations provided by their healthcare professionals and inform the relevant healthcare provider about any changes in their medical condition.",
    },

    {
      id: 3,
      title: "Medical Disclaimer",
      icon: Stethoscope,
      content:
        "BelleVie does not provide medical diagnosis or treatment directly unless specifically stated. Medical treatment decisions, prescriptions, procedures, and healthcare outcomes are determined by the responsible healthcare professionals. Treatment results may vary from patient to patient, and BelleVie does not guarantee any specific medical outcome.",
    },

    {
      id: 4,
      title: "Payment",
      icon: CreditCard,
      content:
        "Patients may be required to pay applicable consultation fees, service charges, treatment costs, hospital charges, or other related expenses. Service charges and treatment costs may vary depending on the doctor, hospital, healthcare provider, or selected service. Medical outcomes are not guaranteed based on any payment made through BelleVie.",
    },

    {
      id: 5,
      title: "Appointment",
      icon: CalendarCheck,
      content:
        "Doctor appointments and consultations are subject to the availability and confirmation of the respective doctor or healthcare provider. An appointment request does not necessarily guarantee a confirmed appointment until it has been accepted or confirmed by the relevant provider.",
    },

    {
      id: 6,
      title: "Privacy",
      icon: LockKeyhole,
      content:
        "BelleVie is committed to protecting patient information and maintaining confidentiality. Patient information may be collected, stored, and shared with relevant doctors, hospitals, healthcare providers, or service partners when necessary to provide requested healthcare services, subject to applicable privacy requirements.",
    },

    {
      id: 7,
      title: "International Treatment",
      icon: Plane,
      content:
        "For international treatment services, visa approval, travel arrangements, accommodation, transportation, and related travel costs are dependent on the relevant authorities, hospitals, service providers, and the patient's individual circumstances. BelleVie does not guarantee visa approval, travel authorization, or any specific travel arrangement.",
    },

    {
      id: 8,
      title: "Liability",
      icon: Scale,
      content:
        "BelleVie acts as a healthcare assistance and coordination service and is not responsible for medical negligence, malpractice, treatment decisions, or professional conduct of independent doctors, hospitals, or other healthcare providers. Any medical concern or claim relating to professional medical care should be addressed with the responsible healthcare provider.",
    },

    {
      id: 9,
      title: "Updates to These Terms",
      icon: RefreshCw,
      content:
        "BelleVie may update or modify these Terms and Conditions from time to time to reflect changes in services, policies, legal requirements, or business practices. Updated terms may become effective when published through the website or application. Users are encouraged to review these terms periodically.",
    },
  ];


  return (

    <section className="pb-12">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-10">

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#D9F7E8]
            px-4
            py-2
            text-sm
            font-semibold
            text-[#2F6FED]
          "
        >

          <FileText size={18} />

          Terms & Conditions

        </div>


        <h1
          className="
            mt-5
            text-3xl
            font-extrabold
            text-[#212121]
            md:text-4xl
          "
        >
          Terms & Conditions
        </h1>


        <p
          className="
            mt-3
            max-w-3xl
            leading-7
            text-[#7A7A7A]
          "
        >
          Please read these Terms and Conditions carefully before using
          BelleVie Global Health's healthcare assistance and coordination
          services.
        </p>

      </div>


      {/* ==============================
          INTRODUCTION
      ============================== */}

      <div
        className="
          mb-8
          rounded-3xl
          border
          border-[#EEEEEE]
          bg-white
          p-6
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          md:p-8
        "
      >

        <h2
          className="
            text-xl
            font-bold
            text-[#212121]
          "
        >
          Introduction
        </h2>


        <p
          className="
            mt-3
            leading-7
            text-[#7A7A7A]
          "
        >
          These Terms and Conditions govern your use of the healthcare
          assistance, appointment coordination, international treatment
          assistance, and related services provided by BelleVie Global Health.
          By using our services, you acknowledge that you have read,
          understood, and agreed to these terms.
        </p>

      </div>


      {/* ==============================
          TERMS
      ============================== */}

      <div className="space-y-5">

        {terms.map((term) => {

          const Icon = term.icon;

          return (

            <div
              key={term.id}
              className="
                group
                rounded-3xl
                border
                border-[#EEEEEE]
                bg-white
                p-6
                shadow-[0_6px_25px_rgba(0,0,0,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                md:p-7
              "
            >

              <div className="flex gap-5">

                {/* Icon */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#D9F7E8]
                    text-[#2F6FED]
                    transition
                    duration-300
                    group-hover:scale-105
                  "
                >

                  <Icon size={23} />

                </div>


                {/* Content */}

                <div>

                  <div className="flex items-center gap-3">

                    <span
                      className="
                        text-sm
                        font-bold
                        text-[#2F6FED]
                      "
                    >
                      {String(term.id).padStart(2, "0")}
                    </span>


                    <h2
                      className="
                        text-lg
                        font-bold
                        text-[#212121]
                        md:text-xl
                      "
                    >
                      {term.title}
                    </h2>

                  </div>


                  <p
                    className="
                      mt-3
                      leading-7
                      text-[#7A7A7A]
                    "
                  >
                    {term.content}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* ==============================
          FINAL NOTE
      ============================== */}

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-[#D9F7E8]
          bg-[#D9F7E8]/50
          p-6
          md:p-7
        "
      >

        <div className="flex gap-4">

          <ShieldCheck
            size={24}
            className="mt-1 shrink-0 text-[#2F6FED]"
          />

          <div>

            <h2
              className="
                text-lg
                font-bold
                text-[#212121]
              "
            >
              Important Notice
            </h2>


            <p
              className="
                mt-2
                leading-7
                text-[#7A7A7A]
              "
            >
              By using BelleVie Global Health services, you acknowledge that
              healthcare services involve professional medical decisions and
              that individual treatment outcomes may vary. Please consult the
              appropriate healthcare professional for medical advice,
              diagnosis, or treatment.
            </p>

          </div>

        </div>

      </div>

    </section>

  );

}

export default TermsConditions;
