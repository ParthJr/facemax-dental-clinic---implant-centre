import React, { useLayoutEffect, useRef } from 'react';
import { MessageSquare, Stethoscope, Eye, CalendarCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_CONFIG } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

export const PatientJourney: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey-card',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stages = BUSINESS_CONFIG.patientJourney;

  const iconMap: Record<string, React.ElementType> = {
    chat: MessageSquare,
    stethoscope: Stethoscope,
    visibility: Eye,
    event_available: CalendarCheck,
  };

  return (
    <section id="patient-journey" ref={sectionRef} className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-16 lg:py-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-2 justify-center">
          <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
          <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
            PATIENT JOURNEY
          </span>
          <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
        </div>
        <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-[#10233F] tracking-tight">
          FROM FIRST ENQUIRY TO A CLEAR PLAN.
        </h2>
        <p className="font-manrope text-sm sm:text-base text-[#34445B] mt-3">
          A structured, supportive four-step path designed to eliminate ambiguity and respect your personal agency.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stages.map((item, idx) => {
          const IconComponent = iconMap[item.iconName] || MessageSquare;
          return (
            <div
              key={idx}
              className="journey-card bg-[#FFFFFF] p-6 sm:p-7 rounded-lg border border-[#EDF2F7] shadow-sm flex flex-col justify-between h-full hover:border-[#C5A46D]/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#F5F8FC] border border-[#EDF2F7] text-[#10233F] font-sora text-[10px] font-bold">
                    {item.stage}
                  </span>
                  <div className="w-9 h-9 rounded-md bg-[#F5F8FC] flex items-center justify-center text-[#C5A46D]">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-sora text-xl font-semibold text-[#10233F] mb-2">
                  {item.title}
                </h3>

                <p className="font-manrope text-xs sm:text-sm text-[#34445B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EDF2F7]">
                <p className="font-sora text-[10px] font-semibold text-[#C5A46D] uppercase tracking-wider">
                  {item.tagline}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
