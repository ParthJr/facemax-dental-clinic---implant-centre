import React, { useState, useLayoutEffect, useRef } from 'react';
import { ArrowRight, Check, Sparkles, Layers, Info, X, Shield, Activity, Stethoscope, Camera, Scan, Cpu, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_CONFIG, ClinicalService } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

interface TreatmentDiscoveryProps {
  onSelectService: (serviceName: string) => void;
}

export const TreatmentDiscovery: React.FC<TreatmentDiscoveryProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ClinicalService | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Use fromTo with clearProps so elements never remain hidden if scroll position changes
      gsap.fromTo(
        '.treatment-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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

    // Refresh ScrollTrigger to account for any dynamic layout
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [activeCategory, selectedGoal]);

  const services = BUSINESS_CONFIG.confirmedServices;

  const categories = [
    { id: 'all', label: 'All Specialties' },
    { id: 'general-dental-care', label: 'General & Preventive' },
    { id: 'cosmetic-dentistry', label: 'Cosmetic Dentistry' },
    { id: 'restorative-dentistry', label: 'Restorative & Crowns' },
    { id: 'orthodontic-consultations', label: 'Aligners & Orthodontics' },
  ];

  const goals = [
    {
      id: 'routine',
      label: 'Routine Checkup & Cleaning',
      serviceId: 'general-dental-care',
      recommendation: 'Recommended: General Dental Care with ultrasonic prophylaxis and HD intraoral evaluation.'
    },
    {
      id: 'cosmetic',
      label: 'Smile Aesthetics & Veneers',
      serviceId: 'cosmetic-dentistry',
      recommendation: 'Recommended: Cosmetic Dentistry for hand-layered porcelain veneers and shade harmony.'
    },
    {
      id: 'implant',
      label: 'Missing Teeth / Chewing Care',
      serviceId: 'restorative-dentistry',
      recommendation: 'Recommended: Implant Consultation & CBCT 3D Bone Architecture Evaluation.'
    },
    {
      id: 'ortho',
      label: 'Straighten Teeth Discretely',
      serviceId: 'orthodontic-consultations',
      recommendation: 'Recommended: Orthodontic Consultation with 3D digital impressions & clear aligners.'
    }
  ];

  const handleGoalClick = (goal: typeof goals[0]) => {
    if (selectedGoal === goal.id) {
      setSelectedGoal(null);
      setActiveCategory('all');
    } else {
      setSelectedGoal(goal.id);
      setActiveCategory(goal.serviceId);
    }
  };

  return (
    <section id="treatments" ref={sectionRef} className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-16 lg:py-24">
      
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
            <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
              EXPLORE YOUR OPTIONS
            </span>
          </div>
          <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#10233F] tracking-tight">
            A CLEARER VIEW OF DENTAL CARE.
          </h2>
        </div>
        <p className="font-manrope text-sm text-[#34445B] max-w-sm lg:text-right leading-relaxed">
          Carefully structured disciplines balancing restorative health, structural longevity, and facial aesthetic symmetry.
        </p>
      </div>

      {/* Interactive Goal Assistant */}
      <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-lg border border-[#EDF2F7] shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#C5A46D]" />
            <span className="font-sora text-xs font-bold text-[#10233F] uppercase tracking-wider">
              Find Treatment by Goal
            </span>
          </div>
          <span className="font-manrope text-xs text-[#34445B]">Select your primary oral health goal:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {goals.map((g) => {
            const isSelected = selectedGoal === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleGoalClick(g)}
                className={`p-3 rounded-md text-left transition-all border font-manrope text-xs flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#10233F] text-[#FFFFFF] border-[#10233F] shadow-sm'
                    : 'bg-[#F5F8FC] text-[#34445B] hover:text-[#10233F] border-[#EDF2F7]'
                }`}
              >
                <span className="font-medium">{g.label}</span>
                <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#C5A46D]' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>

        {selectedGoal && (
          <div className="mt-4 p-3 bg-[#F5F8FC] rounded-md border border-[#C5A46D]/30 flex items-center gap-2 text-xs font-manrope text-[#10233F] animate-in fade-in duration-200">
            <Sparkles className="w-4 h-4 text-[#C5A46D] shrink-0" />
            <span>{goals.find(g => g.id === selectedGoal)?.recommendation}</span>
          </div>
        )}
      </div>

      {/* Category Segmented Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedGoal(null);
            }}
            className={`px-4 py-2 rounded-md font-manrope text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id && !selectedGoal
                ? 'bg-[#10233F] text-[#FFFFFF] shadow-sm'
                : 'bg-[#FFFFFF] text-[#34445B] hover:text-[#10233F] border border-[#EDF2F7]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Asymmetric Architectural Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* 01 General Dental Care (Featured Panel) */}
        {(activeCategory === 'all' || activeCategory === 'general-dental-care') && (
          <div className="treatment-card lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#EDF2F7] shadow-sm flex flex-col justify-between hover:border-[#C5A46D]/60 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sora text-xs font-bold text-[#C5A46D] tracking-widest">INDEX // 01</span>
                <span className="px-2.5 py-1 rounded bg-[#F5F8FC] border border-[#EDF2F7] text-[#10233F] font-sora text-[10px] font-semibold uppercase">
                  {services[0].categoryTag}
                </span>
              </div>

              <h3 className="font-sora text-2xl font-semibold text-[#10233F] mb-3 group-hover:text-[#C5A46D] transition-colors">
                {services[0].title}
              </h3>

              <p className="font-manrope text-sm text-[#34445B] mb-6 leading-relaxed">
                {services[0].shortDescription}
              </p>

              <ul className="space-y-3 mb-8 font-manrope text-xs sm:text-sm text-[#202733]">
                {services[0].keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#C5A46D]/15 flex items-center justify-center text-[#C5A46D] shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#EDF2F7] flex items-center justify-between">
              <button
                onClick={() => setSelectedServiceModal(services[0])}
                className="inline-flex items-center gap-1.5 font-manrope text-xs font-semibold text-[#34445B] hover:text-[#10233F]"
              >
                <Info className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>View Details</span>
              </button>

              <button
                onClick={() => onSelectService(services[0].title)}
                className="inline-flex items-center gap-2 font-manrope text-sm font-semibold text-[#10233F] hover:text-[#C5A46D] transition-colors"
              >
                <span>{services[0].actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 02 Cosmetic Dentistry (Image & Editorial Panel) */}
        {(activeCategory === 'all' || activeCategory === 'cosmetic-dentistry') && (
          <div className="treatment-card lg:col-span-7 bg-[#FFFFFF] rounded-lg border border-[#EDF2F7] shadow-sm overflow-hidden flex flex-col md:flex-row hover:border-[#C5A46D]/60 transition-all group">
            <div className="md:w-1/2 relative min-h-[240px] md:min-h-full bg-[#10233F]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPjSl4FXj2JBpTHemLksV_QzWwxrFwMI4PYyKQvhIf7LHQKomrU2oBzUijmdAjgsglgCgGsFnQB5DXMzGn2qI6xjd-cW4NFoSWq4xFIFmIlZklusxHHVbkVXAxMfz0ONKZL-sJroVrqkbLXIuL7S-iAr4QFzTdX1DO67mDAT_ZDokDKDGFJhrEKtBz6Cgtzw5fzB-kzJKgY4VJ-aoGDQqGxx7q7eJEkJymAGQlFnytes50OP4r-pDG"
                alt="Handcrafted ceramic veneers cosmetic dentistry at FACEMAX"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#10233F]/90 backdrop-blur-sm text-[#FFFFFF] font-sora text-[10px] font-semibold px-2.5 py-1 rounded border border-[#C5A46D]/30">
                INDEX // 02
              </div>
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-sora text-[10px] font-bold text-[#C5A46D] tracking-widest uppercase block mb-1">
                  {services[1].categoryTag}
                </span>
                <h3 className="font-sora text-2xl font-semibold text-[#10233F] mb-2 group-hover:text-[#C5A46D] transition-colors">
                  {services[1].title}
                </h3>
                <p className="font-manrope text-sm text-[#34445B] leading-relaxed mb-4">
                  {services[1].shortDescription}
                </p>
              </div>

              <div>
                <p className="font-manrope text-xs text-[#34445B] italic mb-4">
                  {services[1].clinicalNote}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#EDF2F7]">
                  <button
                    onClick={() => setSelectedServiceModal(services[1])}
                    className="font-manrope text-xs text-[#34445B] hover:text-[#10233F] font-semibold flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Clinical Info</span>
                  </button>

                  <button
                    onClick={() => onSelectService(services[1].title)}
                    className="inline-flex items-center gap-2 font-manrope text-sm font-semibold text-[#10233F] hover:text-[#C5A46D] transition-colors"
                  >
                    <span>{services[1].actionText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 03 Restorative Dentistry */}
        {(activeCategory === 'all' || activeCategory === 'restorative-dentistry') && (
          <div className="treatment-card lg:col-span-6 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#EDF2F7] shadow-sm flex flex-col justify-between hover:border-[#C5A46D]/60 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-sora text-xs font-bold text-[#C5A46D] tracking-widest">INDEX // 03</span>
                <Layers className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <h3 className="font-sora text-xl font-semibold text-[#10233F] mb-2 group-hover:text-[#C5A46D] transition-colors">
                {services[2].title}
              </h3>
              <p className="font-manrope text-sm text-[#34445B] leading-relaxed mb-4">
                {services[2].shortDescription}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EDF2F7]">
              <span className="font-manrope text-xs text-[#34445B] font-medium">{services[2].badgeText}</span>
              <button
                onClick={() => onSelectService(services[2].title)}
                className="font-manrope text-sm font-semibold text-[#10233F] hover:text-[#C5A46D] transition-colors flex items-center gap-1"
              >
                <span>{services[2].actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 04 Orthodontic Consultations */}
        {(activeCategory === 'all' || activeCategory === 'orthodontic-consultations') && (
          <div className="treatment-card lg:col-span-6 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#EDF2F7] shadow-sm flex flex-col justify-between hover:border-[#C5A46D]/60 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-sora text-xs font-bold text-[#C5A46D] tracking-widest">INDEX // 04</span>
                <Sparkles className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <h3 className="font-sora text-xl font-semibold text-[#10233F] mb-2 group-hover:text-[#C5A46D] transition-colors">
                {services[3].title}
              </h3>
              <p className="font-manrope text-sm text-[#34445B] leading-relaxed mb-4">
                {services[3].shortDescription}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EDF2F7]">
              <span className="font-manrope text-xs text-[#34445B] font-medium">{services[3].badgeText}</span>
              <button
                onClick={() => onSelectService(services[3].title)}
                className="font-manrope text-sm font-semibold text-[#10233F] hover:text-[#C5A46D] transition-colors flex items-center gap-1"
              >
                <span>{services[3].actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Clinical Diagnostic Technology Banner */}
      <div className="mt-12 p-6 sm:p-8 bg-[#FFFFFF] rounded-lg border border-[#EDF2F7] shadow-sm">
        <div className="mb-6">
          <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider block mb-1">
            CLINICAL DIAGNOSTIC INFRASTRUCTURE
          </span>
          <h3 className="font-sora text-xl font-bold text-[#10233F]">
            Advanced Technology Supporting Every Treatment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#F5F8FC] rounded-md border border-[#EDF2F7]">
            <Camera className="w-6 h-6 text-[#C5A46D] mb-2" />
            <h4 className="font-sora text-sm font-bold text-[#10233F] mb-1">HD Intraoral Diagnostics</h4>
            <p className="font-manrope text-xs text-[#34445B] leading-relaxed">
              Real-time high-magnification intraoral imaging allowing transparent review of enamel structure & margin health on chairside displays.
            </p>
          </div>

          <div className="p-4 bg-[#F5F8FC] rounded-md border border-[#EDF2F7]">
            <Scan className="w-6 h-6 text-[#C5A46D] mb-2" />
            <h4 className="font-sora text-sm font-bold text-[#10233F] mb-1">CBCT 3D Bone Mapping</h4>
            <p className="font-manrope text-xs text-[#34445B] leading-relaxed">
              Low-dose Cone Beam CT imaging providing 3D cross-sectional anatomical mapping prior to any surgical implant placement.
            </p>
          </div>

          <div className="p-4 bg-[#F5F8FC] rounded-md border border-[#EDF2F7]">
            <Cpu className="w-6 h-6 text-[#C5A46D] mb-2" />
            <h4 className="font-sora text-sm font-bold text-[#10233F] mb-1">Ultrasonic Piezo Prophylaxis</h4>
            <p className="font-manrope text-xs text-[#34445B] leading-relaxed">
              Acoustically silenced piezoelectric scaling instruments for comfortable, enamel-safe plaque and calculus removal.
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-[#10233F]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] max-w-xl w-full rounded-lg shadow-xl p-6 sm:p-8 border border-[#EDF2F7] relative">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 p-2 text-[#34445B] hover:text-[#10233F] rounded-md hover:bg-[#EDF2F7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-widest block mb-1">
              {selectedServiceModal.categoryTag}
            </span>
            <h3 className="font-sora text-2xl font-bold text-[#10233F] mb-4">
              {selectedServiceModal.title}
            </h3>

            <p className="font-manrope text-sm text-[#34445B] leading-relaxed mb-6">
              {selectedServiceModal.detailedDescription}
            </p>

            <div className="bg-[#F5F8FC] p-4 rounded-md border border-[#EDF2F7] mb-6">
              <h4 className="font-sora text-xs uppercase font-bold text-[#10233F] mb-2">Key Clinical Highlights</h4>
              <ul className="space-y-2 font-manrope text-xs sm:text-sm text-[#202733]">
                {selectedServiceModal.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C5A46D] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="px-4 py-2 font-manrope text-xs font-semibold text-[#34445B] hover:text-[#10233F]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedServiceModal.title;
                  setSelectedServiceModal(null);
                  onSelectService(title);
                }}
                className="bg-[#10233F] text-[#FFFFFF] font-manrope text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-[#34445B] transition-colors"
              >
                Enquire About This Treatment
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
