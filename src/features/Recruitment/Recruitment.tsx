import { useEffect } from "react";

// TODO: paste your Google Form link here
const GFORM_LINK = "#";

const DOMAINS = [
  { icon: "💃", en: "Dance", kn: "ನೃತ್ಯ", den: "Folk, classical and fusion.", dkn: "ಜಾನಪದ, ಶಾಸ್ತ್ರೀಯ ಮತ್ತು ಫ್ಯೂಷನ್." },
  { icon: "🎵", en: "Music", kn: "ಸಂಗೀತ", den: "Vocals and instruments.", dkn: "ಗಾಯನ ಮತ್ತು ವಾದ್ಯ." },
  { icon: "🎭", en: "Drama", kn: "ನಾಟಕ", den: "Street plays and stage acts.", dkn: "ಬೀದಿ ನಾಟಕ ಮತ್ತು ರಂಗ ಪ್ರದರ್ಶನ." },
  { icon: "✍️", en: "Literature", kn: "ಸಾಹಿತ್ಯ", den: "Poetry and writing.", dkn: "ಕವನ ಮತ್ತು ಬರವಣಿಗೆ." },
  { icon: "🎨", en: "Art & Design", kn: "ಕಲೆ ಮತ್ತು ವಿನ್ಯಾಸ", den: "Posters, rangoli and decor.", dkn: "ಪೋಸ್ಟರ್, ರಂಗೋಲಿ ಮತ್ತು ಅಲಂಕಾರ." },
  { icon: "📸", en: "Media", kn: "ಮಾಧ್ಯಮ", den: "Photos, videos and reels.", dkn: "ಫೋಟೋ, ವಿಡಿಯೋ ಮತ್ತು ರೀಲ್ಸ್." },
  { icon: "🎪", en: "Events & Ops", kn: "ಕಾರ್ಯಕ್ರಮ ನಿರ್ವಹಣೆ", den: "Planning and running events.", dkn: "ಕಾರ್ಯಕ್ರಮಗಳ ಯೋಜನೆ ಮತ್ತು ನಿರ್ವಹಣೆ." },
  { icon: "💻", en: "Web & Social", kn: "ವೆಬ್ ಮತ್ತು ಸಾಮಾಜಿಕ ಜಾಲ", den: "Website and social media.", dkn: "ವೆಬ್‌ಸೈಟ್ ಮತ್ತು ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ." },
];

const STEPS = [
  { en: "Register", kn: "ನೋಂದಣಿ" },
  { en: "Screening", kn: "ಪರಿಶೀಲನೆ" },
  { en: "Domain Round", kn: "ವಿಭಾಗ ಸುತ್ತು" },
  { en: "Interview", kn: "ಸಂದರ್ಶನ" },
];

const petals = [0, 45, 90, 135, 180, 225, 270, 315];

const Mandala = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" stroke="#ffd23f" strokeWidth=".8">
    <circle cx="100" cy="100" r="92" />
    <circle cx="100" cy="100" r="60" />
    <circle cx="100" cy="100" r="30" />
    {petals.map((a) => (
      <ellipse key={a} cx="100" cy="42" rx="12" ry="34" transform={`rotate(${a} 100 100)`} />
    ))}
  </svg>
);

