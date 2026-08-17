import {
  Home,
  CalendarCheck,
  FileText,
  Bell,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, onToggle }) {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: Home,
      exact: true,
    },
    {
      label: "Appointments",
      path: "/my-appointments",
      icon: CalendarCheck,
    },
    {
      label: "Medical Records",
      path: "/medical-records",
      icon: FileText,
    },
    {
      label: "Follow-up Doctor",
      path: "/doctor-followups",
      icon: Stethoscope,
    },
    {
      label: "Notification",
      path: "/notifications",
      icon: Bell,
    },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }

    return (
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`)
    );
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-20
        z-40
        h-[calc(100vh-5rem)]
        border-r
        border-[#EEEEEE]
        bg-white
        transition-all
        duration-300
        ease-in-out
        ${isOpen ? "w-64" : "w-[68px]"}
      `}
    >
      {/* =================================
          TOGGLE BUTTON
      ================================= */}

      <button
        type="button"
        onClick={onToggle}
        aria-label={
          isOpen ? "Collapse sidebar" : "Expand sidebar"
        }
        className="
          absolute
          -right-3
          top-6
          z-50
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          border-[#EEEEEE]
          bg-white
          text-[#212121]
          shadow-[0_2px_8px_rgba(0,0,0,0.10)]
          transition-all
          duration-200
          hover:bg-[#D9F7E8]
          hover:text-[#2F6FED]
          hover:shadow-md
        "
      >
        {isOpen ? (
          <ChevronLeft size={16} />
        ) : (
          <ChevronRight size={16} />
        )}
      </button>

      {/* =================================
          MENU
      ================================= */}

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <Link
              key={item.path}
              to={item.path}
              title={!isOpen ? item.label : ""}
              className={`
                group
                relative
                flex
                items-center
                rounded-xl
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  isOpen
                    ? "gap-3 px-4"
                    : "justify-center px-2"
                }

                ${
                  active
                    ? "bg-[#D9F7E8] text-[#2F6FED] shadow-sm"
                    : "text-[#212121] hover:bg-[#F0FBF6] hover:text-[#2F6FED]"
                }
              `}
            >
              {/* Active Indicator */}

              {active && (
                <span
                  className="
                    absolute
                    left-0
                    h-8
                    w-1
                    rounded-r-full
                    bg-[#2F6FED]
                  "
                />
              )}

              {/* Icon */}

              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 2}
                className="
                  shrink-0
                  transition-transform
                  duration-200
                  group-hover:scale-105
                "
              />

              {/* Label */}

              {isOpen && (
                <span className="whitespace-nowrap">
                  {item.label}
                </span>
              )}

              {/* Notification Indicator */}

              {item.label === "Notification" && (
                <span
                  className={`
                    absolute
                    flex
                    h-2
                    w-2
                    rounded-full
                    bg-[#2F6FED]
                    ${
                      isOpen
                        ? "right-4 top-3"
                        : "right-2 top-2"
                    }
                  `}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;