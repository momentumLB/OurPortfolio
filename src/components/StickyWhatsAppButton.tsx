import { WHATSAPP_URL } from '../constants/contact';

export function StickyWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-4 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:left-5 sm:bottom-5 sm:h-[3.75rem] sm:w-[3.75rem]"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <i className="ri-whatsapp-line text-3xl sm:text-[2rem] leading-none" aria-hidden />
    </a>
  );
}