const CSS = `
.kkr{--bg:#111;--bg2:#2b1410;--card:#1b1412;--text:#fff4e0;--muted:#d6bd9d;--gold:#ffd23f;--org:#f26a3d;--line:#3d2a22;
background:var(--bg);color:var(--text);font-family:Poppins,system-ui,sans-serif;line-height:1.6;overflow-x:hidden}
.kkr *{box-sizing:border-box}
.kkr h1,.kkr h2,.kkr h3,.kkr .knf{font-family:'Tiro Kannada',Georgia,serif;font-weight:400}
.kkr h1,.kkr h2,.kkr h3{margin:0}
.kkr .wrap{max-width:1050px;margin:auto;padding:0 20px}
.kkr .hero{min-height:88vh;display:grid;place-items:center;text-align:center;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 35%,var(--bg2),var(--bg) 72%)}
.kkr .mandala{position:absolute;width:min(90vw,660px);height:min(90vw,660px);opacity:.14;animation:kkspin 70s linear infinite;top:50%;left:50%;margin:calc(min(90vw,660px)/-2) 0 0 calc(min(90vw,660px)/-2)}
.kkr .orb{position:absolute;border-radius:50%;filter:blur(70px);opacity:.28;animation:kkdrift 9s ease-in-out infinite alternate}
.kkr .o1{width:260px;height:260px;background:var(--gold);top:8%;left:6%}
.kkr .o2{width:300px;height:300px;background:var(--org);bottom:4%;right:4%;animation-delay:-4s}
@keyframes kkspin{to{transform:rotate(360deg)}}
@keyframes kkdrift{to{transform:translate(40px,-30px) scale(1.15)}}
@keyframes kkshine{to{background-position:200% center}}
@keyframes kkpulse{50%{box-shadow:0 0 0 12px rgba(255,210,63,0)}}
@keyframes kkmarq{to{transform:translateX(-50%)}}
.kkr .in{position:relative;z-index:1;padding:40px 20px}
.kkr .tag{display:inline-block;border:1px solid var(--gold);color:var(--gold);padding:5px 18px;border-radius:99px;font-size:.8rem;letter-spacing:.12em;background:rgba(255,210,63,.07)}
.kkr .kn{font-size:clamp(3.2rem,13vw,7rem);line-height:1.15;margin:18px 0 4px;background:linear-gradient(90deg,var(--org),var(--gold),var(--org));background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:kkshine 5s linear infinite}
.kkr .hero p{max-width:560px;margin:14px auto 0;color:var(--muted)}
.kkr .hero p.k{margin:4px auto 26px;font-family:'Tiro Kannada',serif;color:var(--gold)}
.kkr .btn{display:inline-block;background:var(--gold);color:#1a0d05;font-weight:600;padding:14px 36px;border-radius:12px;text-decoration:none;box-shadow:0 8px 28px rgba(255,210,63,.28);transition:transform .2s,box-shadow .2s}
.kkr .btn:hover{transform:translateY(-3px);box-shadow:0 12px 34px rgba(255,210,63,.45)}
.kkr .marq{overflow:hidden;border-block:1px solid var(--line);background:#160f0d;padding:14px 0}
.kkr .track{display:flex;gap:44px;width:max-content;animation:kkmarq 28s linear infinite;font-family:'Tiro Kannada',serif;font-size:1.5rem;color:var(--gold);white-space:nowrap}
.kkr .track i{color:var(--org);font-style:normal}
.kkr section{padding:80px 0 10px}
.kkr h2{font-size:clamp(1.9rem,5vw,2.7rem);text-align:center;color:var(--gold)}
.kkr h2:after{content:"";display:block;width:64px;height:3px;margin:12px auto 0;background:linear-gradient(90deg,var(--org),var(--gold));border-radius:9px}
.kkr .sub{text-align:center;color:var(--muted);margin:14px auto 34px;max-width:560px}
.kkr .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
.kkr .card{position:relative;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:26px;overflow:hidden;transition:transform .25s,border-color .25s,box-shadow .25s,opacity .7s}
.kkr .card:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 0 0,rgba(255,210,63,.14),transparent 60%);opacity:0;transition:opacity .3s}
.kkr .card:hover{transform:translateY(-7px);border-color:var(--gold);box-shadow:0 14px 34px rgba(255,210,63,.13)}
.kkr .card:hover:before{opacity:1}
.kkr .card .ic{width:54px;height:54px;border-radius:14px;display:grid;place-items:center;font-size:1.7rem;background:rgba(255,210,63,.1);border:1px solid rgba(255,210,63,.3)}
.kkr .card .no{position:absolute;top:16px;right:20px;font-family:'Tiro Kannada',serif;font-size:2.4rem;color:rgba(255,210,63,.1)}
.kkr .card h3{font-size:1.4rem;margin:14px 0 0;color:var(--gold)}
.kkr .card .knn{display:block;font-family:'Tiro Kannada',serif;color:var(--org);font-size:1.05rem;margin-bottom:8px}
.kkr .card p{margin:0;color:var(--muted);font-size:.9rem}
.kkr .card p.k{font-family:'Tiro Kannada',serif;font-size:.95rem}
.kkr .steps{list-style:none;padding:0;margin:0 auto;max-width:520px;border-left:2px dashed rgba(255,210,63,.5)}
.kkr .steps li{position:relative;padding:0 0 26px 32px}
.kkr .steps .n{position:absolute;left:-16px;top:0;width:30px;height:30px;border-radius:50%;background:var(--gold);color:#1a0d05;font-weight:600;display:grid;place-items:center;font-size:.85rem;animation:kkpulse 2.4s infinite;box-shadow:0 0 0 0 rgba(255,210,63,.5)}
.kkr .steps b{display:block}
.kkr .steps .knn{font-family:'Tiro Kannada',serif;color:var(--org)}
.kkr .cta{position:relative;overflow:hidden;margin:80px auto 0;max-width:960px;border-radius:28px;padding:60px 24px;text-align:center;background:radial-gradient(circle at 50% 0,#2b1a12,#141010 70%);border:1px solid rgba(255,210,63,.45);box-shadow:0 0 60px rgba(255,210,63,.1)}
.kkr .cta .mandala{opacity:.09;width:520px;height:520px;margin:-260px 0 0 -260px}
.kkr .cta>*:not(.mandala){position:relative;z-index:1}
.kkr .cta h2{font-size:clamp(1.8rem,5.5vw,2.8rem)}
.kkr .cta h2:after{display:none}
.kkr .cta p{margin:10px auto 0;color:var(--muted)}
.kkr .cta p.k{font-family:'Tiro Kannada',serif;color:var(--gold);margin:2px auto 26px}
.kkr .live{display:inline-flex;align-items:center;gap:8px;font-size:.85rem;color:var(--gold);margin-bottom:14px}
.kkr .live:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--gold);animation:kkpulse 1.8s infinite;box-shadow:0 0 0 0 rgba(255,210,63,.6)}
.kkr footer{text-align:center;padding:36px 20px;color:var(--muted);font-size:.85rem}
.kkr .rv{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}
.kkr .rv.on{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.kkr *{animation:none!important}.kkr .rv{opacity:1;transform:none}}
`;

