import { site } from '@/shared/data/site';

/** "in" mark on LinkedIn blue */
function LinkedInMark({ className = '' }: { className?: string }) {
  return (
    // The "in" is drawn in CSS (::after) so it isn't part of the link's text
    <span className={`dev-badge-linkedin ${className}`} aria-hidden="true" />
  );
}

/**
 * Small developer photo in the footer bottom bar. Hover flips it to the LinkedIn mark;
 * touch screens show a small LinkedIn badge instead. Details come from site.json.
 */
export default function DeveloperBadge() {
  const { name, photo, linkedin, portfolio } = site.developer;
  // Second tooltip line, e.g. "Portfolio: sharath-gr.vercel.app"
  const portfolioHost = portfolio ? new URL(portfolio).host : '';
  const tooltip = portfolioHost ? `${name} · LinkedIn\nPortfolio: ${portfolioHost}` : `${name} · LinkedIn`;

  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="dev-badge"
    >
      {/* Tooltip text comes from data-tooltip via CSS, so it doesn't change the accessible name */}
      <span className="dev-badge-tooltip" data-tooltip={tooltip} aria-hidden="true" />

      <span className="dev-badge-flip">
        <span className="dev-badge-face dev-badge-front">
          <img src={photo} alt="" width={44} height={44} loading="lazy" decoding="async" />
        </span>
        <span className="dev-badge-face dev-badge-back">
          <LinkedInMark />
        </span>
      </span>

      {/* Touch screens: no hover, so show a small badge instead */}
      <LinkedInMark className="dev-badge-corner" />
    </a>
  );
}
