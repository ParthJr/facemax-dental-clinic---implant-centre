import React, { useLayoutEffect, useRef } from 'react';
import { Ear, Microscope, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntroduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.principle-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
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

  const principles = [
    {
      num: '01',
      title: 'UNDERSTAND',
      icon: Ear,
      description: 'Discuss your dental concerns, past treatment history, aesthetic goals, and personal expectations in an unhurried, comfortable dialogue.',
    },
    {
      num: '02',
      title: 'EXPLORE',
      icon: Microscope,
      description: 'Review appropriate treatment modalities, technological alternatives, material advantages, and relevant clinical considerations side-by-side.',
    },
    {
      num: '03',
      title: 'PLAN',
      icon: Compass,
      description: 'Discuss suitable next steps with your dental professional, arriving at a tailored roadmap with transparent expectations and schedules.',
    },
  ];

  return (
    <section id="our-approach" ref={sectionRef} className="w-full bg-[#10233F] text-[#FFFFFF] py-16 lg:py-24 border-y border-[#34445B]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
            <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
              THE FACEMAX APPROACH
            </span>
          </div>

          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FFFFFF] tracking-tight leading-snug">
            GOOD DECISIONS BEGIN WITH CLEAR INFORMATION.
          </h2>

          <p className="font-manrope text-base sm:text-lg text-[#EDF2F7]/80 mt-4 leading-relaxed">
            Understanding your concerns, reviewing relevant findings, and discussing appropriate options are important steps in planning dental care. We prioritize calm diagnostic clarity over transactional procedures.
          </p>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {principles.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.num}
                className="principle-card flex flex-col p-6 sm:p-8 bg-[#FFFFFF]/5 rounded-lg border border-[#FFFFFF]/10 hover:border-[#C5A46D]/40 transition-colors group"
              >
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#FFFFFF]/10">
                  <span className="font-sora text-3xl font-bold text-[#C5A46D]">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-md bg-[#C5A46D]/10 flex items-center justify-center text-[#C5A46D] group-hover:bg-[#C5A46D] group-hover:text-[#10233F] transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-sora text-lg font-semibold text-[#FFFFFF] uppercase tracking-wider mb-3">
                  {item.title}
                </h3>

                <p className="font-manrope text-sm sm:text-base text-[#EDF2F7]/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
