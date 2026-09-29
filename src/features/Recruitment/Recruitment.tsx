import { useEffect } from "react";

// TODO: paste your Google Form link here
const GFORM_LINK = "#";

const DOMAINS = [
  { icon: "💃", name: "Dance", desc: "Folk, classical and fusion performances at every fest." },
  { icon: "🎵", name: "Music", desc: "Vocals and instruments, from Janapada to modern Kannada hits." },
  { icon: "🎭", name: "Drama", desc: "Street plays, stage acts and storytelling in Kannada." },
  { icon: "✍️", name: "Literature", desc: "Poetry, writing and Kannada language activities." },
  { icon: "🎨", name: "Art & Design", desc: "Posters, rangoli, decor and the club's visual identity." },
  { icon: "📸", name: "Media", desc: "Photography, videography and reels that tell our story." },
  { icon: "🎪", name: "Events & Ops", desc: "Planning, logistics and running events end to end." },
  { icon: "💻", name: "Web & Social", desc: "Website, socials and keeping the community connected." },
];

const STEPS = [
  { t: "Register", d: "Open the form from this page or scan the QR and fill it in before EOD." },
  { t: "Screening", d: "We shortlist based on your responses and domain choice." },
  { t: "Domain Round", d: "A task, audition or challenge specific to your domain." },
  { t: "Interview & Results", d: "A short chat with the core team, then final selections." },
];

const CSS = `
.kkr{--bg:#1a0808;--bg2:#2a0e0e;--card:#341313;--text:#fff4e0;--muted:#d9b99a;--gold:#ffc528;--red:#e0301e;--line:#5a2a22;
background:var(--bg);color:var(--text);font-family:Poppins,system-ui,sans-serif;line-height:1.6;overflow-x:hidden;min-height:100vh}
.kkr *{box-sizing:border-box}
.kkr h1,.kkr h2,.kkr h3{font-family:'Tiro Kannada',Georgia,serif;margin:0;font-weight:400}
.kkr .wrap{max-width:1050px;margin:auto;padding:0 20px}
.kkr .hero{min-height:92vh;display:grid;place-items:center;text-align:center;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 30%,var(--bg2),var(--bg) 70%)}
.kkr .mandala{position:absolute;width:min(90vw,640px);height:min(90vw,640px);opacity:.16;animation:kkspin 60s linear infinite;top:50%;left:50%;margin:calc(min(90vw,640px)/-2) 0 0 calc(min(90vw,640px)/-2)}
@keyframes kkspin{to{transform:rotate(360deg)}}
@keyframes kkfloat{50%{transform:translateY(-8px)}}
.kkr .in{position:relative;z-index:1;padding:40px 20px}
.kkr .tag{display:inline-block;border:1px solid var(--gold);color:var(--gold);padding:4px 16px;border-radius:99px;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase}
.kkr .kn{font-size:clamp(3rem,12vw,6.5rem);line-height:1.1;margin:18px 0 4px;background:linear-gradient(90deg,var(--gold),var(--red));-webkit-background-clip:text;background-clip:text;color:transparent;animation:kkfloat 4s ease-in-out infinite}
.kkr .hero p{max-width:560px;margin:14px auto;color:var(--muted)}
.kkr .btn{display:inline-block;background:linear-gradient(90deg,var(--gold),var(--red));color:#2a0808;font-weight:600;padding:14px 34px;border-radius:99px;text-decoration:none;box-shadow:0 8px 30px rgba(224,48,30,.35);transition:transform .2s}
.kkr .btn:hover{transform:translateY(-3px) scale(1.03)}
.kkr .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:-40px;position:relative;z-index:2}
.kkr .stat{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px;text-align:center}
.kkr .stat b{display:block;color:var(--gold);font-size:1.3rem}
.kkr section{padding:80px 0 20px}
.kkr h2{font-size:clamp(1.8rem,5vw,2.6rem);text-align:center}
.kkr .sub{text-align:center;color:var(--muted);margin:6px auto 34px;max-width:560px}
.kkr .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.kkr .card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:24px;transition:transform .25s,border-color .25s,box-shadow .25s,opacity .7s}
.kkr .card:hover{transform:translateY(-6px);border-color:var(--gold);box-shadow:0 12px 30px rgba(255,197,40,.15)}
.kkr .card .ic{font-size:2rem}
.kkr .card h3{font-size:1.35rem;margin:8px 0 4px;color:var(--gold)}
.kkr .card p{margin:0;color:var(--muted);font-size:.92rem}
.kkr .steps{list-style:none;padding:0;margin:0 auto;max-width:640px;border-left:2px dashed var(--gold)}
.kkr .steps li{position:relative;padding:0 0 26px 30px}
.kkr .steps .n{position:absolute;left:-15px;top:0;width:28px;height:28px;border-radius:50%;background:var(--gold);color:#2a0808;font-weight:600;display:grid;place-items:center;font-size:.85rem}
.kkr .steps b{display:block}
.kkr .steps span.d{color:var(--muted);font-size:.92rem}
.kkr .cta{margin:80px auto 0;max-width:960px;border-radius:28px;padding:60px 24px;text-align:center;background:radial-gradient(circle at 50% 0,#2b1a12,#141010 70%);border:1px solid rgba(255,197,40,.45);box-shadow:0 0 60px rgba(255,197,40,.12)}
.kkr .cta h2{color:var(--gold)}
.kkr .cta p{max-width:500px;margin:12px auto 26px;color:var(--muted)}
.kkr .live{display:inline-flex;align-items:center;gap:8px;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
.kkr .live:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 0 rgba(255,197,40,.6);animation:kkpulse 1.8s infinite}
@keyframes kkpulse{50%{box-shadow:0 0 0 10px rgba(255,197,40,0)}}
.kkr footer{text-align:center;padding:26px;color:var(--muted);font-size:.85rem}
.kkr .rv{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}
.kkr .rv.on{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.kkr .mandala,.kkr .kn{animation:none}.kkr .rv{opacity:1;transform:none}}
`;

