import React, { useLayoutEffect, useRef } from 'react';
import { Star, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_CONFIG } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const compRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        onComplete: () => {
          gsap.set('.hero-badge, .hero-headline, .hero-p, .hero-actions, .hero-reputation, .hero-image-frame', { clearProps: 'all' });
        }
      });

      tl.from('.hero-badge', { y: 20, opacity: 0 })
        .from('.hero-headline', { y: 30, opacity: 0 }, '-=0.6')
        .from('.hero-p', { y: 20, opacity: 0 }, '-=0.6')
        .from('.hero-actions', { y: 20, opacity: 0 }, '-=0.6')
        .from('.hero-reputation', { y: 15, opacity: 0 }, '-=0.5')
        .from('.hero-image-frame', { scale: 0.96, opacity: 0, duration: 1.0 }, '-=0.8');
    }, compRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={compRef} className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Statement & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-5 lg:pr-6">
          
          {/* Location Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 bg-[#EDF2F7] rounded-md border border-[#EDF2F7]">
            <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse"></span>
            <span className="font-sora text-[11px] font-semibold text-[#10233F] tracking-widest uppercase">
              FACEMAX · KUDASAN · GANDHINAGAR
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline font-sora text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#10233F] uppercase leading-[1.08] tracking-tight text-balance">
            PRECISION MEETS<br />
            <span className="text-[#10233F]">YOUR SMILE.</span>
          </h1>

          {/* Lead Copy */}
          <p className="hero-p font-manrope text-base sm:text-lg text-[#34445B] max-w-xl leading-relaxed">
            Explore your dental care options, understand your choices, and prepare for a professional conversation about your oral health in a serene, architecturally curated clinical environment.
          </p>

          {/* CTAs */}
          <div className="hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-sm px-6 py-3.5 rounded-md shadow-sm hover:bg-[#34445B] hover:text-[#FFFFFF] transition-all duration-200 text-center gap-2 group"
            >
              <span>START YOUR CONSULTATION</span>
              <ArrowRight className="w-4 h-4 text-[#C5A46D] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href="#treatments"
              className="inline-flex items-center justify-center bg-[#EDF2F7] text-[#10233F] font-manrope font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-[#EDF2F7]/80 transition-all duration-200 text-center border border-[#EDF2F7]"
            >
              EXPLORE DENTAL CARE
            </a>
          </div>

          {/* Google Reputation Badge */}
          <div className="hero-reputation pt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-[#FFFFFF] px-4 py-2.5 rounded-md border border-[#EDF2F7] shadow-sm">
              <div className="flex items-center text-[#C5A46D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-[#C5A46D]" />
                ))}
              </div>
              <span className="font-sora text-sm font-bold text-[#10233F]">
                {BUSINESS_CONFIG.reputation.googleRating.toFixed(1)}
              </span>
              <span className="text-[#34445B] font-manrope text-xs">
                · {BUSINESS_CONFIG.reputation.googleReviewCount} Google reviews
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[#34445B] font-manrope text-xs">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span>{BUSINESS_CONFIG.reputation.verifiedProfileLabel}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Photography Frame */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0 hero-image-frame">
          <div className="relative rounded-lg overflow-hidden shadow-md bg-[#FFFFFF] border border-[#EDF2F7]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDahw9mkrQ3hNM2WGUcmMJEukntzMkDRUqv_Yac4G7z1yl5C8Dw47bMrO_umMmv2OVs9ASE120XMlgi6Z-KAqO0bhH-1w-OLtR0S9AOzV32A870WVe0EGazWxXOT0RP5kfg9tjtt4O4PfjN_iEl-dY6Hs15FI-efAxRrrobMJAr2N6AildRG4zgOko847y6snwpppIvrowGSqy_sEir2qX0euoMIemolmTx-iA2uFxkLqldNZiN4yq2"
              alt="FACEMAX Modern Architectural Dental Surgery Studio in Kudasan Gandhinagar"
              className="w-full aspect-[4/5] object-cover rounded-lg"
              loading="eager"
            />

            {/* Architectural Floating Badges */}
            <div className="absolute top-4 left-4 bg-[#10233F]/90 backdrop-blur-md px-3.5 py-1.5 rounded-md flex items-center gap-2 border border-[#34445B]/40">
              <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span className="font-sora text-[10px] font-semibold text-[#FFFFFF] uppercase tracking-wider">
                Kudasan Suite · Gandhinagar
              </span>
            </div>

            <div className="absolute bottom-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md px-4 py-2 rounded-md text-right shadow-md border border-[#EDF2F7]">
              <p className="font-sora text-[10px] font-semibold text-[#34445B]">23.1815° N, 72.6369° E</p>
              <p className="font-manrope text-xs text-[#10233F] font-bold">FACEMAX Surgical Studio</p>
            </div>
          </div>

          {/* Offset Decorative Plinth */}
          <div className="hidden xl:block absolute -bottom-6 -left-6 bg-[#10233F] text-[#FFFFFF] p-4 rounded-md shadow-md max-w-[210px] border border-[#C5A46D]/30">
            <p className="font-sora text-[10px] uppercase font-semibold text-[#C5A46D]">Acoustic Composure</p>
            <p className="font-manrope text-xs text-[#EDF2F7] mt-1">Engineered acoustic silencing for tranquil clinical comfort.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
