import React, { useState } from 'react';
import { Calendar, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

interface ConsultationFormProps {
  prefilledService?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ prefilledService }) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState(prefilledService || 'General Consultation & Checkup');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeWindow, setPreferredTimeWindow] = useState('Morning (10:00 AM - 01:00 PM)');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    id: string;
    fullName: string;
    mobile: string;
    service: string;
    preferredDate: string;
    preferredTimeWindow: string;
  } | null>(null);

  // Sync prefilled service when prop changes
  React.useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  // Set min date to today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const cleanPhone = mobile.replace(/\D/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanPhone)) {
      errors.mobile = 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).';
    }

    if (preferredDate) {
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errors.preferredDate = 'Please select today or a future date.';
      }
    }

    if (!consent) {
      errors.consent = 'You must agree to privacy consent to submit an enquiry.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        mobile: mobile.trim(),
        service,
        preferredDate: preferredDate || 'As soon as available',
        preferredTimeWindow,
        clinicalNotes: clinicalNotes.trim(),
        consent
      };

      const endpoint = BUSINESS_CONFIG.apiConfig.consultationEndpoint;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Unable to log consultation request.');
      }

      setSubmissionSuccess({
        id: resData.id || `FM-${Date.now().toString(36).toUpperCase()}`,
        fullName: payload.fullName,
        mobile: payload.mobile,
        service: payload.service,
        preferredDate: payload.preferredDate,
        preferredTimeWindow: payload.preferredTimeWindow
      });

      // Reset form fields
      setFullName('');
      setMobile('');
      setClinicalNotes('');
      setPreferredDate('');
      setConsent(false);
      setFieldErrors({});

    } catch (err: any) {
      console.error('[FACEMAX Form Submission Error]:', err);
      setErrorMsg(err.message || 'An error occurred while submitting your enquiry. Please verify your connection or call 090338 65172 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setErrorMsg(null);
  };

  return (
    <section id="consultation-form" className="w-full bg-[#10233F] text-[#FFFFFF] py-16 lg:py-24">
      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Context Column */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-3 h-[2px] bg-[#C5A46D]"></span>
              <span className="font-sora text-xs font-semibold text-[#C5A46D] uppercase tracking-widest">
                CLINICAL DIALOGUE
              </span>
            </div>

            <h2 className="font-sora text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FFFFFF] tracking-tight leading-snug">
              LET'S DISCUSS YOUR DENTAL CARE.
            </h2>

            <p className="font-manrope text-base text-[#EDF2F7]/80 leading-relaxed">
              Tell us how to reach you and what you would like to discuss. The clinic team will review availability and follow up promptly with appointment options.
            </p>

            <div className="space-y-3 font-manrope text-xs sm:text-sm text-[#EDF2F7]/70 pt-2 border-t border-[#34445B]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Your privacy and clinical records are kept strictly confidential.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Typical callback response within business hours.</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] text-[#202733] p-6 sm:p-8 md:p-10 rounded-lg shadow-xl border border-[#EDF2F7]">
            
            {submissionSuccess ? (
              <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#10233F] text-[#C5A46D] mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="font-sora text-xs font-bold text-[#C5A46D] uppercase tracking-wider block">
                    REFERENCE ID: {submissionSuccess.id}
                  </span>
                  <h3 className="font-sora text-2xl font-bold text-[#10233F]">
                    Enquiry Received
                  </h3>
                  <p className="font-manrope text-sm text-[#34445B] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#10233F]">{submissionSuccess.fullName}</span>. Our clinic coordinator in Kudasan will review your requested time for <span className="font-semibold text-[#10233F]">{submissionSuccess.service}</span> and contact you shortly.
                  </p>
                </div>

                <div className="bg-[#F5F8FC] p-4 rounded-md border border-[#EDF2F7] text-left text-xs font-manrope text-[#34445B] space-y-1.5 max-w-md mx-auto">
                  <p><span className="font-semibold text-[#10233F]">Contact Mobile:</span> {submissionSuccess.mobile}</p>
                  <p><span className="font-semibold text-[#10233F]">Requested Date:</span> {submissionSuccess.preferredDate}</p>
                  <p><span className="font-semibold text-[#10233F]">Time Window:</span> {submissionSuccess.preferredTimeWindow}</p>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 font-manrope text-sm font-semibold text-[#10233F] hover:text-[#C5A46D] underline pt-2"
                >
                  Submit another inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-4 bg-[#ba1a1a]/10 border border-[#ba1a1a]/30 rounded-md text-[#ba1a1a] font-manrope text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="fullName" className="font-sora text-[11px] font-semibold text-[#34445B] uppercase">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priyesh Patel"
                    className={`h-11 px-3.5 bg-[#F5F8FC] rounded-md font-manrope text-sm text-[#10233F] border ${
                      fieldErrors.fullName ? 'border-[#ba1a1a]' : 'border-[#EDF2F7]'
                    } focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/40 transition-all`}
                  />
                  {fieldErrors.fullName && (
                    <span className="text-[11px] text-[#ba1a1a] font-manrope">{fieldErrors.fullName}</span>
                  )}
                </div>

                {/* Mobile Phone with +91 */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="mobile" className="font-sora text-[11px] font-semibold text-[#34445B] uppercase">
                    Mobile Contact Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 bg-[#EDF2F7] text-[#10233F] font-manrope text-sm font-semibold rounded-l-md border border-r-0 border-[#EDF2F7] select-none">
                      +91
                    </span>
                    <input
                      id="mobile"
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="90338 65172"
                      className={`h-11 px-3.5 w-full bg-[#F5F8FC] rounded-r-md font-manrope text-sm text-[#10233F] border ${
                        fieldErrors.mobile ? 'border-[#ba1a1a]' : 'border-[#EDF2F7]'
                      } focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/40 transition-all`}
                    />
                  </div>
                  {fieldErrors.mobile && (
                    <span className="text-[11px] text-[#ba1a1a] font-manrope">{fieldErrors.mobile}</span>
                  )}
                </div>

                {/* Service of Interest */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="service" className="font-sora text-[11px] font-semibold text-[#34445B] uppercase">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="h-11 px-3.5 bg-[#F5F8FC] rounded-md font-manrope text-sm text-[#10233F] border border-[#EDF2F7] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/40 transition-all"
                  >
                    <option value="General Consultation & Checkup">General Consultation & Checkup</option>
                    <option value="Dental Implants & Tooth Replacement">Dental Implants & Tooth Replacement</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry / Veneers</option>
                    <option value="Restorative Dentistry">Restorative Crowns & Bridges</option>
                    <option value="Orthodontic Consultations">Clear Aligners & Orthodontics</option>
                    <option value="Second Opinion / Diagnostic Review">Second Opinion / Diagnostic Review</option>
                  </select>
                </div>

                {/* Preferred Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="preferredDate" className="font-sora text-[11px] font-semibold text-[#34445B] uppercase">
                      Preferred Date
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`h-11 px-3.5 bg-[#F5F8FC] rounded-md font-manrope text-sm text-[#10233F] border ${
                        fieldErrors.preferredDate ? 'border-[#ba1a1a]' : 'border-[#EDF2F7]'
                      } focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/40 transition-all`}
                    />
                    {fieldErrors.preferredDate && (
                      <span className="text-[11px] text-[#ba1a1a] font-manrope">{fieldErrors.preferredDate}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="preferredTimeWindow" className="font-sora text-[11px] font-semibold text-[#34445B] uppercase">
                      Preferred Window
                    </label>
                    <select
                      id="preferredTimeWindow"
                      value={preferredTimeWindow}
                      onChange={(e) => setPreferredTimeWindow(e.target.value)}
                      className="h-11 px-3.5 bg-[#F5F8FC] rounded-md font-manrope text-sm text-[#10233F] border border-[#EDF2F7] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/40 transition-all"
                    >
                      {BUSINESS_CONFIG.schedule.timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional Message */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="clinicalNotes" className="font-sora text-[11px] font-semibold text-[#34445B] uppercase">
                    Clinical Notes / Specific Questions (Optional)
                  </label>
                  <textarea
                    id="clinicalNotes"
                    rows={2}
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Brief details about any current symptoms, dental history, or particular concerns..."
                    className="p-3 bg-[#F5F8FC] rounded-md font-manrope text-sm text-[#10233F] border border-[#EDF2F7] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/40 transition-all"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#10233F] focus:ring-[#C5A46D]"
                  />
                  <label htmlFor="consent" className="font-manrope text-xs text-[#34445B] leading-tight">
                    I agree to be contacted by FACEMAX clinic staff to discuss appointment availability.
                  </label>
                </div>
                {fieldErrors.consent && (
                  <span className="text-[11px] text-[#ba1a1a] font-manrope block">{fieldErrors.consent}</span>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-sm py-3.5 rounded-md shadow-md hover:bg-[#34445B] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C5A46D]" />
                        <span>RECORDING CLINICAL ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>REQUEST A CONSULTATION</span>
                        <Send className="w-4 h-4 text-[#C5A46D]" />
                      </>
                    )}
                  </button>

                  <p className="font-manrope text-[11px] text-[#34445B] text-center mt-2">
                    Submitting an enquiry does not confirm an appointment until confirmed by the clinic team.
                  </p>
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
