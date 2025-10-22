import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

// src/components/Navbar.tsx

const navItems = [
  { to: "/", label: "Home" },
  { to: "/favorite", label: "Favorite" },
  { to: "/wheel", label: "Lucifer" },
  { to: "/about", label: "About" },
];

const dropdownItems = [
  { to: "/favorite", label: "Favorite" },
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
        className="bg-gradient-to-r from-[#0f0f1e] via-[#1a1a2e] to-[#16213e] shadow-2xl border-b border-[#00fff2]/10"
      >
        <div className="flex justify-between items-center py-5 px-8 container mx-auto">
          <div className="font-bold text-3xl text-[#00fff2] tracking-wider drop-shadow-[0_0_10px_rgba(0,255,242,0.5)] hover:drop-shadow-[0_0_15px_rgba(0,255,242,0.8)] transition-all duration-300 cursor-pointer">
        MyApp
          </div>

          <ul className="flex items-center space-x-12">
        {navItems.map((item) => (
          <li key={item.to} className="text-lg font-semibold">
            <NavLink
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `relative pb-2 transition-all duration-300 
            after:content-['']            
            after:absolute               
            after:bottom-0 after:left-0   
            after:h-[3px]                   
            after:w-full                 
            after:bg-gradient-to-r after:from-[#00fff2] after:to-[#00d4ff]
            after:rounded-full
            after:origin-center           
            after:transition-transform    
            after:duration-300
            after:shadow-[0_0_8px_rgba(0,255,242,0.6)]
            ${
              isActive
            ? "text-[#00fff2] after:scale-x-100 drop-shadow-[0_0_8px_rgba(0,255,242,0.4)]"
            : "text-[#e0e0e0] after:scale-x-0 hover:text-[#00fff2] hover:after:scale-x-100 hover:drop-shadow-[0_0_8px_rgba(0,255,242,0.3)]"
            }`
          }
            >
          {item.label}
            </NavLink>
          </li>
        ))}
          </ul>

          <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-[#00fff2] focus:ring-offset-2 focus:ring-offset-[#1a1a2e] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,242,0.4)]"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <img
            src="/images/profile.png"
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover border-2 border-[#00fff2]/50 shadow-lg hover:border-[#00fff2] transition-all duration-300"
          />
        </button>
        <div
          className={`
            absolute right-0 mt-3 w-52 origin-top-right 
            rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-2 shadow-2xl 
            ring-1 ring-[#00fff2]/30 backdrop-blur-sm
            z-50
            transition-all duration-200 ease-out 
            ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }
          `}
          role="menu"
          aria-orientation="vertical"
        >
          {dropdownItems.map((item) => (
            <Link
          key={item.to}
          to={item.to}
          className="block px-5 py-3 text-base text-[#e0e0e0] hover:bg-[#00fff2]/15 hover:text-[#00fff2] transition-all duration-200 rounded-lg mx-2 hover:translate-x-1"
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

