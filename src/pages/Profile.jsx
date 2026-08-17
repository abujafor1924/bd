import { useEffect, useState } from "react";

import {
  User,
  Phone,
  Mail,
  MapPin,
  Camera,
  Save,
  LoaderCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
} from "../services/authService";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==============================
  // LOAD PROFILE
  // ==============================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProfile();

        setProfile(data);

        setName(data.name || "");
        setEmail(data.email || "");
        setDistrict(data.district || "");

        if (data.profile_picture) {
          setPreview(data.profile_picture);
        }
      } catch (error) {
        console.log("Profile error:", error);

        setError(
          error.response?.data?.detail ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==============================
  // IMAGE SELECT
  // ==============================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
    setSuccess("");
    setError("");
  };

  // ==============================
  // UPDATE PROFILE
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const data = {
        name,
        email,
        district,
        profile_picture: profilePicture,
      };

      const response = await updateProfile(data);

      setProfile(response);

      setName(response.name || "");
      setEmail(response.email || "");
      setDistrict(response.district || "");

      if (response.profile_picture) {
        setPreview(response.profile_picture);
      }

      setProfilePicture(null);

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.log("Update profile error:", error);

      const backendError = error.response?.data;

      if (backendError?.detail) {
        setError(backendError.detail);
      } else if (typeof backendError === "object") {
        const firstError = Object.values(backendError)?.[0];

        setError(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError || "Profile update failed."
        );
      } else {
        setError("Profile update failed.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <section className="w-full pb-12">
        <div className="mb-8">
          <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-72 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="h-80 animate-pulse rounded-[28px] bg-gray-200" />

          <div className="h-[600px] animate-pulse rounded-[28px] bg-gray-200" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-w-0 pb-12">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8">
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
            font-bold
            text-[#2F6FED]
          "
        >
          <User size={17} />
          My Profile
        </div>

        <h1
          className="
            mt-4
            text-3xl
            font-extrabold
            tracking-tight
            text-[#212121]
            md:text-4xl
          "
        >
          Profile Settings
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A7A7A] md:text-base">
          Manage your personal information, profile picture, and account
          details from one place.
        </p>
      </div>

      {/* ==============================
          MAIN GRID
      ============================== */}

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

        {/* ==============================
            PROFILE SUMMARY
        ============================== */}

        <aside
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/60
            bg-gradient-to-br
            from-[#BEE9FF]
            to-[#DFF8EF]
            p-6
            shadow-[
              -3px_-3px_8px_rgba(255,255,255,0.7),
              4px_6px_18px_rgba(0,0,0,0.08)
            ]
          "
        >
          {/* Decorative circles */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-white/30
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-16
              h-40
              w-40
              rounded-full
              bg-white/25
            "
          />

          <div className="relative">

            {/* Avatar */}

            <div className="flex justify-center">
              <div className="relative">

                <div
                  className="
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-[5px]
                    border-white
                    bg-[#D9F7E8]
                    shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  "
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={52}
                      className="text-[#2F6FED]"
                    />
                  )}
                </div>

                {/* Camera */}

                <label
                  className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    h-11
                    w-11
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-white
                    bg-[#2F6FED]
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-[#2459C7]
                  "
                >
                  <Camera size={18} />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Name */}

            <div className="mt-5 text-center">
              <h2 className="text-xl font-extrabold text-[#212121]">
                {profile?.name || name || "User"}
              </h2>

              <p className="mt-1 break-all text-sm text-[#7A7A7A]">
                {profile?.email || email || "No email added"}
              </p>
            </div>

            {/* Status */}

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                rounded-2xl
                bg-white/65
                p-4
                shadow-sm
                backdrop-blur-sm
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  min-w-[40px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#D9F7E8]
                  text-[#2F6FED]
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#212121]">
                  Account Profile
                </p>

                <p className="mt-0.5 text-xs text-[#7A7A7A]">
                  Keep your information updated
                </p>
              </div>
            </div>

            {/* Photo Hint */}

            <div className="mt-5 flex items-start gap-2">
              <Camera
                size={15}
                className="mt-0.5 min-w-[15px] text-[#2F6FED]"
              />

              <p className="text-xs leading-5 text-[#7A7A7A]">
                Click the camera button to upload or change your profile
                photo.
              </p>
            </div>
          </div>
        </aside>

        {/* ==============================
            PROFILE FORM
        ============================== */}

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border
            border-[#EEEEEE]
            bg-white
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          "
        >

          {/* Form Header */}

          <div
            className="
              border-b
              border-[#EEEEEE]
              bg-gradient-to-r
              from-[#F8FCFF]
              to-[#F7FFFB]
              px-6
              py-6
              md:px-8
            "
          >
            <h2 className="text-xl font-extrabold text-[#212121]">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-[#7A7A7A]">
              Update the information associated with your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
          >

            {/* ==============================
                ALERTS
            ============================== */}

            {success && (
              <div
                className="
                  mb-6
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-green-100
                  bg-green-50
                  px-4
                  py-3
                  text-sm
                  text-green-700
                "
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 min-w-[19px]"
                />

                <span>{success}</span>
              </div>
            )}

            {error && (
              <div
                className="
                  mb-6
                  rounded-2xl
                  border
                  border-red-100
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {/* ==============================
                PHONE
            ============================== */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-[#212121]
                "
              >
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={18}
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
                  value={profile?.phone_number || ""}
                  disabled
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#EEEEEE]
                    bg-[#F8FAFC]
                    py-3.5
                    pl-11
                    pr-4
                    text-sm
                    text-[#7A7A7A]
                    outline-none
                    cursor-not-allowed
                  "
                />
              </div>

              <p className="mt-1.5 text-xs text-[#7A7A7A]">
                Phone number cannot be changed.
              </p>
            </div>

            {/* ==============================
                NAME + EMAIL
            ============================== */}

            <div className="grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-[#212121]
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#EEEEEE]
                      bg-white
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      text-[#212121]
                      outline-none
                      transition-all
                      placeholder:text-[#A0A0A0]
                      focus:border-[#2F6FED]
                      focus:ring-4
                      focus:ring-[#2F6FED]/10
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-bold
                    text-[#212121]
                  "
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[#EEEEEE]
                      bg-white
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      text-[#212121]
                      outline-none
                      transition-all
                      placeholder:text-[#A0A0A0]
                      focus:border-[#2F6FED]
                      focus:ring-4
                      focus:ring-[#2F6FED]/10
                    "
                  />
                </div>
              </div>
            </div>

            {/* ==============================
                DISTRICT
            ============================== */}

            <div className="mt-5">
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-[#212121]
                "
              >
                District
              </label>

              <div className="relative">
                <MapPin
                  size={18}
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
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Enter your district"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#EEEEEE]
                    bg-white
                    py-3.5
                    pl-11
                    pr-4
                    text-sm
                    text-[#212121]
                    outline-none
                    transition-all
                    placeholder:text-[#A0A0A0]
                    focus:border-[#2F6FED]
                    focus:ring-4
                    focus:ring-[#2F6FED]/10
                  "
                />
              </div>
            </div>

            {/* ==============================
                DIVIDER
            ============================== */}

            <div className="my-7 h-px bg-[#EEEEEE]" />

            {/* ==============================
                SAVE
            ============================== */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs leading-5 text-[#7A7A7A]">
                Your updated information will be saved to your profile.
              </p>

              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex
                  min-w-[170px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[#2F6FED]
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_6px_18px_rgba(47,111,237,0.20)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#2459C7]
                  hover:shadow-[0_8px_22px_rgba(47,111,237,0.25)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {saving ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
