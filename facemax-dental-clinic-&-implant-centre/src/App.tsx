import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntroduction } from './components/BrandIntroduction';
import { TreatmentDiscovery } from './components/TreatmentDiscovery';
import { ImplantEducation } from './components/ImplantEducation';
import { PatientJourney } from './components/PatientJourney';
import { PatientEducation } from './components/PatientEducation';
import { ReviewsSection } from './components/ReviewsSection';
import { ConsultationForm } from './components/ConsultationForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('General Consultation & Checkup');

  const scrollToConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const formEl = document.getElementById('consultation-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#202733] font-manrope selection:bg-[#10233F] selection:text-[#FFFFFF]">
      {/* Header */}
      <Header onOpenConsultation={() => scrollToConsultation()} />

      {/* Main Content */}
      <main id="main-content">
        {/* 1. Hero */}
        <Hero onOpenConsultation={() => scrollToConsultation()} />

        {/* 2. Brand Introduction */}
        <BrandIntroduction />

        {/* 3. Treatment Discovery */}
        <TreatmentDiscovery onSelectService={(sName) => scrollToConsultation(sName)} />

        {/* 4. Implant Education */}
        <ImplantEducation onOpenConsultation={() => scrollToConsultation('Dental Implants & Tooth Replacement')} />

        {/* 5. Patient Journey */}
        <PatientJourney />

        {/* 6. Patient Education (FAQ) */}
        <PatientEducation />

        {/* 7. Reviews */}
        <ReviewsSection />

        {/* 8. Consultation Form */}
        <ConsultationForm prefilledService={selectedService} />

        {/* 9. Contact & Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
