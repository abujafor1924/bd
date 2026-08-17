import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen min-w-0 bg-[#F2F2F2]">
      {/* =================================
          NAVBAR
      ================================= */}

      <Navbar />

      {/* =================================
          SIDEBAR
      ================================= */}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
      />

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main
        className={`
          min-h-screen
          min-w-0
          overflow-x-hidden
          pt-20
          transition-all
          duration-300
          ease-in-out

          ${
            sidebarOpen
              ? "ml-64"
              : "ml-[68px]"
          }
        `}
      >
        <div
          className="
            mx-auto
            min-w-0
            w-full
            max-w-[1600px]
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