const petals = [0, 45, 90, 135, 180, 225, 270, 315];

export default function Recruitments() {
  useEffect(() => {
    document.title = "Recruitments Phase 2 · Kannada Koota EC PES";
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
        <svg className="mandala" viewBox="0 0 200 200" fill="none" stroke="#ffc528" strokeWidth=".8">
          <circle cx="100" cy="100" r="92" />
          <circle cx="100" cy="100" r="60" />
          {petals.map((a) => (
            <ellipse key={a} cx="100" cy="42" rx="12" ry="34" transform={`rotate(${a} 100 100)`} />
          ))}
        </svg>
        <div className="wrap in">
          <span className="tag">Recruitments · Phase 2</span>
          <h1 className="kn">ಕನ್ನಡ ಕೂಟ</h1>
          <h3 style={{ fontSize: "1.4rem" }}>Kannada Koota · EC PES</h3>
          <p>
            Culture, language and creativity, brought to life on campus. Phase 2 is open for first
            years, with limited seats and a tougher selection.
          </p>
          <a className="btn" href="#register">Register Now</a>
        </div>
      </header>

      <div className="wrap stats rv">
        <div className="stat"><b>1st Years</b>Open to all branches</div>
        <div className="stat"><b>Limited Seats</b>Restricted intake</div>
        <div className="stat"><b>Tougher Rounds</b>Show us your best</div>
      </div>

      <section className="wrap">
        <h2>Choose Your Domain</h2>
        <p className="sub">Every domain keeps the club running. Find the one that fits you.</p>
        <div className="grid">
          {DOMAINS.map((d) => (
            <div className="card rv" key={d.name}>
              <div className="ic">{d.icon}</div>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap">
        <h2>How It Works</h2>
        <p className="sub">Four simple steps from sign-up to the club.</p>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="rv" key={s.t}>
              <span className="n">{i + 1}</span>
              <b>{s.t}</b>
              <span className="d">{s.d}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="wrap" id="register">
        <div className="cta">
          <div className="live">Registrations open</div>
          <h2>Ready to be part of ಕೂಟ?</h2>
          <p>Fill the Google Form to lock in your spot. Seats are limited, so don't wait.</p>
          <a className="btn" href={GFORM_LINK} target="_blank" rel="noopener noreferrer">
            Fill the Registration Form
          </a>
        </div>
      </div>

      <footer>© Kannada Koota EC PES · PES University, Electronic City Campus</footer>
    </div>
  );
}
