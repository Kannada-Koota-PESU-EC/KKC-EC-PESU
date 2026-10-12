import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Diya, Gopura, MysuruPalace } from "@/features/karunadu/components/Motifs";
import { Reveal } from "@/features/karunadu/components/Motion";

// Footer text is exactly the original site's footer.
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#12030a] pt-40 text-[#fbf3e2]" data-cursor="ember">
      {/* skyline of the land behind the footer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 text-[#2a0a14]" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between opacity-90">
          <Gopura className="h-36 w-auto" />
          <MysuruPalace className="h-28 w-[60%]" />
          <Gopura className="h-36 w-auto" />
        </div>
      </div>
      <div className="ilkal-edge" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-b from-[#ffcc00] from-50% to-[#d6262b] to-50%">
                <span className="f-serif text-lg font-bold text-[#1a0a06]">ಕ</span>
              </div>
              <span className="f-serif text-2xl font-bold">ಕನ್ನಡ ಕೂಟ</span>
            </div>
            <p className="text-sm leading-relaxed text-[#fbf3e2]/75">
              Celebrating and preserving Kannada culture, language, and traditions at PES University Electronic City Campus.
            </p>
            <p className="f-serif text-sm text-[#f6dc8c]/80">ಕನ್ನಡ ಸಂಸ್ಕೃತಿಯನ್ನು ಉಳಿಸುವ ನಮ್ಮ ಪ್ರಯತ್ನ</p>
          </Reveal>

          <Reveal delay={100} className="space-y-4">
            <h3 className="f-display text-xl font-semibold text-[#f6dc8c]">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/events" className="stitch text-[#fbf3e2]/80 hover:text-[#fbf3e2]">Upcoming Events</Link></li>
              <li><Link to="/team" className="stitch text-[#fbf3e2]/80 hover:text-[#fbf3e2]">Our Team</Link></li>
              <li><Link to="/upis" className="stitch text-[#fbf3e2]/80 hover:text-[#fbf3e2]">Support Us</Link></li>
              <li><Link to="/contact" className="stitch text-[#fbf3e2]/80 hover:text-[#fbf3e2]">Get in Touch</Link></li>
            </ul>
          </Reveal>

          <Reveal delay={200} className="space-y-4">
            <h3 className="f-display text-xl font-semibold text-[#f6dc8c]">Contact</h3>
            <div className="space-y-3 text-sm text-[#fbf3e2]/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#ffcc00]" />
                <span>kannadakoota.ecc@pes.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#ffcc00]" />
                <span>PES University, EC, Bangalore</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300} className="space-y-4">
            <h3 className="f-display text-xl font-semibold text-[#f6dc8c]">Follow Us</h3>
            <a
              href="https://www.instagram.com/kannadakoota_ecc?igsh=eGJnODZ6Njd0dTU5"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#b3134f] via-[#d6262b] to-[#ffcc00] transition-transform duration-500 hover:rotate-[360deg] hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <p className="text-xs text-[#fbf3e2]/65">Stay updated with our latest events and activities</p>
          </Reveal>
        </div>

        <div className="mt-14 flex items-end justify-center gap-4 md:gap-8" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <Diya key={i} className="h-10 w-10 md:h-12 md:w-12" delay={(i % 3) * 0.4} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#f6dc8c]/15 pt-8 sm:flex-row">
          <p className="text-xs text-[#fbf3e2]/60">© {currentYear} Kannada Koota EC PES. All rights reserved.</p>
          <p className="text-xs text-[#fbf3e2]/60">Made with ❤️ for preserving Kannada culture</p>
        </div>
      </div>
    </footer>
  );
}
