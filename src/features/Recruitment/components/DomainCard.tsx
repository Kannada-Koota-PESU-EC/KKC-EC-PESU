import { RecruitmentDomain } from "@/features/Recruitment/data/recruitment";
import { useReveal } from "@/features/Recruitment/hooks/use-reveal";

interface DomainCardProps {
  domain: RecruitmentDomain;
  index: number;
}

export default function DomainCard({ domain, index }: DomainCardProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const Icon = domain.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    // Outer wrapper handles the scroll reveal (with a small per-column stagger),
    // so the reveal delay never affects the card's hover transitions.
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${(index % 3) * 90}ms` : "0ms" }}
      className={`h-full transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <article
        id={`domain-${domain.id}`}
        data-testid="recruitment-domain"
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/85 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.22),0_18px_42px_-22px_hsl(var(--primary)/0.6)] motion-reduce:hover:translate-y-0"
      >
        {/* Accent bar that sweeps in on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        {/* Soft glow */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <span className="font-mono text-sm font-semibold text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary">
            {number}
          </span>
        </div>

        <h3 className="relative mt-5 text-xl font-bold text-foreground">
          {domain.name}
        </h3>
        <p className="relative mt-1 text-base font-semibold text-primary/80 kannada-text">
          {domain.kannadaName}
        </p>
        <p className="relative mt-3 text-[0.95rem] leading-loose text-muted-foreground md:text-base kannada-text">
          {domain.description}
        </p>
      </article>
    </div>
  );
}
