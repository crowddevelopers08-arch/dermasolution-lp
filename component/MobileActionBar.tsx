"use client";

import { BookButton } from "@/component/consultation-form";

const phoneNumber = "+916363136080";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-1 z-50 rounded-full border border-[#E8E0D2] bg-[#FBF8F3]/95 p-1 shadow-[0_-6px_20px_rgba(31,31,31,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-[620px] grid-cols-2 gap-3">
        <a href={`tel:${phoneNumber}`} className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#C99045] text-[14px] font-extrabold text-[#1F1F1F] no-underline transition hover:bg-[#C99045]/10">
          <PhoneIcon />
          Call Now
        </a>
        <BookButton className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C99045] text-[14px] font-extrabold text-white shadow-sm transition hover:bg-[#B5802F] active:scale-[0.98]">
          Book Now
          <ArrowIcon />
        </BookButton>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3h4l1 5-3 2c2 4 3 5 7 7l2-3 4 1v4c0 2-2 3-4 2C9 19 5 15 3 7 2 5 4 3 7 3Z" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
