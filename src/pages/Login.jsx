
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!phoneNumber.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // LOGIN DATA
      // ==========================================

      const loginData = {
        phone_number: phoneNumber,
        password: password,
      };

      // ==========================================
      // LOGIN API
      // ==========================================

      const response = await loginUser(loginData);

      console.log("LOGIN SUCCESS:", response);

      // ==========================================
      // CHECK ACCESS TOKEN
      // ==========================================

      if (!response?.access) {
        setError(
          "Login failed. Access token was not received."
        );
        return;
      }

      // ==========================================
      // SAVE ACCESS TOKEN
      // ==========================================

      localStorage.setItem(
        "accessToken",
        response.access
      );

      // ==========================================
      // SAVE REFRESH TOKEN
      // ==========================================

      if (response.refresh) {
        localStorage.setItem(
          "refreshToken",
          response.refresh
        );
      }

      // ==========================================
      // SAVE USER
      // ==========================================

      if (response.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      }

      // ==========================================
      // LOGIN STATUS
      // ==========================================

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      console.log(
        "Logged in user:",
        response.user
      );

      // ==========================================
      // REDIRECT AFTER LOGIN
      // ==========================================

      /*
        If user came from a doctor card:

        /login

        state:
        {
          redirectTo:
            "/popular-service/doctor/5"
        }

        Then after login:

        /popular-service/doctor/5

        If there is no redirectTo,
        user will go to home page.
      */

      const redirectTo =
        location.state?.redirectTo || "/";

      navigate(redirectTo, {
        replace: true,
      });

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      // ==========================================
      // BACKEND ERROR
      // ==========================================

      if (error.response?.data) {
        const backendError = error.response.data;

        // Backend returned string
        if (typeof backendError === "string") {
          setError(backendError);
        }

        // detail
        else if (backendError.detail) {
          setError(backendError.detail);
        }

        // message
        else if (backendError.message) {
          setError(backendError.message);
        }

        // phone number validation error
        else if (backendError.phone_number) {
          setError(
            Array.isArray(
              backendError.phone_number
            )
              ? backendError.phone_number[0]
              : backendError.phone_number
          );
        }

        // Unknown backend error
        else {
          setError(
            "Login failed. Please check your phone number and password."
          );
        }
      }

      // ==========================================
      // CONNECTION ERROR
      // ==========================================

      else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        flex
        min-h-[calc(100vh-5rem)]
        w-full
        items-center
        justify-center
        px-4
        py-10
      "
    >

      <div className="w-full max-w-md">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8 text-center">

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <LogIn size={30} />
          </div>

          <h1
            className="
              mt-5
              text-3xl
              font-extrabold
              text-[#212121]
            "
          >
            Welcome Back
          </h1>

          <p
            className="
              mt-2
              text-[#7A7A7A]
            "
          >
            Login to your Bellevie Global Health account
          </p>

        </div>

        {/* ==========================================
            LOGIN CARD
        ========================================== */}

        <div
          className="
            rounded-3xl
            border
            border-[#EEEEEE]
            bg-white
            p-7
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            md:p-8
          "
        >

          <form onSubmit={handleSubmit}>

            {/* ==========================================
                ERROR
            ========================================== */}

            {error && (
              <div
                className="
                  mb-5
                  rounded-xl
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* ==========================================
                PHONE NUMBER
            ========================================== */}

            <div className="mb-5">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={19}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#7A7A7A]
                  "
                />

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value
                    )
                  }
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:ring-2
                    focus:ring-[#2F6FED]/10
                  "
                />

              </div>

            </div>

            {/* ==========================================
                PASSWORD
            ========================================== */}

            <div className="mb-3">

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#212121]
                "
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#7A7A7A]
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-white
                    py-3
                    pl-11
                    pr-12
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:ring-2
                    focus:ring-[#2F6FED]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#7A7A7A]
                    transition
                    hover:text-[#2F6FED]
                  "
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* ==========================================
                FORGOT PASSWORD
            ========================================== */}

            <div className="mb-6 text-right">

              <button
                type="button"
                className="
                  text-sm
                  font-semibold
                  text-[#2F6FED]
                  hover:underline
                "
              >
                Forgot Password?
              </button>

            </div>

            {/* ==========================================
                LOGIN BUTTON
            ========================================== */}

            <button
              type="submit"
              disabled={loading}
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
                font-semibold
                text-white
                transition
                hover:bg-[#2459C7]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading ? (
                "Logging in..."
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}

            </button>

          </form>

          {/* ==========================================
              REGISTER
          ========================================== */}

          <div
            className="
              mt-6
              border-t
              border-[#EEEEEE]
              pt-6
              text-center
            "
          >

            <p className="text-sm text-[#7A7A7A]">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="
                mt-2
                inline-block
                text-sm
                font-bold
                text-[#2F6FED]
                hover:underline
              "
            >
              Create an account
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;
