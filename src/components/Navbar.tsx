import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

// src/components/Navbar.tsx

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

const dropdownItems = [
  { to: "/cart", label: "Cart" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav
        aria-label="Main navigation"
        className="bg-gradient-to-r from-[#F5EFD6]/40 to-[#ffec9f]/40"
      >
        <div className="flex justify-between items-center py-4 container mx-auto">
          <div className="font-bold text-2xl">MyApp</div>

          <ul className="flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.to} className="text-xl font-semibold">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative pb-1.5 transition-colors duration-200 
                        after:content-['']            
                        after:absolute               
                        after:bottom-0 after:left-0   
                        after:h-0.5                   
                        after:w-full                 
                        after:bg-[#00fff2]        
                        after:origin-center           
                        after:transition-transform    
                        after:duration-300          
                            ${
                              isActive
                                ? "text-[#00fff2] after:scale-x-100"
                                : "text-[#ccd9eb] after:scale-x-0 hover:text-[#00fff2] hover:after:scale-x-100"
                            }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 6. นี่คือส่วน Dropdown ที่อัปเดตแล้ว */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#00fff2] focus:ring-offset-2"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <img
                src="/src/images/profile.png"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </button>
            <div
              className={`
                absolute right-0 mt-2 w-48 origin-top-right 
                rounded-md bg-white py-1 shadow-xl 
                ring-1 ring-black ring-opacity-5 focus:outline-none
                z-50
                transition-all duration-150 ease-out 
                ${
                  isOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }
              `}
              role="menu"
              aria-orientation="vertical"
            >
                {dropdownItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
        </div>
      </nav>
    </header>
  );
}

