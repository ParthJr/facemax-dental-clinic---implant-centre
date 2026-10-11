import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#10233F]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] max-w-2xl w-full rounded-lg shadow-xl p-6 sm:p-8 border border-[#EDF2F7] relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#34445B] hover:text-[#10233F] rounded-md hover:bg-[#EDF2F7] transition-colors"
          aria-label="Close Privacy Policy"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />
          <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider">
            CLINICAL PRIVACY & DATA GOVERNANCE
          </span>
        </div>

        <h3 className="font-sora text-2xl font-bold text-[#10233F] mb-4">
          Patient Data & Privacy Policy
        </h3>

        <div className="space-y-4 font-manrope text-xs sm:text-sm text-[#34445B] leading-relaxed">
          <p>
            At <strong className="text-[#10233F]">{BUSINESS_CONFIG.name}</strong>, patient confidentiality, medical record security, and clinical privacy are paramount obligations.
          </p>

          <h4 className="font-sora text-sm font-bold text-[#10233F] pt-2">1. Information We Collect</h4>
          <p>
            When you submit a consultation enquiry, we collect your full name, contact phone number, preferred service of interest, preferred appointment date/time, and any clinical notes you choose to share.
          </p>

          <h4 className="font-sora text-sm font-bold text-[#10233F] pt-2">2. Use of Information</h4>
          <p>
            Your information is strictly used by authorized FACEMAX clinical coordinators to verify appointment schedules, provide pre-consultation guidance, and communicate regarding your diagnostic or treatment inquiries.
          </p>

          <h4 className="font-sora text-sm font-bold text-[#10233F] pt-2">3. Zero Third-Party Disclosure</h4>
          <p>
            We do not sell, rent, or lease patient contact information or clinical details to third-party marketers or advertisers. All records remain within the secure clinical management environment.
          </p>

          <h4 className="font-sora text-sm font-bold text-[#10233F] pt-2">4. Medical Records & Confidentiality</h4>
          <p>
            Diagnostic imaging, CBCT 3D scans, and treatment plans recorded during clinical consultations are stored in accordance with professional medical data standards and ethical dental practice guidelines in Gujarat, India.
          </p>

          <h4 className="font-sora text-sm font-bold text-[#10233F] pt-2">5. Direct Inquiries</h4>
          <p>
            For any privacy inquiries or to update your contact preferences, please contact our Kudasan suite directly at <strong className="text-[#10233F]">{BUSINESS_CONFIG.contact.phoneDisplay}</strong> or email <strong className="text-[#10233F]">{BUSINESS_CONFIG.contact.email}</strong>.
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-[#EDF2F7] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-xs px-5 py-2.5 rounded-md hover:bg-[#34445B] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
