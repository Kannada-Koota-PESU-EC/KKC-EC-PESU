import { useState } from "react";
import { Link } from "react-router-dom";
import { Crown, ExternalLink, Github, Instagram, Linkedin, Star, Users } from "lucide-react";
import { getAllYears, getClubHeads, getDomainHeads, type Member } from "@/features/team/data/team";
import { Letters, Magnetic, Reveal } from "@/features/karunadu/components/Motion";
import { useTilt } from "@/features/karunadu/hooks";

/* Bidriware: black metal, silver inlay that draws itself on hover */
function BidriCard({ member }: { member: Member }) {
  const tilt = useTilt(10);
  const lead = member.role === "Club Head" || member.role === "Vice Head";
  const socialLinks = [
    { platform: "linkedin", url: member.linkedin, Icon: Linkedin },
    { platform: "instagram", url: member.instagram, Icon: Instagram },
    { platform: "github", url: member.github, Icon: Github },
  ].filter((s) => s.url);

  return (
    <div
      className="bidri group relative h-full overflow-hidden rounded-[26px] p-6 text-center shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={tilt.style}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="8" y="8" width="calc(100% - 16px)" height="calc(100% - 16px)" rx="18" className="bidri-inlay" pathLength={1} vectorEffect="non-scaling-stroke" />
        <rect x="14" y="14" width="calc(100% - 28px)" height="calc(100% - 28px)" rx="14" className="bidri-inlay" pathLength={1} vectorEffect="non-scaling-stroke" strokeDasharray="1" style={{ opacity: 0.5 }} />
      </svg>
      <span className="silver-sheen pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="mx-auto w-fit rounded-full bg-[conic-gradient(#d6dde3,#6b737c,#d6dde3,#6b737c,#d6dde3)] p-[3px] transition-transform duration-700 group-hover:rotate-[360deg]">
          <img
            src={member.photo}
            alt={`${member.name} - ${member.role}`}
            loading="lazy"
            className={`${lead ? "h-28 w-28" : "h-24 w-24"} rounded-full border-4 border-[#17191c] object-cover transition-transform duration-700 group-hover:-rotate-[360deg]`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
        <h3 className="mt-5 text-xl font-bold leading-snug text-[#eef2f5]">{member.name}</h3>
        <p className={`mt-1 font-semibold ${lead ? "text-[#ffcc00]" : "text-[#d6dde3]"}`}>{member.role}</p>
        {member.domain && <p className="mt-1 text-sm text-[#d6dde3]/70">{member.domain}</p>}
        {member.bio && <p className="mt-2 text-sm leading-relaxed text-[#d6dde3]/70">{member.bio}</p>}

        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-3 pt-5">
            {socialLinks.map(({ platform, url, Icon }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s ${platform} profile`}
                className="grid h-9 w-9 place-items-center rounded-full border border-[#d6dde3]/40 text-[#d6dde3] transition-all hover:-translate-y-1 hover:bg-[#d6dde3] hover:text-[#17191c]"
              >
                {Icon ? <Icon className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              </a>
            ))}
          </div>
        )}

        <div className="pt-4">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${lead ? "bg-[#ffcc00] text-[#17191c]" : "bg-[#d6dde3] text-[#17191c]"}`}>
            {member.year} Team
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const allYears = getAllYears();
  const [selectedYear, setSelectedYear] = useState(allYears[0] || new Date().getFullYear());
  const clubHeads = getClubHeads(selectedYear);
  const domainHeads = getDomainHeads(selectedYear);

  const renderSection = (title: string, members: Member[], icon: JSX.Element) => {
    if (members.length === 0) return null;
    return (
      <div className="mb-20">
        <Reveal className="mb-10 flex items-center justify-center gap-3">
          {icon}
          <h2 className="f-display text-4xl font-semibold text-[#eef2f5]">{title}</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, i) => (
            <Reveal key={member.id} delay={(i % 4) * 90} className="h-full">
              <BidriCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#2b2f34,#0d0e10_60%)]" data-cursor="silver">
      <section className="relative overflow-hidden px-4 pb-16 pt-40 text-center">
        <svg viewBox="0 0 400 400" className="spin-rev pointer-events-none absolute left-1/2 top-24 h-[620px] w-[620px] -translate-x-1/2 opacity-20" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d="M200 200 C 230 150, 230 90, 200 40 C 170 90, 170 150, 200 200 Z" fill="none" stroke="#d6dde3" strokeWidth="1.2" transform={`rotate(${i * 30} 200 200)`} />
          ))}
          <circle cx="200" cy="200" r="180" fill="none" stroke="#d6dde3" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
        <div className="relative mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-center gap-3 text-[#d6dde3]">
            <Users className="h-9 w-9" />
            <Letters as="h1" text="ನಮ್ಮ ತಂಡ" className="f-serif text-5xl font-bold md:text-7xl" step={90} />
          </div>
          <Reveal delay={500}>
            <p className="text-xl leading-relaxed text-[#eef2f5]/85">Meet the dedicated individuals who drive our community forward.</p>
          </Reveal>
          <Reveal delay={650}>
            <p className="f-serif text-base text-[#d6dde3]/75">ಕನ್ನಡ ಕೂಟದ ಹಿಂದಿರುವ ಶಕ್ತಿ ನಮ್ಮ ತಂಡ</p>
          </Reveal>
        </div>
      </section>

      <section className="sticky top-[60px] z-20 border-y border-[#d6dde3]/10 bg-[#0d0e10]/80 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:flex-row">
          <span className="text-[#d6dde3]/70">Batch of:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {allYears.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                aria-pressed={selectedYear === year}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  selectedYear === year ? "bg-[#d6dde3] text-[#17191c] shadow-[0_0_24px_rgba(214,221,227,0.35)]" : "border border-[#d6dde3]/30 text-[#d6dde3] hover:border-[#d6dde3]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div key={selectedYear} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {renderSection("Club Heads", clubHeads, <Crown className="h-8 w-8 text-[#ffcc00]" />)}
          {renderSection("Domain Heads", domainHeads, <Star className="h-8 w-8 text-[#d6dde3]" />)}
          {clubHeads.length === 0 && domainHeads.length === 0 && (
            <div className="py-12 text-center">
              <Users className="mx-auto mb-4 h-16 w-16 text-[#d6dde3]/50" />
              <h3 className="mb-2 text-xl font-semibold text-[#eef2f5]">No members found for {selectedYear}</h3>
              <p className="text-[#d6dde3]/70">Please select another year or check back later.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#17191c,#2b2f34_50%,#17191c)]" />
        <Reveal className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="f-display text-4xl font-semibold text-[#eef2f5]">Interested in Joining Our Team?</h2>
          <p className="mb-8 mt-4 text-lg text-[#d6dde3]/80">We are always looking for passionate individuals to contribute to our mission.</p>
          <Magnetic>
            <Link to="/contact" className="btn-silk text-lg">Contact Us</Link>
          </Magnetic>
        </Reveal>
      </section>
    </div>
  );
}