export default function Recruitment() {
  useEffect(() => {
    document.title = "Recruitments · ನೇಮಕಾತಿ · Kannada Koota EC PES";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Tiro+Kannada&display=swap";
    document.head.appendChild(link);

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".kkr .rv").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="kkr">
      <style>{CSS}</style>

      <header className="hero">
        <div className="orb o1" />
        <div className="orb o2" />
        <Mandala className="mandala" />
        <div className="wrap in">
          <span className="tag">Recruitments · ನೇಮಕಾತಿ</span>
          <h1 className="kn">ಕನ್ನಡ ಕೂಟ</h1>
          <h3 style={{ fontSize: "1.4rem" }}>Kannada Koota · EC PES</h3>
          <p>Join us in celebrating Kannada culture, language and creativity.</p>
          <p className="k">ಕನ್ನಡ ಸಂಸ್ಕೃತಿ, ಭಾಷೆ ಮತ್ತು ಸೃಜನಶೀಲತೆಯನ್ನು ಆಚರಿಸಲು ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.</p>
          <a className="btn" href="#register">Register Now · ನೋಂದಣಿ ಮಾಡಿ</a>
        </div>
      </header>

      <section className="wrap">
        <h2>Our Domains · ನಮ್ಮ ವಿಭಾಗಗಳು </h2>
        <p className="sub" />
        <div className="grid">
          {DOMAINS.map((d, i) => (
            <div className="card rv" key={d.en}>
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              <div className="ic">{d.icon}</div>
              <h3>{d.en}</h3>
              <span className="knn">{d.kn}</span>
              <p>{d.den}</p>
              <p className="k">{d.dkn}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap">
        <h2>How It Works · ಹೇಗೆ?</h2>
        <p className="sub" />
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="rv" key={s.en}>
              <span className="n">{i + 1}</span>
              <b>{s.en}</b>
              <span className="knn">{s.kn}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="wrap" id="register">
        <div className="cta rv">
          <Mandala className="mandala" />
          <div className="live">Registrations open · ನೋಂದಣಿ ಆರಂಭ</div>
          <h2>Ready to join the Koota?</h2>
          <h2 style={{ marginTop: 4 }}>ಕೂಟದ ಭಾಗವಾಗಲು ಸಿದ್ಧರೇ?</h2>
          <p>Fill the Google Form to register.</p>
          <p className="k">ನೋಂದಣಿಗಾಗಿ ಗೂಗಲ್ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ.</p>
          <a className="btn" href={GFORM_LINK} target="_blank" rel="noopener noreferrer">
            Register · ನೋಂದಣಿ ಮಾಡಿ
          </a>
        </div>
      </div>

      <footer>© Kannada Koota EC PES · PES University, Electronic City Campus</footer>
    </div>
  );
}
