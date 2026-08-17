
import { useState } from "react";

import {
  Ambulance,
  Plane,
  HeartPulse,
  ArrowRight,
  Phone,
  Clock3,
  Zap,
  X,
} from "lucide-react";

function EmergencyService() {
  const [selectedService, setSelectedService] = useState(null);

  const emergencyServices = [
    {
      id: 1,
      title: "Ambulance",
      description:
        "Basic emergency transport with rapid dispatch and professional patient support.",
      icon: Ambulance,
      phones: [
        "+01805464400",
        "+8801805464392",
        "+8801805464391",
      ],
      features: [
        "Fast emergency response",
        "Professional patient transport",
        "24/7 availability",
      ],
    },

    {
      id: 2,
      title: "Air Ambulance",
      description:
        "Fast and reliable air transportation for patients who need urgent medical transfer.",
      icon: Plane,
      phones: [
        "+01805464400",
        "+8801805464392",
        "+8801805464391",
      ],
      features: [
        "Rapid long-distance transfer",
        "Medical support during transport",
        "Emergency coordination",
      ],
    },

    {
      id: 3,
      title: "ICU Ambulance",
      description:
        "Advanced ambulance service equipped for patients who require critical care during transportation.",
      icon: HeartPulse,
      phones: [
        "+01805464400",
        "+8801805464392",
        "+8801805464391",
      ],
      features: [
        "Critical care support",
        "Emergency medical equipment",
        "Professional medical assistance",
      ],
    },

    {
      id: 4,
      title: "Patient Transfer",
      description:
        "Safe and comfortable transportation for patients moving between hospitals, clinics, or home.",
      icon: Ambulance,
      phones: [
        "+01805464400",
        "+8801805464392",
        "+8801805464391",
      ],
      features: [
        "Hospital-to-hospital transfer",
        "Home-to-hospital transfer",
        "Safe patient transportation",
      ],
    },
  ];

  return (
    <section className="pb-12">

      {/* Hero Section */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2F6FED] to-[#4BA3FF] p-8 shadow-[0_8px_30px_rgba(47,111,237,0.18)] md:p-12">

        <div className="relative z-10 max-w-3xl">

          <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            Emergency Support
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Emergency Service
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            Choose the right emergency transport service when every minute
            matters. Our emergency transportation services are designed to
            provide fast, safe, and reliable patient support.
          </p>

        </div>

        {/* Decorative Circles */}

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-white/10" />

      </div>


      {/* Quick Information */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Fast Response */}

        <div className="rounded-3xl border border-white/50 bg-gradient-to-r from-[#BEE9FF] to-[#DFF8EF] p-6 shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.08)]">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#2F6FED] shadow">

              <Zap size={28} />

            </div>

            <div>

              <h2 className="text-xl font-bold text-[#212121]">
                Fast Response
              </h2>

              <p className="mt-1 text-sm text-[#7A7A7A]">
                Rapid dispatch when you need emergency transportation.
              </p>

            </div>

          </div>

        </div>


        {/* 24/7 */}

        <div className="rounded-3xl border border-white/50 bg-gradient-to-r from-[#DFF8EF] to-[#BEE9FF] p-6 shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.08)]">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#2F6FED] shadow">

              <Clock3 size={28} />

            </div>

            <div>

              <h2 className="text-xl font-bold text-[#212121]">
                24/7
              </h2>

              <p className="mt-1 text-sm text-[#7A7A7A]">
                Emergency transportation support available around the clock.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Available Services */}

      <div className="mt-14">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-[#212121]">
            Available Services
          </h2>

          <p className="mt-2 text-[#7A7A7A]">
            Select an emergency transport service to view more information.
          </p>

        </div>


        {/* Service Cards */}

        <div className="grid gap-6 md:grid-cols-2">

          {emergencyServices.map((service) => {

            const Icon = service.icon;

            return (

              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className="
                  group
                  w-full
                  rounded-3xl
                  border
                  border-white/50
                  bg-gradient-to-r
                  from-[#BEE9FF]
                  to-[#DFF8EF]
                  p-6
                  text-left
                  shadow-[-3px_-3px_6px_rgba(255,255,255,0.6),3px_4px_8px_rgba(0,0,0,0.10)]
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2F6FED] shadow">

                    <Icon size={30} />

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2F6FED] shadow transition group-hover:translate-x-1">

                    <ArrowRight size={20} />

                  </div>

                </div>


                <h3 className="mt-6 text-2xl font-bold text-[#212121]">
                  {service.title}
                </h3>


                <p className="mt-3 leading-7 text-[#7A7A7A]">
                  {service.description}
                </p>


                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#2F6FED]">

                  <Phone size={17} />

                  <span>
                    3 Emergency Contact Numbers
                  </span>

                </div>

              </button>

            );
          })}

        </div>

      </div>


      {/* Service Modal */}

      {selectedService && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D9F7E8] text-[#2F6FED]">

                  {(() => {
                    const Icon = selectedService.icon;

                    return <Icon size={28} />;
                  })()}

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-[#212121]">
                    {selectedService.title}
                  </h2>

                  <p className="mt-1 text-sm text-[#7A7A7A]">
                    Emergency Service
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-[#7A7A7A] transition hover:bg-[#EEEEEE]"
              >

                <X size={20} />

              </button>

            </div>


            {/* Description */}

            <p className="mt-6 leading-7 text-[#7A7A7A]">
              {selectedService.description}
            </p>


            {/* Features */}

            <div className="mt-6">

              <h3 className="text-lg font-bold text-[#212121]">
                Service Includes
              </h3>

              <div className="mt-4 space-y-3">

                {selectedService.features.map((feature, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3"
                  >

                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2F6FED]" />

                    <span className="text-sm text-[#212121]">
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Contact Numbers */}

            <div className="mt-6">

              <h3 className="text-lg font-bold text-[#212121]">
                Emergency Contact Numbers
              </h3>

              <div className="mt-4 space-y-3">

                {selectedService.phones.map((phoneNumber, index) => (

                  <a
                    key={index}
                    href={`tel:${phoneNumber}`}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#BEE9FF]
                      to-[#DFF8EF]
                      p-4
                      transition
                      hover:-translate-y-1
                      hover:shadow-md
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#2F6FED] shadow-sm">

                        <Phone size={20} />

                      </div>

                      <div>

                        <p className="text-xs font-medium text-[#7A7A7A]">
                          Contact {index + 1}
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#2F6FED]">
                          {phoneNumber}
                        </p>

                      </div>

                    </div>

                    <span className="rounded-xl bg-[#2F6FED] px-3 py-2 text-xs font-semibold text-white">
                      Call
                    </span>

                  </a>

                ))}

              </div>

            </div>


            {/* Close */}

            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="mt-6 w-full rounded-2xl bg-[#2F6FED] px-6 py-3 font-semibold text-white transition hover:bg-[#2459C7]"
            >

              Close

            </button>

          </div>

        </div>

      )}

    </section>
  );
}

export default EmergencyService;