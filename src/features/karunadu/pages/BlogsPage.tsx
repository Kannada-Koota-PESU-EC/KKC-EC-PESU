import { Reveal } from "@/features/karunadu/components/Motion";
import { useTilt } from "@/features/karunadu/hooks";

const videos = [
  { id: 1, title: "Blog 1", src: "/blog1.mp4" },
  { id: 2, title: "Blog 2", src: "/blog2.mp4" },
  { id: 3, title: "Blog 3", src: "/blog3.mp4" },
];

function FilmFrame({ title, src }: { title: string; src: string }) {
  const tilt = useTilt(8);
  return (
    <div onPointerMove={tilt.onPointerMove} onPointerLeave={tilt.onPointerLeave} style={tilt.style} className="group overflow-hidden rounded-xl bg-[#0d0806] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]">
      <div className="film-holes" />
      <div className="relative px-3">
        <video src={src} controls preload="metadata" className="h-56 w-full rounded-md bg-black object-cover" />
      </div>
      <div className="film-holes" />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-[#f7ecd0]">{title}</h2>
      </div>
    </div>
  );
}

// Sandalwood (Kannada cinema): a projector throws light onto film frames.
export default function BlogsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0806] py-16 pt-36" data-cursor="film">
      <div className="projector-beam pointer-events-none absolute left-1/2 top-0 h-[120vh] w-[160vw] -translate-x-1/2" />
      <div className="film-scratch pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal variant="focus">
          <h1 className="f-display mb-14 text-center text-6xl font-bold text-[#f7ecd0] drop-shadow-[0_0_30px_rgba(255,236,180,0.35)] md:text-8xl">Blogs</h1>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={i * 150} variant="wipe">
              <FilmFrame title={video.title} src={video.src} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
