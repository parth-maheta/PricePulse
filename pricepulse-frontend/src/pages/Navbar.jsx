import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollLinkClass =
    "cursor-pointer text-indigo-700 hover:text-purple-700 font-medium px-3 py-2 transition-colors";

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold text-indigo-700 cursor-pointer flex items-center gap-1"
        >
          <img src={logo} alt="PricePulse Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-indigo-700 select-none">
            PricePulse
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <ScrollLink
            to="how-it-works"
            smooth
            duration={500}
            offset={-80}
            className={scrollLinkClass}
          >
            How It Works
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth
            duration={500}
            offset={-80}
            className={scrollLinkClass}
          >
            Features
          </ScrollLink>
          <a
            href="https://github.com/parth-maheta/PricePulse.git"
            target="_blank"
            rel="noopener noreferrer"
            className={scrollLinkClass}
          >
            GitHub
          </a>
          {/* Buttons removed */}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FiX className="text-2xl text-indigo-700" />
            ) : (
              <FiMenu className="text-2xl text-indigo-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-indigo-100 px-4 pb-4">
          <ScrollLink
            to="how-it-works"
            smooth
            duration={500}
            offset={-80}
            className={scrollLinkClass + " block"}
            onClick={toggleMenu}
          >
            How It Works
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth
            duration={500}
            offset={-80}
            className={scrollLinkClass + " block"}
            onClick={toggleMenu}
          >
            Features
          </ScrollLink>
          <a
            href="https://github.com/parth-maheta/PricePulse.git"
            target="_blank"
            rel="noopener noreferrer"
            className={scrollLinkClass + " block"}
          >
            GitHub
          </a>
          {/* Buttons removed */}
        </div>
      )}
    </nav>
  );
}
