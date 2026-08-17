
import {
  ShieldCheck,
  UserRound,
  Database,
  Share2,
  LockKeyhole,
  FileLock2,
  CheckCircle2,
  Cookie,
  ExternalLink,
  Archive,
  UserCheck,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function PrivacyPolicy() {

  const sections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: Database,
      content: (
        <>
          <p>
            We may collect the following categories of information when you
            use our healthcare services, website, mobile application, or
            communicate with us.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-[#F8FAFC] p-5">
              <h3 className="font-bold text-[#212121]">
                Personal Information
              </h3>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#7A7A7A]">
                <li>• Full name</li>
                <li>• Phone number</li>
                <li>• Email address</li>
                <li>• Address</li>
                <li>• Passport or National ID information, if required for medical travel</li>
                <li>• Emergency contact information</li>
              </ul>
            </div>


            <div className="rounded-2xl bg-[#F8FAFC] p-5">
              <h3 className="font-bold text-[#212121]">
                Medical Information
              </h3>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#7A7A7A]">
                <li>• Medical reports</li>
                <li>• Diagnostic results</li>
                <li>• Treatment history</li>
                <li>• Doctor prescriptions</li>
                <li>• Hospital preferences</li>
              </ul>
            </div>


            <div className="rounded-2xl bg-[#F8FAFC] p-5">
              <h3 className="font-bold text-[#212121]">
                Technical Information
              </h3>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#7A7A7A]">
                <li>• IP address</li>
                <li>• Device information</li>
                <li>• Browser type</li>
                <li>• App usage data</li>
              </ul>
            </div>

          </div>
        </>
      ),
    },

    {
      id: 2,
      title: "How We Use Your Information",
      icon: UserRound,
      content: (
        <>
          <p>
            We use the information we collect to provide, manage, and improve
            our healthcare assistance services. This may include:
          </p>

          <ul className="mt-4 space-y-3 text-[#7A7A7A]">
            <li>• Arrange medical consultations and treatments</li>
            <li>• Connect patients with hospitals and doctors</li>
            <li>• Process appointments and medical inquiries</li>
            <li>• Provide customer support</li>
            <li>• Improve our services and platform</li>
            <li>• Communicate important updates and treatment information</li>
            <li>• Maintain legal and regulatory compliance</li>
          </ul>
        </>
      ),
    },

    {
      id: 3,
      title: "Information Sharing",
      icon: Share2,
      content: (
        <>
          <p>
            BelleVie Health Care Services may share relevant information with
            trusted parties when necessary to provide requested healthcare
            services or support. These may include:
          </p>

          <ul className="mt-4 space-y-3 text-[#7A7A7A]">
            <li>• Hospitals and healthcare providers</li>
            <li>• Doctors and medical consultants</li>
            <li>• Diagnostic centers</li>
            <li>• Travel and visa support partners, when necessary</li>
          </ul>

          <div className="mt-5 rounded-2xl bg-[#D9F7E8]/60 p-4 text-sm font-medium leading-6 text-[#212121]">
            We do not sell or rent your personal information to third parties.
          </div>
        </>
      ),
    },

    {
      id: 4,
      title: "Data Protection",
      icon: LockKeyhole,
      content: (
        <>
          <p>
            We implement appropriate security measures to protect your
            personal and medical information from:
          </p>

          <ul className="mt-4 space-y-3 text-[#7A7A7A]">
            <li>• Unauthorized access</li>
            <li>• Misuse</li>
            <li>• Loss</li>
            <li>• Disclosure</li>
            <li>• Alteration</li>
          </ul>

          <p className="mt-5">
            However, no online system or method of electronic transmission can
            guarantee complete security.
          </p>
        </>
      ),
    },

    {
      id: 5,
      title: "Confidentiality of Medical Records",
      icon: FileLock2,
      content: (
        <p>
          All medical records and reports shared with BelleVie Health Care
          Services are treated as confidential and are only shared with
          authorized healthcare professionals involved in the patient's
          treatment process or when otherwise necessary to provide requested
          services.
        </p>
      ),
    },

    {
      id: 6,
      title: "Patient Consent",
      icon: CheckCircle2,
      content: (
        <>
          <p>
            By using our services, you consent to:
          </p>

          <ul className="mt-4 space-y-3 text-[#7A7A7A]">
            <li>• Collection and processing of your information</li>
            <li>• Sharing medical records with relevant healthcare providers</li>
            <li>
              • Communication through phone calls, email, WhatsApp, or other
              platforms regarding your treatment
            </li>
          </ul>
        </>
      ),
    },

    {
      id: 7,
      title: "Cookies and Tracking Technologies",
      icon: Cookie,
      content: (
        <p>
          Our website or mobile application may use cookies and similar
          technologies to improve user experience, understand usage patterns,
          and analyze platform performance.
        </p>
      ),
    },

    {
      id: 8,
      title: "Third-Party Services",
      icon: ExternalLink,
      content: (
        <p>
          Our platform may contain links to third-party websites, hospitals,
          healthcare providers, or other external organizations. BelleVie
          Health Care Services is not responsible for the privacy practices,
          policies, or content of external websites or organizations.
        </p>
      ),
    },

    {
      id: 9,
      title: "Data Retention",
      icon: Archive,
      content: (
        <p>
          We retain personal and medical information only for as long as
          necessary to provide our services, comply with applicable legal
          obligations, maintain appropriate records, and resolve disputes.
        </p>
      ),
    },

    {
      id: 10,
      title: "Your Rights",
      icon: UserCheck,
      content: (
        <>
          <p>
            Subject to applicable laws and legal requirements, you may request
            to:
          </p>

          <ul className="mt-4 space-y-3 text-[#7A7A7A]">
            <li>• Access your personal data</li>
            <li>• Correct inaccurate information</li>
            <li>• Delete your information, subject to legal requirements</li>
            <li>• Withdraw consent for communication</li>
          </ul>
        </>
      ),
    },

    {
      id: 11,
      title: "Changes to This Privacy Policy",
      icon: RefreshCw,
      content: (
        <p>
          BelleVie Health Care Services may update this Privacy Policy from
          time to time to reflect changes in our services, practices, or legal
          requirements. Updated versions of this policy will be posted on our
          official platform.
        </p>
      ),
    },
  ];


  return (

    <section className="pb-12">

      {/* =====================================
          HEADER
      ===================================== */}

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
          <ShieldCheck size={18} />

          Privacy Policy
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
          Privacy Policy
        </h1>


        <p
          className="
            mt-3
            max-w-3xl
            leading-7
            text-[#7A7A7A]
          "
        >
          We value your privacy and are committed to protecting your personal
          and medical information.
        </p>


        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#7A7A7A]
          "
        >
          <span>Effective Date:</span>

          <span className="font-semibold text-[#212121]">
            May 24, 2026
          </span>
        </div>

      </div>


      {/* =====================================
          INTRODUCTION
      ===================================== */}

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
          Welcome to BelleVie Health Care Services
        </h2>


        <p
          className="
            mt-4
            leading-7
            text-[#7A7A7A]
          "
        >
          Welcome to BelleVie Health Care Services. We value your privacy and
          are committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, store, and protect your
          information when you use our services, website, mobile application,
          or communicate with us.
        </p>

      </div>


      {/* =====================================
          POLICY SECTIONS
      ===================================== */}

      <div className="space-y-5">

        {sections.map((section) => {

          const Icon = section.icon;

          return (

            <div
              key={section.id}
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

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-3">

                    <span
                      className="
                        text-sm
                        font-bold
                        text-[#2F6FED]
                      "
                    >
                      {String(section.id).padStart(2, "0")}
                    </span>


                    <h2
                      className="
                        text-lg
                        font-bold
                        text-[#212121]
                        md:text-xl
                      "
                    >
                      {section.title}
                    </h2>

                  </div>


                  <div
                    className="
                      mt-4
                      leading-7
                      text-[#7A7A7A]
                    "
                  >
                    {section.content}
                  </div>

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* =====================================
          CONTACT US
      ===================================== */}

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-[#EEEEEE]
          bg-white
          p-6
          shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          md:p-8
        "
      >

        <div className="flex gap-4">

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
            "
          >
            <Mail size={23} />
          </div>


          <div>

            <h2
              className="
                text-xl
                font-bold
                text-[#212121]
              "
            >
              12. Contact Us
            </h2>


            <p
              className="
                mt-3
                leading-7
                text-[#7A7A7A]
              "
            >
              For any privacy-related questions, concerns, or requests,
              please contact BelleVie Health Care Services.
            </p>

          </div>

        </div>


        {/* Contact Information */}

        <div
          className="
            mt-6
            grid
            gap-4
            md:grid-cols-3
          "
        >

          <a
            href="mailto:info@belleviehealth.com"
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-[#F8FAFC]
              p-4
              transition
              hover:bg-[#D9F7E8]
            "
          >

            <Mail
              size={19}
              className="text-[#2F6FED]"
            />

            <div>

              <p className="text-xs text-[#7A7A7A]">
                Email
              </p>

              <p className="mt-1 text-sm font-semibold text-[#212121]">
                info@belleviehealth.com
              </p>

            </div>

          </a>


          <a
            href="tel:+8801805464400"
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-[#F8FAFC]
              p-4
              transition
              hover:bg-[#D9F7E8]
            "
          >

            <Phone
              size={19}
              className="text-[#2F6FED]"
            />

            <div>

              <p className="text-xs text-[#7A7A7A]">
                Phone
              </p>

              <p className="mt-1 text-sm font-semibold text-[#212121]">
                +8801805464400
              </p>

            </div>

          </a>


          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-[#F8FAFC]
              p-4
            "
          >

            <MapPin
              size={19}
              className="text-[#2F6FED]"
            />

            <div>

              <p className="text-xs text-[#7A7A7A]">
                Address
              </p>

              <p className="mt-1 text-sm font-semibold text-[#212121]">
                Dhaka, Bangladesh
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          FINAL NOTICE
      ===================================== */}

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
              Your Privacy Matters
            </h2>


            <p
              className="
                mt-2
                leading-7
                text-[#7A7A7A]
              "
            >
              We are committed to handling your personal and medical
              information responsibly and maintaining appropriate safeguards
              to protect your privacy.
            </p>

          </div>

        </div>

      </div>

    </section>

  );

}

export default PrivacyPolicy;
