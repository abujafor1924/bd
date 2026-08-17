import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  PhoneCall,
  CalendarPlus,
  ClipboardList,
  Contact,
  User,
  ChevronDown,
  LogOut,
  UserRound,
  Video,
  FileText,
  ShieldCheck,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";

import logo from "../assets/images/logo.png";
import { logoutUser } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // ==============================
  // LOGIN CHECK
  // ==============================

  const accessToken = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("user");

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid user data:", error);
    user = null;
  }

  // ==============================
  // ACTIVE NAVIGATION
  // ==============================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ==============================
  // ACCOUNT
  // ==============================

  const handleAccountClick = () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    setOpen((prev) => !prev);
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logoutUser();
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      setOpen(false);
      setMobileOpen(false);
      setLoggingOut(false);

      navigate("/login");
    }
  };

  // ==============================
  // CLOSE MOBILE
  // ==============================

  const handleMobileNavigation = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-[9999]
        w-full
        border-b
        border-[#EEEEEE]
        bg-white/95
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-20
          w-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ==============================
            LOGO
        ============================== */}

        <Link
          to="/"
          onClick={handleMobileNavigation}
          className="
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              p-1
              shadow-sm
            "
          >
            <img
              src={logo}
              alt="Bellevie Global Health"
              className="
                h-10
                w-10
                object-contain
              "
            />
          </div>

          <div className="hidden md:block">
            <h1
              className="
                text-lg
                font-extrabold
                leading-tight
                tracking-tight
                text-[#212121]
              "
            >
              Bellevie Global Health
            </h1>

            <p
              className="
                mt-0.5
                text-xs
                font-medium
                text-[#7A7A7A]
              "
            >
              Your Trusted Healthcare Partner
            </p>
          </div>
        </Link>

        {/* ==============================
            DESKTOP NAVIGATION
        ============================== */}

        <nav
          className="
            hidden
            items-center
            gap-1
            lg:flex
          "
        >
          {/* Emergency */}

          <Link
            to="/emergency-service"
            className={`
              group
              flex
              items-center
              gap-2
              rounded-xl
              px-3.5
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                isActive("/emergency-service")
                  ? `
                    bg-[#2F6FED]
                    text-white
                    shadow-[0_4px_12px_rgba(47,111,237,0.22)]
                  `
                  : `
                    text-[#212121]
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  `
              }
            `}
          >
            <PhoneCall
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>Emergency</span>
          </Link>

          {/* Book Appointment */}

          <Link
            to="/book-appointment"
            className={`
              group
              ml-1
              flex
              items-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                isActive("/book-appointment")
                  ? `
                    bg-[#2F6FED]
                    text-white
                    shadow-[0_4px_12px_rgba(47,111,237,0.22)]
                  `
                  : `
                    text-[#212121]
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  `
              }
            `}
          >
            <CalendarPlus
              size={18}
              className="transition-transform group-hover:rotate-6"
            />

            <span>Book Appointment</span>
          </Link>

          {/* My Appointment */}

          <Link
            to="/my-appointments"
            className={`
              group
              flex
              items-center
              gap-2
              rounded-xl
              px-3.5
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                isActive("/my-appointments")
                  ? `
                    bg-[#2F6FED]
                    text-white
                    shadow-[0_4px_12px_rgba(47,111,237,0.22)]
                  `
                  : `
                    text-[#212121]
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  `
              }
            `}
          >
            <ClipboardList
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>My Appointments</span>
          </Link>

          {/* Contact */}

          <Link
            to="/contact-us"
            className={`
              group
              flex
              items-center
              gap-2
              rounded-xl
              px-3.5
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                isActive("/contact-us")
                  ? `
                    bg-[#2F6FED]
                    text-white
                    shadow-[0_4px_12px_rgba(47,111,237,0.22)]
                  `
                  : `
                    text-[#212121]
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  `
              }
            `}
          >
            <Contact
              size={18}
              className="transition-transform group-hover:scale-110"
            />

            <span>Contact</span>
          </Link>
        </nav>

        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="flex items-center gap-2">
          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-[#EEEEEE]
              bg-white
              text-[#212121]
              transition
              hover:bg-[#D9F7E8]
              hover:text-[#2F6FED]
              lg:hidden
            "
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* ==============================
              ACCOUNT BUTTON
          ============================== */}

          <div className="relative">
            <button
              type="button"
              onClick={handleAccountClick}
              className="
                group
                flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-[#EEEEEE]
                bg-white
                px-2.5
                py-2
                text-sm
                font-semibold
                text-[#212121]
                shadow-sm
                transition-all
                duration-200
                hover:border-[#D9F7E8]
                hover:bg-[#F8FAFC]
                sm:px-3
              "
            >
              {/* Avatar */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#D9F7E8]
                  text-[#2F6FED]
                  transition
                  group-hover:bg-[#2F6FED]
                  group-hover:text-white
                "
              >
                <User size={18} />
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-[110px] truncate text-sm font-bold">
                  {user?.name || "Account"}
                </p>

                <p className="text-[10px] font-medium text-[#7A7A7A]">
                  {accessToken ? "My Account" : "Login"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`
                  text-[#7A7A7A]
                  transition-transform
                  duration-200
                  ${open ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* ==============================
                ACCOUNT DROPDOWN
            ============================== */}

            {open && accessToken && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-3
                  w-64
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#EEEEEE]
                  bg-white
                  p-2
                  shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                "
              >
                {/* User Header */}

                <div
                  className="
                    mb-2
                    rounded-xl
                    bg-[#F8FAFC]
                    px-4
                    py-3
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#D9F7E8]
                        text-[#2F6FED]
                      "
                    >
                      <User size={19} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-[#212121]
                        "
                      >
                        {user?.name || "User"}
                      </p>

                      <p
                        className="
                          mt-0.5
                          truncate
                          text-xs
                          text-[#7A7A7A]
                        "
                      >
                        {user?.phone_number || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile */}

                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <UserRound size={18} />

                  My Profile
                </Link>

                {/* Appointments */}

                <Link
                  to="/my-appointments"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <ClipboardList size={18} />

                  My Appointments
                </Link>

                {/* Medical Record */}

                <Link
                  to="/medical-record"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <FileText size={18} />

                  Medical Record
                </Link>

                {/* Video Consultation */}

                <Link
                  to="/video-consultation"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <Video size={18} />

                  Video Consultation
                </Link>

                {/* Follow-up Doctor */}

                <Link
                  to="/doctor-followups"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <Stethoscope size={18} />

                  Follow-up Doctor
                </Link>

                {/* Divider */}

                <div className="my-2 border-t border-[#EEEEEE]" />

                {/* Terms */}

                <Link
                  to="/terms-conditions"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <ShieldCheck size={18} />

                  Terms & Conditions
                </Link>

                {/* Privacy */}

                <Link
                  to="/privacy-policy"
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-[#212121]
                    transition
                    hover:bg-[#D9F7E8]
                    hover:text-[#2F6FED]
                  "
                >
                  <ShieldCheck size={18} />

                  Privacy Policy
                </Link>

                {/* Divider */}

                <div className="my-2 border-t border-[#EEEEEE]" />

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-50
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <LogOut size={18} />

                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==============================
          MOBILE NAVIGATION
      ============================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-[#EEEEEE]
            bg-white
            px-4
            py-4
            shadow-lg
            lg:hidden
          "
        >
          <nav className="space-y-2">

            {/* Emergency */}

            <Link
              to="/emergency-service"
              onClick={handleMobileNavigation}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                transition

                ${
                  isActive("/emergency-service")
                    ? "bg-[#2F6FED] text-white"
                    : "text-[#212121] hover:bg-[#D9F7E8] hover:text-[#2F6FED]"
                }
              `}
            >
              <PhoneCall size={19} />

              Emergency Service
            </Link>

            {/* Book Appointment */}

            <Link
              to="/book-appointment"
              onClick={handleMobileNavigation}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                transition

                ${
                  isActive("/book-appointment")
                    ? "bg-[#2F6FED] text-white"
                    : "text-[#212121] hover:bg-[#D9F7E8] hover:text-[#2F6FED]"
                }
              `}
            >
              <CalendarPlus size={19} />

              Book Appointment
            </Link>

            {/* My Appointments */}

            <Link
              to="/my-appointments"
              onClick={handleMobileNavigation}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                transition

                ${
                  isActive("/my-appointments")
                    ? "bg-[#2F6FED] text-white"
                    : "text-[#212121] hover:bg-[#D9F7E8] hover:text-[#2F6FED]"
                }
              `}
            >
              <ClipboardList size={19} />

              My Appointments
            </Link>

            {/* Contact */}

            <Link
              to="/contact-us"
              onClick={handleMobileNavigation}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-semibold
                transition

                ${
                  isActive("/contact-us")
                    ? "bg-[#2F6FED] text-white"
                    : "text-[#212121] hover:bg-[#D9F7E8] hover:text-[#2F6FED]"
                }
              `}
            >
              <Contact size={19} />

              Contact Us
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;