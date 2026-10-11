import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, User } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'our-approach', 'treatments', 'implant-education', 'patient-journey', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Our Approach', href: '#our-approach', id: 'our-approach' },
    { name: 'Treatments', href: '#treatments', id: 'treatments' },
    { name: 'Implant Guide', href: '#implant-education', id: 'implant-education' },
    { name: 'Patient Journey', href: '#patient-journey', id: 'patient-journey' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F8FC]/95 backdrop-blur-md shadow-sm border-b border-[#EDF2F7] py-3'
          : 'bg-[#F5F8FC]/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#home" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#10233F] flex items-center justify-center text-[#FFFFFF] shadow-sm transition-transform group-hover:scale-105">
            <span className="font-sora font-bold text-lg tracking-wider text-[#C5A46D]">FM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sora text-lg sm:text-xl font-bold text-[#10233F] leading-none tracking-tight">
              FACEMAX
            </span>
            <span className="font-sora text-[10px] sm:text-[11px] font-semibold text-[#34445B] uppercase tracking-widest mt-1">
              Dental Clinic & Implant Centre
            </span>
          </div>
        </a>

        {/* Zone 2: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-manrope text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeSection === link.id
                  ? 'text-[#10233F] font-semibold border-b-2 border-[#C5A46D] pb-0.5'
                  : 'text-[#34445B] hover:text-[#10233F]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Direct Phone & Primary CTA */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex flex-col text-right pr-3 border-r border-[#EDF2F7]">
            <span className="font-sora text-[10px] uppercase font-semibold text-[#34445B] tracking-wider">
              Appointments & Inquiries
            </span>
            <a
              href={`tel:${BUSINESS_CONFIG.contact.phoneNumeric}`}
              className="font-manrope text-base font-bold text-[#10233F] hover:text-[#C5A46D] transition-colors tracking-tight flex items-center gap-1 justify-end"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
              {BUSINESS_CONFIG.contact.phoneDisplay}
            </a>
          </div>

          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-md shadow-sm hover:bg-[#34445B] hover:text-[#FFFFFF] transition-all duration-200 whitespace-nowrap"
          >
            REQUEST A CONSULTATION
          </button>

          {/* User Icon Badge */}
          <div className="w-9 h-9 rounded-full bg-[#10233F] text-[#FFFFFF] flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-[#C5A46D]" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#10233F] hover:bg-[#EDF2F7] rounded-md transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bg-[#F5F8FC] border-b border-[#EDF2F7] shadow-lg px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-manrope text-base py-2 border-b border-[#EDF2F7] flex items-center justify-between ${
                  activeSection === link.id
                    ? 'text-[#10233F] font-bold'
                    : 'text-[#34445B]'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#C5A46D]" />
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="font-sora text-xs uppercase font-semibold text-[#34445B]">Direct Clinical Line</span>
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneNumeric}`}
                className="font-sora text-xl font-bold text-[#10233F] mt-1"
              >
                {BUSINESS_CONFIG.contact.phoneDisplay}
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-sm py-3 rounded-md text-center shadow-md hover:bg-[#34445B] transition-colors mt-2"
            >
              REQUEST A CONSULTATION
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
