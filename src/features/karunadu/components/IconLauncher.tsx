import KarnatakaIcon from "@/features/karunadu/components/KarnatakaIcon";
import { useNavigate } from "react-router-dom";

/* The one icon that holds all of Karnataka – click to fly across it in 3D */
export default function IconLauncher({ className = "", size = "h-40 w-40", label = true }: { className?: string; size?: string; label?: boolean }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/karunadu")} className={`kd-icon-btn group relative ${className}`} aria-label="Open the 3D journey across Karnataka" data-cursor="zari">
      <span className="kd-icon-halo pointer-events-none absolute inset-0 rounded-full border-2 border-[#ffcc00]/60" />
      <KarnatakaIcon className={size} />
      {label && <span className="f-serif mt-3 block text-center text-sm text-[#f6dc8c] opacity-80 transition-opacity group-hover:opacity-100">ಕರುನಾಡು · 3D</span>}
    </button>
  );
}
