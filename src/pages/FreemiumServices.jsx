import hospitalDiscounts from "../assets/health-icons/hospital_discounts.png";
import discountOnDiagnostics from "../assets/health-icons/discount_on_diagnostics.png";
import freeConsultancy from "../assets/health-icons/free_consultancy.png";
import otherDiscountServices from "../assets/health-icons/other_discount_services.png";

const services = [
  {
    id: 1,
    title: "Hospital",
    icon: hospitalDiscounts,
  },
  {
    id: 2,
    title: "Discount on Diagnostics",
    icon: discountOnDiagnostics,
  },
  {
    id: 3,
    title: "Free Consultancy",
    icon: freeConsultancy,
  },
  {
    id: 4,
    title: "Other Discount Services",
    icon: otherDiscountServices,
  },
];

function FreemiumServices() {
  return (
    <section className="mt-10 pb-10">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#212121]">
          Freemium Package
        </h2>

        <p className="mt-2 text-[#7A7A7A]">
          Healthcare benefits included in this package
        </p>
      </div>

      {/* ==============================
          SERVICE CARDS
      ============================== */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {services.map((item) => (
          <div
            key={item.id}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/60
              bg-gradient-to-br
              from-[#BEE9FF]
              to-[#DFF8EF]
              p-6
              shadow-[-4px_-4px_8px_rgba(255,255,255,0.7),4px_6px_12px_rgba(0,0,0,0.10)]
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),6px_10px_18px_rgba(0,0,0,0.14)]
            "
          >

            {/* Soft background decoration */}

            <div
              className="
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-white/30
                transition-transform
                duration-500
                group-hover:scale-150
              "
            />

            {/* ==============================
                ICON
            ============================== */}

            <div
              className="
                relative
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                bg-white
                shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:rotate-1
              "
            >
              <img
                src={item.icon}
                alt={item.title}
                className="
                  h-12
                  w-12
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />
            </div>

            {/* ==============================
                TITLE
            ============================== */}

            <h3
              className="
                relative
                mt-5
                min-h-[56px]
                text-lg
                font-bold
                leading-7
                text-[#212121]
              "
            >
              {item.title}
            </h3>

            {/* Small bottom accent */}

            <div
              className="
                mt-4
                h-1
                w-10
                rounded-full
                bg-[#2F6FED]
                transition-all
                duration-300
                group-hover:w-16
              "
            />

          </div>
        ))}

      </div>
    </section>
  );
}

export default FreemiumServices;