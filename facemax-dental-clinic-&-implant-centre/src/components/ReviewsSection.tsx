import React from 'react';
import { Star, ExternalLink, ShieldCheck, Quote } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export const ReviewsSection: React.FC = () => {
  const { googleRating, googleReviewCount, featuredReview } = BUSINESS_CONFIG.reputation;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-16 lg:py-24">
      <div className="bg-[#FFFFFF] p-6 sm:p-10 lg:p-12 rounded-lg border border-[#EDF2F7] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Score Module */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F8FC] rounded-md border border-[#EDF2F7]">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span className="font-sora text-xs font-semibold text-[#10233F] uppercase tracking-wider">
                CLINIC REPUTATION
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-sora text-5xl sm:text-6xl font-bold text-[#10233F]">
                {googleRating.toFixed(1)}
              </span>
              <span className="font-sora text-2xl text-[#34445B] font-normal">
                / 5.0
              </span>
            </div>

            <div className="flex items-center text-[#C5A46D] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-[#C5A46D]" />
              ))}
            </div>

            <p className="font-manrope text-sm text-[#34445B]">
              Based on {googleReviewCount} verified Google Patient Reviews in Gandhinagar.
            </p>

            <a
              href={BUSINESS_CONFIG.verifiedLinks.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#10233F] text-[#FFFFFF] font-manrope font-semibold text-xs uppercase px-5 py-2.5 rounded-md hover:bg-[#34445B] transition-colors mt-2"
            >
              <span>READ GOOGLE REVIEWS</span>
              <ExternalLink className="w-4 h-4 text-[#C5A46D]" />
            </a>
          </div>

          {/* Featured Testimonial Excerpt */}
          <div className="lg:col-span-7 bg-[#F5F8FC] p-6 sm:p-8 rounded-lg border border-[#EDF2F7] relative">
            <Quote className="w-10 h-10 text-[#C5A46D]/20 absolute top-4 right-4" />

            <div className="flex items-center gap-1 text-[#C5A46D] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-[#C5A46D]" />
              ))}
            </div>

            <blockquote className="font-manrope text-base sm:text-lg text-[#10233F] italic leading-relaxed mb-6">
              “{featuredReview.quote}”
            </blockquote>

            <div className="flex items-center justify-between border-t border-[#EDF2F7] pt-4">
              <div>
                <p className="font-sora text-sm font-bold text-[#10233F]">
                  {featuredReview.author}
                </p>
                <p className="font-manrope text-xs text-[#34445B]">
                  {featuredReview.subtitle}
                </p>
              </div>

              <span className="text-[#C5A46D] font-sora text-[10px] font-semibold uppercase tracking-wider bg-[#FFFFFF] px-2.5 py-1 rounded border border-[#EDF2F7]">
                {featuredReview.platform}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
