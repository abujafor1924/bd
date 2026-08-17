import HeroSlider from "../components/HeroSlider";
import HealthSaverCards from "../components/HealthSaverCards";
import PopularServices from "../components/PopularServices";
import GeneralPhysicianSlider from "../components/GeneralPhysicianSlider";
import SpecialistDoctors from "../components/SpecialistDoctors";
import ForeignTreatmentCards from "../components/ForeignTreatmentCards";
import SliderTwo from "../components/SliderTwo";
import SocialMediaServices from "../components/SocialMediaServices";
import DiscountPartners from "../components/DiscountPartners";
import SubscriptionPackages from "../components/SubscriptionPackages";
import MedicalAccessories from "../components/MedicalAccessories";

function Home() {
  return (
    <div className="w-full">
      {/* ==============================
          HERO
      ============================== */}

      <section className="mb-10">
        <HeroSlider />
      </section>

      {/* ==============================
          HEALTH SAVER
      ============================== */}

      <section className="mb-10">
        <HealthSaverCards />
      </section>

      {/* ==============================
          POPULAR SERVICES
      ============================== */}

      <section className="mb-10">
        <PopularServices />
      </section>

      {/* ==============================
          GENERAL PHYSICIANS
      ============================== */}

      <section className="mb-10">
        <GeneralPhysicianSlider />
      </section>

      {/* ==============================
          SPECIALIST DOCTORS
      ============================== */}

      <section className="mb-10">
        <SpecialistDoctors />
      </section>

      {/* ==============================
          FOREIGN TREATMENT
      ============================== */}

      <section className="mb-10">
        <ForeignTreatmentCards />
      </section>

      {/* ==============================
          SECOND SLIDER
      ============================== */}

      <section className="mb-10">
        <SliderTwo />
      </section>

      {/* ==============================
          SOCIAL MEDIA SERVICES
      ============================== */}

      <section className="mb-10">
        <SocialMediaServices />
      </section>

      {/* ==============================
          DISCOUNT PARTNERS
      ============================== */}

      <section className="mb-10">
        <DiscountPartners />
      </section>

      {/* ==============================
          SUBSCRIPTION PACKAGES
      ============================== */}

      <section className="mb-10">
        <SubscriptionPackages />
      </section>

      {/* ==============================
          MEDICAL ACCESSORIES
      ============================== */}

      <section className="pb-6">
        <MedicalAccessories />
      </section>
    </div>
  );
}

export default Home;