import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Letters, Reveal } from "@/features/karunadu/components/Motion";
import { Lotus } from "@/features/karunadu/components/Motifs";

// Mysore silk on the loom, with the Kaveri flowing beneath.
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#22060f]" data-cursor="water">
      <section className="loom weave relative overflow-hidden px-4 pb-24 pt-40">
        <div className="zari absolute inset-x-0 bottom-0" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-[#ffcc00]">
              <MessageCircle className="h-9 w-9" />
              <Letters as="h1" text="ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ" className="f-serif text-4xl font-bold md:text-7xl" step={70} />
            </div>
            <Reveal delay={700}>
              <p className="mx-auto max-w-3xl text-xl text-[#fbf3e2]/90">Have questions, suggestions, or want to get involved? We'd love to hear from you!</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        {/* the Kaveri */}
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M-20 ${180 + i * 40} C 300 ${100 + i * 40}, 520 ${300 + i * 30}, 760 ${200 + i * 40} S 1200 ${120 + i * 40}, 1460 ${220 + i * 30}`}
              stroke="#1d7f86"
              strokeWidth={16 - i * 4}
              fill="none"
              opacity={0.35 - i * 0.08}
              className="flow"
            />
          ))}
        </svg>
        <Lotus className="float absolute right-[8%] top-10 hidden h-24 w-auto md:block" />
        <Lotus className="float absolute bottom-10 left-[6%] hidden h-16 w-auto md:block" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="scale" className="mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-[32px] border border-[#f6dc8c]/30 bg-[linear-gradient(160deg,#4a0d1e,#2a0612)] p-8 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] md:p-12">
              <div className="zari--pink zari absolute inset-x-0 top-0" />
              <h2 className="f-display mt-4 text-3xl font-semibold text-[#f6dc8c]">Contact Information</h2>
              <div className="mt-8 space-y-8">
                <a href="mailto:kannadakoota.ecc@pes.edu" className="group flex items-start gap-4">
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-[#ffcc00]/15 transition-transform duration-500 group-hover:rotate-12">
                    <Mail className="h-6 w-6 text-[#ffcc00]" />
                  </span>
                  <span>
                    <span className="block font-semibold text-[#fbf3e2]">Email</span>
                    <span className="stitch text-[#fbf3e2]/75">kannadakoota.ecc@pes.edu</span>
                  </span>
                </a>
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-[#ffcc00]/15">
                    <MapPin className="h-6 w-6 text-[#ffcc00]" />
                  </span>
                  <span>
                    <span className="block font-semibold text-[#fbf3e2]">Location</span>
                    <span className="text-[#fbf3e2]/75">
                      PES University<br />
                      Electronic City Campus<br />
                      Bangalore, Karnataka
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
