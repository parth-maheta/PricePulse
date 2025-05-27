import React, { useState, useContext } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import AuthContext from "../components/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const scrollLinkClass =
    "cursor-pointer text-indigo-700 hover:text-purple-700 font-medium px-3 py-2 transition-colors";

  const showLimitedLinks = ["/tracked-products", "/track-new"].includes(
    location.pathname
  );

  const handleLogout = () => {
    signoutUser();
    setMenuOpen(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
          className="text-xl font-bold text-indigo-700 cursor-pointer flex items-center gap-1"
        >
          <img src={logo} alt="PricePulse Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-indigo-700 select-none">
            PricePulse
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {showLimitedLinks && (
            <Link to="/" className={scrollLinkClass}>
              Home
            </Link>
          )}

          {!showLimitedLinks && (
            <>
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
            </>
          )}

          <a
            href="https://github.com/parth-maheta/PricePulse.git"
            target="_blank"
            rel="noopener noreferrer"
            className={scrollLinkClass}
          >
            GitHub
          </a>

          {/* Auth Section */}
          {!user ? (
            <>
              <Link to="/signin" className={scrollLinkClass}>
                Sign In
              </Link>
              <Link to="/signup" className={scrollLinkClass}>
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full overflow-hidden focus:outline-none border border-gray-300"
                title="User"
              >
                <img
                  src={`https://api.dicebear.com/9.x/fun-emoji/svg/default.svg`}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-indigo-100 px-4 pb-4">
          {showLimitedLinks && (
            <Link
              to="/"
              className={scrollLinkClass + " block"}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          )}
          {!showLimitedLinks && (
            <>
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
            </>
          )}
          <a
            href="https://github.com/parth-maheta/PricePulse.git"
            target="_blank"
            rel="noopener noreferrer"
            className={scrollLinkClass + " block"}
          >
            GitHub
          </a>

          {!user ? (
            <>
              <Link
                to="/signin"
                className={scrollLinkClass + " block"}
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={scrollLinkClass + " block"}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className={
                  scrollLinkClass +
                  " block bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 w-full text-left mt-2"
                }
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
