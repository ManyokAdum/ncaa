import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

// ─── Configuration ────────────────────────────────────────────────────────────
const WHATSAPP_PHONE = "211910111997"; // E.164: +211 91 011 1997 (no "+" for wa.me)
const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

const QUICK_REPLIES = [
  {
    id: "membership",
    label: "Membership Inquiry",
    message: "Hello NCA, I would like to know how to become a member.",
  },
  {
    id: "elections",
    label: "Elections Information",
    message: "Hello NCA, I would like information about upcoming elections.",
  },
  {
    id: "events",
    label: "Events Information",
    message: "Hello NCA, I would like information about upcoming events.",
  },
  {
    id: "general",
    label: "General Inquiry",
    message: "Hello NCA, I have a general question.",
  },
] as const;

// On-site info links – get information without leaving the site
const SITE_INFO_LINKS = [
  { to: "/membership", label: "Membership" },
  { to: "/events", label: "Events" },
  { to: "/elections", label: "Elections" },
  { to: "/scholarship", label: "Scholarship" },
  { to: "/about", label: "About NCA" },
  { to: "/contact", label: "Contact" },
] as const;

// ─── WhatsApp SVG Icon (official brand mark, 2024) ───────────────────────────
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Close the panel when navigating to a different page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close on Escape key press for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close when clicking outside the panel
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Hide widget on admin routes so it does not interfere with the admin UI
  if (isAdminRoute) return null;

  const handleQuickReply = (message: string) => {
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Quick-reply panel ── */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Chat with NCA on WhatsApp"
        aria-modal="true"
        aria-hidden={isOpen ? "false" : "true"}
        className={[
          "fixed bottom-24 right-4 sm:right-6 z-50",
          "w-72 sm:w-80",
          "bg-card rounded-2xl shadow-2xl border border-border",
          "overflow-hidden",
          "transition-all duration-300 ease-out origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        ].join(" ")}
      >
        {/* Header – brand primary (lavender) */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center">
            <WhatsAppIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground font-semibold text-sm leading-tight">
              NCA Support
            </p>
            <p className="text-primary-foreground/80 text-xs">
              Typically replies within minutes
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close WhatsApp chat"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors p-1 rounded-full hover:bg-primary-foreground/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Greeting bubble – muted brand tint */}
        <div className="px-4 pt-4 pb-2">
          <div className="inline-block bg-muted rounded-2xl rounded-tl-none px-4 py-3 text-sm text-foreground max-w-[90%]">
            Hi there! 👋 Get info on the site below, or send us a message on
            WhatsApp.
          </div>
        </div>

        {/* Chat area: on-site info + WhatsApp quick replies */}
        <div className="px-4 pb-3 flex flex-col gap-3 max-h-[min(60vh,320px)] overflow-y-auto">
          {/* Get information on the site */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Find information on our website
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SITE_INFO_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg border border-border bg-muted/80 hover:bg-muted text-foreground text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* WhatsApp quick-reply options */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Message us on WhatsApp
            </p>
            <ul className="space-y-2" role="list">
              {QUICK_REPLIES.map(({ id, label, message }) => (
                <li key={id}>
                  <button
                    onClick={() => handleQuickReply(message)}
                    className="w-full text-left px-4 py-2.5 rounded-xl border border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-900 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground pb-3 px-4 border-t border-border pt-2">
          WhatsApp options open in a new tab
        </p>
      </div>

      {/* ── Floating trigger button ── */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group">
        {/* Tooltip – brand primary-800 for harmony */}
        <span
          aria-hidden="true"
          className={[
            "absolute right-full mr-3 top-1/2 -translate-y-1/2",
            "whitespace-nowrap bg-primary-800 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg",
            "pointer-events-none select-none",
            "transition-all duration-200",
            "opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0",
            // Never show tooltip when panel is open – avoids visual clutter
            isOpen ? "!opacity-0" : "",
          ].join(" ")}
        >
          Chat with NCA
          {/* Arrow */}
          <span className="absolute top-1/2 -translate-y-1/2 right-[-4px] w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-primary-800" />
        </span>

        {/* Attention-grabbing ping ring – brand primary, shown only when panel is closed */}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-primary-400 animate-whatsapp-pulse"
          />
        )}

        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Chat with NCA on WhatsApp"
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="whatsapp-chat-panel"
          className={[
            "relative flex items-center justify-center",
            "w-14 h-14 rounded-full",
            "bg-primary hover:bg-primary-600 active:bg-primary-700",
            "shadow-xl hover:shadow-2xl",
            "transition-all duration-300",
            "hover:scale-110 active:scale-95",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2",
          ].join(" ")}
        >
          {/* Rotate between WhatsApp icon and close icon */}
          <span
            className={`absolute transition-all duration-300 ${isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
          >
            <WhatsAppIcon className="w-7 h-7 text-primary-foreground" />
          </span>
          <span
            className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
          >
            <svg
              className="w-6 h-6 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

export default WhatsAppChat;
