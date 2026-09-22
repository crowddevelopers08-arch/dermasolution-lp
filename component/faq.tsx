'use client'

import React, { useState } from 'react';
import { BookButton } from '@/component/consultation-form';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      question: 'How do I know which treatment is right for me?',
      answer: 'The doctor will assess your concern and recommend suitable treatment options based on your individual needs.'
    },
    {
      question: 'Do all treatments require multiple sessions?',
      answer: 'Not necessarily. The number of sessions depends on the treatment, concern and individual response.'
    },
    {
      question: 'Do you offer laser treatments?',
      answer: 'Yes. The clinic offers several laser-based treatments for concerns including unwanted hair, pigmentation, tattoos, birthmarks and redness.'
    },
    {
      question: 'Do you offer bridal treatments?',
      answer: 'Yes. Bridal skin treatments are available for patients preparing for important occasions.'
    },
    {
      question: 'Where is the clinic located?',
      answer: 'Derma Solutions is located in Banashankari, Bangalore.'
    }
  ];

  const toggleFAQ = (index :any) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-[#FBF8F3] py-12 sm:py-14 md:py-15 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-10 lg:gap-12 xl:gap-16">
          
          {/* =========================================== */}
          {/* DESKTOP LAYOUT - Left Side - Header and Grid (Unchanged) */}
          {/* =========================================== */}
          <div className="hidden lg:flex lg:flex-col">
            <div className="mb-8">
              <h2 className="text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.15] tracking-[-0.01em] text-[#1F1F1F] mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Desktop Grid Layout Section - Unchanged */}
            <div className="grid grid-cols-7 grid-rows-6 gap-2 flex-1 min-h-[200px]">
              {/* Div 1 - Larger left area */}
              <div className="relative col-span-4 row-span-6 bg-gradient-to-br from-[#C99045] to-[#B5802F] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=800&fit=crop" 
                  alt="Medical consultation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              {/* Div 2 - Top right */}
              <div className="relative col-span-3 row-span-3 col-start-5 bg-gradient-to-br from-[#1F1F1F] to-[#3B3738] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop" 
                  alt="Healthcare professional"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              {/* Div 3 - Bottom right */}
              <div className="relative col-span-3 row-span-3 col-start-5 row-start-4 bg-gradient-to-br from-[#C99045] to-[#B5802F] rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop" 
                  alt="Medical equipment"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* =========================================== */}
          {/* MOBILE/TABLET LAYOUT - Left Side - Header and ORIGINAL GRID IMAGE */}
          {/* =========================================== */}
          <div className="lg:hidden">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.01em] text-[#1F1F1F] mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            {/* MOBILE/TABLET - ORIGINAL GRID LAYOUT (Adapted for smaller screens) */}
            <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[300px] sm:h-[350px] md:h-[400px] mb-8 sm:mb-10">
              {/* Div 1 - Larger left area - Takes 2 columns, full height */}
              <div className="col-span-2 row-span-4 bg-gradient-to-br from-[#C99045] to-[#B5802F] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=800&fit=crop" 
                  alt="Medical consultation"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Div 2 - Top right - Takes 1 column, 2 rows */}
              <div className="col-span-1 row-span-2 col-start-3 bg-gradient-to-br from-[#1F1F1F] to-[#3B3738] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop" 
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Div 3 - Bottom right - Takes 1 column, 2 rows */}
              <div className="col-span-1 row-span-2 col-start-3 row-start-3 bg-gradient-to-br from-[#C99045] to-[#B5802F] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop" 
                  alt="Medical equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* =========================================== */}
          {/* Right Side - FAQ Accordion - Fully Responsive */}
          {/* =========================================== */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-[#E8E0D2] overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-[#FBF8F3] transition-colors"
                >
                  <span className="text-[#1F1F1F] font-semibold text-sm sm:text-base md:text-lg pr-3 sm:pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#C99045] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
                    <p className="text-[#5A5650] text-xs sm:text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Additional Contact CTA - Mobile Only */}
            <div className="lg:hidden bg-gradient-to-r from-[#C99045]/10 to-[#1F1F1F]/10 rounded-xl p-4 sm:p-5 mt-1 sm:mt-2">
              <p className="text-[#1F1F1F] font-semibold text-sm sm:text-base mb-2">
                Still have questions?
              </p>
              <BookButton className="bg-[#C99045] hover:bg-[#B5802F] text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-5 rounded-lg text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto">
                Talk to Our Team
              </BookButton>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1023px) {
          .lg\\:block {
            display: none !important;
          }
        }
        
        @media (min-width: 1024px) {
          .lg\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQSection;