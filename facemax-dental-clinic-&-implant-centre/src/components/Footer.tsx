import React, { useState } from 'react';
import { Star, Phone, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

export const Footer: React.FC = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#10233F] text-[#FFFFFF] pt-16 pb-12 border-t border-[#34445B]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            
            {/* Col 1: Brand Summary */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-[#C5A46D] text-[#10233F] flex items-center justify-center font-sora font-bold text-sm">
                  FM
                </div>
                <span className="font-sora text-xl font-bold tracking-tight text-[#FFFFFF]">
                  FACEMAX
                </span>
              </div>

              <p className="font-manrope text-xs sm:text-sm text-[#EDF2F7]/80 max-w-sm leading-relaxed">
                {BUSINESS_CONFIG.tagline}
              </p>

              <div className="inline-flex items-center gap-2 bg-[#FFFFFF]/5 px-3 py-1.5 rounded-md border border-[#FFFFFF]/10 w-fit">
                <div className="flex items-center text-[#C5A46D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#C5A46D]" />
                  ))}
                </div>
                <span className="font-sora text-xs font-bold text-[#FFFFFF]">
                  {BUSINESS_CONFIG.reputation.googleRating.toFixed(1)}
                </span>
                <span className="font-manrope text-[11px] text-[#EDF2F7]/70">
                  Google Verified
                </span>
              </div>
            </div>

            {/* Col 2: Clinical Location */}
            <div className="lg:col-span-3 flex flex-col space-y-3">
              <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
                Clinical Location
              </span>
              <address className="not-italic font-manrope text-xs sm:text-sm text-[#EDF2F7]/80 leading-relaxed">
                {BUSINESS_CONFIG.contact.address.line1},<br />
                {BUSINESS_CONFIG.contact.address.line2},<br />
                {BUSINESS_CONFIG.contact.address.city}, {BUSINESS_CONFIG.contact.address.state} {BUSINESS_CONFIG.contact.address.postalCode}
              </address>

              <a
                href={`tel:${BUSINESS_CONFIG.contact.phoneNumeric}`}
                className="font-sora text-sm font-bold text-[#FFFFFF] hover:text-[#C5A46D] transition-colors mt-1 inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>

            {/* Col 3: Operating Hours */}
            <div className="lg:col-span-3 flex flex-col space-y-3">
              <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
                Clinical Operating Hours
              </span>
              <div className="space-y-1.5 font-manrope text-xs text-[#EDF2F7]/80">
                {BUSINESS_CONFIG.schedule.operatingHours.map((slot, i) => (
                  <div key={i} className="flex justify-between max-w-xs border-b border-[#FFFFFF]/5 pb-1">
                    <span className="text-[#FFFFFF]">{slot.days}</span>
                    <span className="text-[#EDF2F7]">{slot.hours}</span>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 mt-2 text-[#C5A46D] font-manrope text-xs">
                <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-pulse"></span>
                <span>Now Open for Consultations</span>
              </div>
            </div>

            {/* Col 4: Quick Pathways */}
            <div className="lg:col-span-2 flex flex-col space-y-3">
              <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
                Clinical Pathways
              </span>
              <nav className="flex flex-col space-y-2 font-manrope text-xs text-[#EDF2F7]/80">
                <a href="#home" className="hover:text-[#FFFFFF] transition-colors">Overview</a>
                <a href="#our-approach" className="hover:text-[#FFFFFF] transition-colors">The Approach</a>
                <a href="#treatments" className="hover:text-[#FFFFFF] transition-colors">Treatments</a>
                <a href="#implant-education" className="hover:text-[#FFFFFF] transition-colors">Implant Guide</a>
                <a href="#patient-journey" className="hover:text-[#FFFFFF] transition-colors">Patient Journey</a>
                <a href="#contact" className="hover:text-[#FFFFFF] transition-colors">Kudasan Location</a>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-left hover:text-[#C5A46D] transition-colors font-semibold"
                >
                  Privacy Policy
                </button>
              </nav>
            </div>

          </div>

          {/* Bottom Legal & Medical Disclaimer */}
          <div className="pt-8 border-t border-[#FFFFFF]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-manrope text-[#EDF2F7]/60">
            <p>
              © 2025 FACEMAX Dental Clinic and Implant Centre. Kudasan, Gandhinagar. All rights reserved.
            </p>

            <p className="max-w-xl text-left md:text-right">
              <strong className="text-[#EDF2F7]">Medical Disclaimer: </strong>
              Information provided is for educational smile architecture awareness and does not replace diagnostic clinical assessment by a registered maxillofacial or dental surgeon.
            </p>
          </div>

        </div>
      </footer>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
};
