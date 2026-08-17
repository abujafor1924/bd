import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";

function ContactUs() {
  const phoneNumbers = [
    {
      label: "Primary Support",
      number: "+8801805464400",
    },
    {
      label: "Emergency Support",
      number: "+8801805464400",
    },
    {
      label: "Customer Support",
      number: "+8801805464400",
    },
  ];

  const emailAddresses = [
    {
      label: "General Information",
      email: "info.belleviebd@gmail.com",
    },
    {
      label: "Customer Support",
      email: "support@belleviebd.com",
    },
    {
      label: "Business Enquiry",
      email: "business@belleviebd.com",
    },
  ];

  return (
    <section className="pb-12">

      {/* Hero / Get In Touch */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-[#2F6FED]
          to-[#4BA3FF]
          p-8
          shadow-[0_8px_30px_rgba(47,111,237,0.18)]
          md:p-12
        "
      >

        <div className="relative z-10 max-w-3xl">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/20
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
            "
          >
            <MessageCircle size={17} />

            Contact Us
          </span>

          <h1
            className="
              mt-5
              text-4xl
              font-extrabold
              leading-tight
              text-white
              md:text-5xl
            "
          >
            Get in Touch
          </h1>

          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-white/90
              md:text-lg
            "
          >
            Call or email BelleVie for support and guidance. Our team is
            always ready to assist you with healthcare services, appointments,
            packages, and other enquiries.
          </p>

        </div>

        {/* Decorative circles */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-64
            w-64
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-24
            right-20
            h-64
            w-64
            rounded-full
            bg-white/10
          "
        />

      </div>


      {/* Contact Cards */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {/* Phone Card */}

        <div
          className="
            rounded-3xl
            border
            border-white/50
            bg-gradient-to-r
            from-[#BEE9FF]
            to-[#DFF8EF]
            p-7
            shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.08)]
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
                shadow
              "
            >
              <Phone size={28} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#212121]">
                Phone Number
              </h2>

              <p className="mt-1 text-sm text-[#7A7A7A]">
                Call us for support and assistance.
              </p>

            </div>

          </div>


          {/* Phone Numbers */}

          <div className="mt-7 space-y-4">

            {phoneNumbers.map((item, index) => (

              <a
                key={index}
                href={`tel:${item.number}`}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-white/80
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Phone size={20} />
                  </div>

                  <div>

                    <p className="text-xs text-[#7A7A7A]">
                      {item.label}
                    </p>

                    <p className="mt-1 font-bold text-[#212121]">
                      {item.number}
                    </p>

                  </div>

                </div>


                <ArrowRight
                  size={20}
                  className="
                    text-[#2F6FED]
                    transition-transform
                    group-hover:translate-x-1
                  "
                />

              </a>

            ))}

          </div>

        </div>


        {/* Email Card */}

        <div
          className="
            rounded-3xl
            border
            border-white/50
            bg-gradient-to-r
            from-[#DFF8EF]
            to-[#BEE9FF]
            p-7
            shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.08)]
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
                shadow
              "
            >
              <Mail size={28} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#212121]">
                Email Address
              </h2>

              <p className="mt-1 text-sm text-[#7A7A7A]">
                Send us your questions or enquiries.
              </p>

            </div>

          </div>


          {/* Email Addresses */}

          <div className="mt-7 space-y-4">

            {emailAddresses.map((item, index) => (

              <a
                key={index}
                href={`mailto:${item.email}`}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-white/80
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#D9F7E8]
                      text-[#2F6FED]
                    "
                  >
                    <Mail size={20} />
                  </div>

                  <div>

                    <p className="text-xs text-[#7A7A7A]">
                      {item.label}
                    </p>

                    <p className="mt-1 break-all font-semibold text-[#212121]">
                      {item.email}
                    </p>

                  </div>

                </div>


                <ArrowRight
                  size={20}
                  className="
                    shrink-0
                    text-[#2F6FED]
                    transition-transform
                    group-hover:translate-x-1
                  "
                />

              </a>

            ))}

          </div>

        </div>

      </div>


      {/* Support Information */}

      <div
        className="
          mt-8
          rounded-3xl
          bg-white
          p-7
          shadow-[0_6px_25px_rgba(0,0,0,0.06)]
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
            <MessageCircle size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-[#212121]">
              We’re Here to Help
            </h2>

            <p className="mt-2 max-w-3xl leading-7 text-[#7A7A7A]">
              Whether you need help choosing a healthcare package, booking
              an appointment, understanding our services, or getting general
              assistance, feel free to contact BelleVie.
            </p>

          </div>

        </div>

      </div>


      {/* Location / Office */}

      <div
        className="
          mt-8
          rounded-3xl
          border
          border-[#EEEEEE]
          bg-[#F8FAFC]
          p-7
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-[#2F6FED]
              shadow-sm
            "
          >
            <MapPin size={24} />
          </div>

          <div>

            <h3 className="text-xl font-bold text-[#212121]">
              BelleVie
            </h3>

            <p className="mt-1 text-sm text-[#7A7A7A]">
              Healthcare support and guidance
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContactUs;