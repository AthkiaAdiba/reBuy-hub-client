"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const accordionData = [
  {
    title: "Exclusive Consulting",
    content:
      "Our exclusive consulting services provide tailored solutions for your business needs. With personalized attention from our senior consultants, you'll receive strategic guidance that drives measurable results and sustainable growth for your organization.",
  },
  {
    title: "Premium Strategy Development",
    content:
      "We help you develop premium strategies that set you apart in your industry. Our team works closely with you to identify opportunities, mitigate risks, and create actionable plans for long-term success.",
  },
  {
    title: "Elite Executive Coaching",
    content:
      "Unlock your leadership potential with our elite executive coaching. Our experienced coaches provide one-on-one guidance to help you achieve your professional goals and drive organizational excellence.",
  },
  {
    title: "Bespoke Digital Solutions",
    content:
      "Transform your business with bespoke digital solutions tailored to your unique needs. From custom software to digital transformation, we deliver innovative technology that empowers your growth.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-2">
      <div className="w-full max-w-3xl">
        <h2 className="text-center text-3xl md:text-5xl font-light mb-12">
          <span className="text-[#D6C3A1] italic font-semibold mr-2">
            Premium
          </span>
          <span className="text-gray-900 font-normal">Services</span>
        </h2>
        <div className="space-y-4">
          {accordionData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.title}
                className={`bg-white rounded-xl shadow-xl border border-[#f3f0ea] transition-all duration-300 ${
                  isOpen ? "" : "hover:shadow-md"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-6 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${idx}`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <span
                    className={`text-2xl font-semibold text-left ${
                      isOpen ? "text-[#D6C3A1]" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`h-7 w-7 ml-4 text-[#D6C3A1] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  id={`accordion-content-${idx}`}
                  className={`overflow-hidden transition-all duration-300 px-8 ${
                    isOpen ? "max-h-[500px] py-4" : "max-h-0 py-0"
                  }`}
                  style={{
                    transitionProperty: "max-height, padding",
                  }}
                >
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

// Add fade-in animation for content
// In your global CSS (e.g., globals.css), add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.4,0,0.2,1); }
