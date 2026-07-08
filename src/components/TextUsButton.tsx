"use client";

const PHONE_NUMBER = "6472255158";

export default function TextUsButton() {
  return (
    <a
      href={`sms:+1${PHONE_NUMBER}&body=Hi! I'm interested in booking a Cottage Creators cottage direct — could you help?`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-pine-deep text-bone pl-4 pr-5 py-3.5 rounded-full shadow-lg hover:bg-pine transition-colors hover:scale-105 active:scale-95"
      aria-label="Text us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM6 9h2v2H6V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z" />
      </svg>
      <span className="font-medium text-sm">Text Us</span>
    </a>
  );
}
