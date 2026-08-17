
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: "",
    name: "",
    email: "",
    district: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.phone_number ||
      !formData.name ||
      !formData.email ||
      !formData.district ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration failed:", error);

      const responseData = error?.response?.data;

      if (responseData) {
        if (typeof responseData === "string") {
          setError(responseData);
        } else if (responseData.detail) {
          setError(responseData.detail);
        } else {
          const firstError = Object.values(responseData)[0];

          if (Array.isArray(firstError)) {
            setError(firstError[0]);
          } else {
            setError(String(firstError));
          }
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
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
            <UserPlus size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#212121] md:text-4xl">
            Create Your Account
          </h1>

          <p className="mt-3 text-[#7A7A7A]">
            Register to access your healthcare services.
          </p>
        </div>

        {/* Card */}
        <div
          className="
            rounded-3xl
            bg-white
            p-6
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            md:p-8
          "
        >
          {/* Error */}
          {error && (
            <div
              className="
                mb-6
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              className="
                mb-6
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-4
                py-3
                text-sm
                text-green-600
              "
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#212121]">
                Full Name
              </label>

              <div className="relative">
                <User
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
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-[#FAFAFA]
                    py-3.5
                    pl-12
                    pr-4
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:bg-white
                  "
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#212121]">
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
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-[#FAFAFA]
                    py-3.5
                    pl-12
                    pr-4
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:bg-white
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#212121]">
                Email Address
              </label>

              <div className="relative">
                <Mail
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
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-[#FAFAFA]
                    py-3.5
                    pl-12
                    pr-4
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:bg-white
                  "
                />
              </div>
            </div>

            {/* District */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#212121]">
                District
              </label>

              <div className="relative">
                <MapPin
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
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter your district"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-[#FAFAFA]
                    py-3.5
                    pl-12
                    pr-4
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:bg-white
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#212121]">
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#EEEEEE]
                    bg-[#FAFAFA]
                    py-3.5
                    pl-12
                    pr-12
                    text-[#212121]
                    outline-none
                    transition
                    focus:border-[#2F6FED]
                    focus:bg-white
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-[#2F6FED]
                py-3.5
                font-semibold
                text-white
                shadow-md
                transition
                duration-300
                hover:bg-[#2459C7]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 text-center text-sm text-[#7A7A7A]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#2F6FED] hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;