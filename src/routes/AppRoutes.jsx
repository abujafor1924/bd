import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import SliderDetails from "../pages/SliderDetails";

import HealthSaverDetails from "../pages/HealthSaverDetails";
import FreemiumDetails from "../pages/FreemiumDetails";
import PremiumDetails from "../pages/PremiumDetails";
import PremiumPackageDetails from "../pages/PremiumPackageDetails";
import ProbashiDetails from "../pages/ProbashiDetails";

import PopularSubCategories from "../pages/PopularSubCategories";
import PopularDoctors from "../pages/PopularDoctors";
import PopularDoctorDetails from "../pages/PopularDoctorDetails";

import EmergencyService from "../pages/EmergencyService";
import ContactUs from "../pages/ContactUs";

import BookAppointment from "../pages/BookAppointment";

import ForeignTreatment from "../pages/ForeignTreatment";
import ForeignTreatmentHospitals from "../pages/ForeignTreatmentHospitals";
import ForeignHospitalDetails from "../pages/ForeignHospitalDetails";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Profile from "../pages/Profile";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";

import SocialMediaServiceDetails from "../pages/SocialMediaServiceDetails";
import DiscountPartnerDetails from "../pages/DiscountPartnerDetails";
import SubscriptionPackageDetails from "../pages/SubscriptionPackageDetails";
import MedicalAccessoriesDetails from "../pages/MedicalAccessoriesDetails";

import DoctorAppointment from "../pages/DoctorAppointment";
import AppointmentPayment from "../pages/AppointmentPayment";

import MyAppointments from "../pages/MyAppointments";
import VideoConsultation from "../pages/VideoConsultation";
import VideoCall from "../pages/VideoCall";

import MedicalRecord from "../pages/MedicalRecord";
import MedicalRecords from "../pages/MedicalRecords";


import Notification from "../pages/Notification";
import DoctorFollowups from "../pages/DoctorFollowups";
import FreemiumServices from "../pages/FreemiumServices";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            HOME
        ===================================== */}

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* =====================================
            SLIDER
        ===================================== */}

        <Route
          path="/slider/:id"
          element={
            <MainLayout>
              <SliderDetails />
            </MainLayout>
          }
        />

        {/* =====================================
            HEALTH SAVER
        ===================================== */}

        <Route
          path="/health-saver/:type"
          element={
            <MainLayout>
              <HealthSaverDetails />
            </MainLayout>
          }
        />

        <Route
          path="/health-saver/freemium"
          element={
            <MainLayout>
              <FreemiumServices />
            </MainLayout>
          }
        />

        <Route
          path="/health-saver/premium"
          element={
            <MainLayout>
              <PremiumDetails />
            </MainLayout>
          }
        />

        <Route
          path="/health-saver/premium/:slug"
          element={
            <MainLayout>
              <PremiumPackageDetails />
            </MainLayout>
          }
        />

        <Route
          path="/health-saver/probashi"
          element={
            <MainLayout>
              <ProbashiDetails />
            </MainLayout>
          }
        />

        {/* =====================================
            POPULAR SERVICE
        ===================================== */}

        <Route
          path="/popular-service/:categoryId"
          element={
            <MainLayout>
              <PopularSubCategories />
            </MainLayout>
          }
        />

        <Route
          path="/popular-service/subcategory/:subcategoryId"
          element={
            <MainLayout>
              <PopularDoctors />
            </MainLayout>
          }
        />

        <Route
          path="/popular-service/doctor/:id"
          element={
            <MainLayout>
              <PopularDoctorDetails />
            </MainLayout>
          }
        />

        {/* =====================================
            EMERGENCY
        ===================================== */}

        <Route
          path="/emergency-service"
          element={
            <MainLayout>
              <EmergencyService />
            </MainLayout>
          }
        />

        {/* =====================================
            CONTACT
        ===================================== */}

        <Route
          path="/contact-us"
          element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          }
        />

        {/* =====================================
            BOOK APPOINTMENT
        ===================================== */}

        <Route
          path="/book-appointment"
          element={
            <MainLayout>
              <BookAppointment />
            </MainLayout>
          }
        />

        {/* =====================================
            FOREIGN TREATMENT
        ===================================== */}

        <Route
          path="/foreign-treatment"
          element={
            <MainLayout>
              <ForeignTreatment />
            </MainLayout>
          }
        />

        <Route
          path="/foreign-treatment/country/:id"
          element={
            <MainLayout>
              <ForeignTreatmentHospitals />
            </MainLayout>
          }
        />

        <Route
          path="/book-appointment/foreign-hospital/:hospitalId"
          element={
            <MainLayout>
              <ForeignHospitalDetails />
            </MainLayout>
          }
        />

        {/* =====================================
            AUTH
            No Navbar / Sidebar
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =====================================
            PROFILE
        ===================================== */}

        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        {/* =====================================
            TERMS
        ===================================== */}

        <Route
          path="/terms-conditions"
          element={
            <MainLayout>
              <TermsConditions />
            </MainLayout>
          }
        />

        {/* =====================================
            PRIVACY
        ===================================== */}

        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />

        {/* =====================================
            OTHER SERVICES
        ===================================== */}

        <Route
          path="/social-media-services/:id"
          element={
            <MainLayout>
              <SocialMediaServiceDetails />
            </MainLayout>
          }
        />

        <Route
          path="/discount-partner/:id"
          element={
            <MainLayout>
              <DiscountPartnerDetails />
            </MainLayout>
          }
        />

        <Route
          path="/subscription-package/:id"
          element={
            <MainLayout>
              <SubscriptionPackageDetails />
            </MainLayout>
          }
        />

        <Route
          path="/medical-accessories/:id"
          element={
            <MainLayout>
              <MedicalAccessoriesDetails />
            </MainLayout>
          }
        />

        {/* =====================================
            DOCTOR APPOINTMENT
        ===================================== */}

        <Route
          path="/doctor-appointment/:doctorId"
          element={
            <MainLayout>
              <DoctorAppointment />
            </MainLayout>
          }
        />

        {/* =====================================
            APPOINTMENT PAYMENT
        ===================================== */}

        <Route
          path="/payment/:id"
          element={
            <MainLayout>
              <AppointmentPayment />
            </MainLayout>
          }
        />

        {/* =====================================
            MY APPOINTMENTS
        ===================================== */}

        <Route
          path="/my-appointments"
          element={
            <MainLayout>
              <MyAppointments />
            </MainLayout>
          }
        />

        {/* =====================================
            VIDEO CONSULTATION
        ===================================== */}

        <Route
          path="/video-consultation"
          element={
            <MainLayout>
              <VideoConsultation />
            </MainLayout>
          }
        />

        {/* =====================================
            MEDICAL RECORD
        ===================================== */}

        {/* Upload Medical Record */}
        <Route
          path="/medical-record"
          element={
            <MainLayout>
              <MedicalRecord />
            </MainLayout>
          }
        />

        {/* Medical Records List */}
        <Route
          path="/medical-records"
          element={
            <MainLayout>
              <MedicalRecords />
            </MainLayout>
          }
        />


      
        <Route
          path="/notifications"
          element={
            <MainLayout>
              <Notification />
            </MainLayout>
          }
        />

        
        <Route
          path="/doctor-followups"
          element={
            <MainLayout>
              <DoctorFollowups />
            </MainLayout>
          }
        />
        <Route
          path="/video-consultation/:roomId"
          element={
            <MainLayout>
              <VideoCall />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;