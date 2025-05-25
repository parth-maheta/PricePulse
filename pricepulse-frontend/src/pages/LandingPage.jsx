import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiBarChart2,
  FiZap,
  FiEye,
  FiPlusCircle,
} from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const messages = [
    "Track Amazon prices in real-time \nGet notified on email when prices drop 🔔",
    "No more overpaying on deals 💸\nStart smart shopping today 🛍️",
    "Compare historical prices easily 📊\nStay one step ahead 🧠",
  ];

  const features = [
    {
      icon: <FiBell />,
      title: "Smart Alerts",
      desc: "Get notified when the price drops below your target.",
    },
    {
      icon: <FiBarChart2 />,
      title: "Price History",
      desc: "View beautiful price history charts before making a purchase.",
    },
    {
      icon: <FiZap />,
      title: "Simple & Fast",
      desc: "Add products and get updates in seconds with a clean UI.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 via-purple-50 to-violet-100 text-gray-900">
      {/* Hero Section */}
      <section
        className="min-h-[60vh] flex flex-col justify-center items-center p-4 sm:p-8 text-center pt-12"
        data-aos="fade-up"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-3 select-none">
          PricePulse – Amazon Price Tracker
        </h1>
        <p className="max-w-xl w-full mb-4 text-lg text-indigo-700">
          Track your favorite Amazon products and get real-time price insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
          <button
            data-aos="fade-right"
            onClick={() => navigate("/tracked-products")}
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 transition-all group"
          >
            <FiEye className="text-xl group-hover:scale-125 transform transition-transform duration-200" />
            View Tracked Products
          </button>

          <button
            data-aos="fade-left"
            onClick={() => navigate("/track-new")}
            className="flex items-center gap-2 bg-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:bg-purple-700 transition-all group"
          >
            <FiPlusCircle className="text-xl group-hover:rotate-12 transform transition-transform duration-200" />
            Track New Product
          </button>
        </div>
      </section>

      {/* the typewriter container */}
      <div className="mt-2 sm:mt-4 text-lg sm:text-xl font-semibold text-indigo-600 text-center min-h-[3rem] whitespace-pre-line leading-relaxed sm:leading-loose px-2 sm:px-0">
        <Typewriter
          words={messages}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={2500}
        />
      </div>

      <section
        id="how-it-works"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-center"
      >
        <h2
          className="text-3xl font-bold text-indigo-700 mb-4"
          data-aos="fade-right"
        >
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
          {[
            {
              title: "1. Add Product",
              desc: "Paste an Amazon product URL to view the product and start tracking the price.",
            },
            {
              title: "2. Set Target Price",
              desc: "Enter a target price and your email to get notified when the price drops below it.",
            },
            {
              title: "3. Get Notified on Email",
              desc: "We monitor the price and alert you when it drops below your target.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="p-5 bg-off-white rounded-xl shadow border border-purple-300 transition-all hover:shadow-lg hover:scale-[1.02]"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-3xl font-bold text-purple-700 mb-10"
            data-aos="fade-up"
          >
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-indigo-50 p-6 rounded-lg shadow-md border border-indigo-200 transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div
                  className="text-purple-700 mb-4 text-5xl mx-auto transition-transform duration-300 ease-in-out hover:scale-125 hover:text-indigo-900"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Repo */}
      <section
        className="text-center py-12 px-4 bg-gradient-to-r from-indigo-100 to-purple-100"
        data-aos="fade-in"
      >
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
          View the Project on GitHub
        </h2>
        <a
          href="https://github.com/parth-maheta/PricePulse.git"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 transition-all transform hover:scale-105"
        >
          GitHub Repo →
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs sm:text-sm text-gray-500 px-2">
        © {new Date().getFullYear()} PricePulse. Built with 💜 by Parth.
      </footer>
    </div>
  );
}
