import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, ParkingSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const ContactSection: React.FC = () => {
  const { address, phoneDisplay, phoneNumeric } = BUSINESS_CONFIG.contact;
  const { operatingHours } = BUSINESS_CONFIG.schedule;

  return (
    <section id="contact" className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-16 lg:py-24">
      
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
          <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
            VISIT OUR PRACTICE
          </span>
        </div>
        <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#10233F] tracking-tight">
          FIND FACEMAX.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Address & Hours Panel */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#EDF2F7] shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Physical Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#F5F8FC] border border-[#EDF2F7] flex items-center justify-center shrink-0 text-[#10233F]">
                <MapPin className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <div>
                <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider block">
                  Clinical Address
                </span>
                <p className="font-manrope text-sm sm:text-base text-[#10233F] mt-1 font-semibold leading-relaxed">
                  {address.line1},<br />
                  {address.line2},<br />
                  {address.city}, {address.state} – {address.postalCode}
                </p>
              </div>
            </div>

            {/* Direct Telephone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#F5F8FC] border border-[#EDF2F7] flex items-center justify-center shrink-0 text-[#10233F]">
                <Phone className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <div>
                <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider block">
                  Direct Clinical Line
                </span>
                <a
                  href={`tel:${phoneNumeric}`}
                  className="font-sora text-xl sm:text-2xl font-bold text-[#10233F] hover:text-[#C5A46D] transition-colors mt-1 inline-block"
                >
                  {phoneDisplay}
                </a>
                <p className="font-manrope text-xs text-[#34445B] mt-0.5">
                  Tap to place an immediate phone inquiry
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-[#F5F8FC] border border-[#EDF2F7] flex items-center justify-center shrink-0 text-[#10233F]">
                <Clock className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <div className="w-full">
                <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider block">
                  Operating Hours
                </span>
                <p className="font-manrope text-sm text-[#10233F] font-semibold mt-1">
                  {BUSINESS_CONFIG.schedule.openingTimeDisplay}
                </p>
                
                <div className="mt-2 space-y-1 font-manrope text-xs text-[#34445B] bg-[#F5F8FC] p-3 rounded-md border border-[#EDF2F7]">
                  {operatingHours.map((slot, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="font-semibold text-[#10233F]">{slot.days}</span>
                      <span>{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Directions Action */}
          <div className="pt-4 border-t border-[#EDF2F7]">
            <a
              href={BUSINESS_CONFIG.verifiedLinks.googleMapDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-xs sm:text-sm py-3.5 rounded-md shadow-sm hover:bg-[#34445B] transition-all"
            >
              <span>GET DIRECTIONS ON GOOGLE MAPS</span>
              <Navigation className="w-4 h-4 text-[#C5A46D]" />
            </a>
          </div>
        </div>

        {/* Map Viewport Card */}
        <div className="lg:col-span-7 rounded-lg overflow-hidden border border-[#EDF2F7] shadow-sm relative min-h-[360px] bg-[#10233F]">
          <iframe
            title="FACEMAX Dental Clinic Location Map"
            src="https://maps.google.com/maps?q=Pramukh+Anand+Orbit+Mall+Kudasan+Gandhinagar&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[380px] border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>

          <div className="absolute bottom-4 left-4 bg-[#FFFFFF]/95 backdrop-blur-md p-4 rounded-md shadow-md max-w-xs border border-[#EDF2F7]">
            <p className="font-sora text-sm font-bold text-[#10233F]">FACEMAX Dental Centre</p>
            <p className="font-manrope text-xs text-[#34445B]">Pramukh Anand Orbit Mall, Kudasan</p>
            <div className="flex items-center gap-1.5 text-[#C5A46D] font-sora text-[10px] uppercase font-semibold mt-1">
              <ParkingSquare className="w-3.5 h-3.5" />
              <span>Convenient mall basement parking</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
