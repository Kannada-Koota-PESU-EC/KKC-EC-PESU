interface BilingualProps {
  kn: string;
  en: string;
  className?: string;
  /** Classes for the English half. Kannada is never letter-spaced, because spacing breaks Kannada conjuncts. */
  enClassName?: string;
}

export default function Bilingual({
  kn,
  en,
  className = "",
  enClassName = "uppercase tracking-[0.18em]",
}: BilingualProps) {
  return (
    <span className={className}>
      <span lang="kn">{kn}</span>
      <span aria-hidden="true"> · </span>
      <span className={enClassName}>{en}</span>
    </span>
  );
}