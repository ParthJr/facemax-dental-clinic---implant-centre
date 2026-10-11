import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_CONFIG } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

interface ImplantEducationProps {
  onOpenConsultation: () => void;
}

export const ImplantEducation: React.FC<ImplantEducationProps> = ({ onOpenConsultation }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.implant-stage',
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
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

  const data = BUSINESS_CONFIG.implantEducation;

  return (
    <section id="implant-education" ref={sectionRef} className="w-full bg-[#FFFFFF] py-16 lg:py-24 border-y border-[#EDF2F7]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Educational Header & Context */}
          <div className="lg:col-span-5 flex flex-col space-y-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2">
              <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
              <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
                {data.tagline}
              </span>
            </div>

            <h2 className="font-sora text-3xl sm:text-4xl font-semibold text-[#10233F] tracking-tight leading-snug">
              {data.title}
            </h2>

            <p className="font-manrope text-base text-[#34445B] leading-relaxed">
              {data.overview}
            </p>

            <div className="p-4 bg-[#F5F8FC] rounded-lg border border-[#EDF2F7] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
              <p className="font-manrope text-xs sm:text-sm text-[#34445B] leading-relaxed">
                <span className="font-semibold text-[#10233F]">Clinical Note: </span>
                {data.clinicalNote}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-sm px-6 py-3.5 rounded-md shadow-sm hover:bg-[#34445B] transition-all duration-200 gap-2"
              >
                <span>ENQUIRE ABOUT IMPLANTS</span>
                <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
              </button>
            </div>
          </div>

          {/* Right Column: 4-Stage Pathway Timeline */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {data.stages.map((stage) => (
              <div
                key={stage.number}
                className="implant-stage p-6 bg-[#F5F8FC] rounded-lg border border-[#EDF2F7] shadow-sm flex gap-4 sm:gap-6 items-start hover:border-[#C5A46D]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#10233F] text-[#C5A46D] flex items-center justify-center shrink-0 font-sora text-lg font-bold shadow-sm">
                  {stage.number}
                </div>

                <div className="space-y-1">
                  <h3 className="font-sora text-lg font-bold text-[#10233F]">
                    {stage.title}
                  </h3>
                  <p className="font-manrope text-sm text-[#34445B] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
