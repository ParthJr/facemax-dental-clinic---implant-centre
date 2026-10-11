import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const PatientEducation: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const faqs = BUSINESS_CONFIG.faqs;

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="w-full bg-[#F5F8FC] py-16 lg:py-24 border-y border-[#EDF2F7]">
      <div className="max-w-[960px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2 justify-center">
            <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
            <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
              CLINICAL QUESTIONS
            </span>
            <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
          </div>

          <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-[#10233F] tracking-tight">
            INFORMED QUESTIONS. CLEARER CHOICES.
          </h2>

          <p className="font-manrope text-sm sm:text-base text-[#34445B] mt-3 max-w-xl mx-auto">
            Honest answers to the questions patients ask most frequently prior to restorative and cosmetic procedures.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#FFFFFF] rounded-lg border border-[#EDF2F7] shadow-sm transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-sora text-base sm:text-lg font-semibold text-[#10233F] hover:text-[#C5A46D] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#C5A46D] shrink-0" />
                    <span>{item.question}</span>
                  </span>

                  <div className={`w-8 h-8 rounded-full bg-[#F5F8FC] flex items-center justify-center text-[#C5A46D] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#10233F] text-[#FFFFFF]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-6 pb-6 pt-1 text-[#34445B] font-manrope text-sm sm:text-base leading-relaxed border-t border-[#EDF2F7] mt-1 bg-[#F5F8FC]/50 animate-in fade-in duration-200"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
