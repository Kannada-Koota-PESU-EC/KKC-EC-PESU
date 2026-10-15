import { Fragment, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import RepublicDayPopup from "@/features/home/components/RepublicDayPopup";

const chapters = [
  { kannada: "ನೃತ್ಯ", title: "ತಾಳಕ್ಕೆ ಹೆಜ್ಜೆ ಹಾಕಿ.", tag: "THE CULTURE, IN MOTION", copy: "The beat starts somewhere. The whole campus joins in.", image: "/Events/KKEC DC 3.png", alt: "Kannada Koota dancers performing together" },
  { kannada: "ಹಬ್ಬ", title: "ಸಂಭ್ರಮಿಸೋಣ ಬನ್ನಿ.", tag: "THE JOY OF GETTING TOGETHER", copy: "Tradition gets a new story every time we celebrate it.", image: "/Events/hall-celebration.jpg", alt: "Students celebrating together in the PES University hall" },
  { kannada: "ನಮ್ಮ ಜನ", title: "ನಿಮ್ಮವರು ಇಲ್ಲೇ ಇದ್ದಾರೆ.", tag: "THE KANNADA KOOTA COMMUNITY", copy: "Come for the culture. Stay because it feels like home.", image: "/Events/team-quadrangle.jpg", alt: "Kannada Koota team in the PES University quadrangle" },
];

const highlights = [
  { title: "ಕ್ವಾಡ್ರ್ಯಾಂಗಲ್ ನೃತ್ಯ", tag: "CULTURE · PERFORMANCE", image: "/Events/KKEC DC 1.jpg" },
  { title: "ಇಡೀ ಕ್ಯಾಂಪಸ್ ಜೊತೆಯಾಯಿತು", tag: "CAMPUS · COMMUNITY", image: "/Events/KKEC DC 5.png" },
  { title: "ಹಲವು ಕೈಗಳ ಶ್ರಮ", tag: "KANNADA KOOTA · EC", image: "/Events/team-quadrangle.jpg" },
];

// the scrolling band: one Kannada word, one English word, all the way across
// (English in odd places, Kannada in even ones – the stylesheet colours them that way)
const TICKER = ["LANGUAGE", "ಕನ್ನಡ", "DANCE", "ನೃತ್ಯ", "STORIES", "ಕಥೆಗಳು", "MUSIC", "ಸಂಗೀತ", "LITERATURE", "ಸಾಹಿತ್ಯ", "FESTIVALS", "ಹಬ್ಬಗಳು", "ART", "ಕಲೆ", "FRIENDSHIP", "ಸ್ನೇಹ", "COMMUNITY", "ನಮ್ಮ ಜನ"];

export default function Index() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  useEffect(() => {
    if (sessionStorage.getItem("kkc-scroll-to-about") !== "1") return;
    sessionStorage.removeItem("kkc-scroll-to-about");
    requestAnimationFrame(() => document.getElementById("about")?.scrollIntoView({ block: "start", behavior: "smooth" }));
  }, []);

  return <div className="fest-home">
    <RepublicDayPopup />

    <section className="poster-cover" aria-labelledby="poster-title">
      <div className="poster-backdrop"><img src="/Events/mahashivratri-dance1.jpeg" alt="" fetchPriority="high" /><span className="poster-shade" /></div>
      <div className="poster-topline"><span className="pes-ticket"><span className="pes-ticket-mark">P</span> PES UNIVERSITY <i/> EC CAMPUS</span><span className="poster-edition">ಕನ್ನಡ ಕೂಟ <b>·</b> 2026</span></div>
      <div className="poster-copy">
        <div className="poster-presents"><span className="present-rule"/> ವಿದ್ಯಾರ್ಥಿ ಸಾಂಸ್ಕೃತಿಕ ಕೂಟ · A STUDENT CULTURE CLUB <span className="present-rule"/></div>
        <div className="poster-cutout"><span>ಕನ್ನಡ</span><span className="cutout-year">ಕೂಟ</span><i>EC</i></div>
        <h1 id="poster-title"><span className="poster-kannada">ಕನ್ನಡ</span><br/><em>in every</em> <b>direction.</b></h1>
        <div className="poster-description"><span className="poster-pin">✱</span><p>Language, dance, stories, friendship.<br/>ಇದು ನೋಡುವ ಸಂಸ್ಕೃತಿಯಲ್ಲ, <strong>ಬದುಕುವ ಸಂಸ್ಕೃತಿ.</strong></p></div>
        <div className="poster-actions"><Link to="/events" className="poster-primary">COME SEE WHAT WE DO <ArrowRight size={16}/></Link><Link to="/team" className="poster-secondary">ನಮ್ಮ ತಂಡವನ್ನು ಭೇಟಿಯಾಗಿ <ArrowUpRight size={14}/></Link></div>
      </div>
      <div className="poster-photo-card"><img src="/Events/yakshagana-2k25.jpg" alt="Yakshagana performance at Kannada Koota, PES University" /><span className="photo-card-label">FIG. 01 <i/> ವೇದಿಕೆ ನಮ್ಮದು</span></div>
      <div className="poster-sticker"><img src="/KKCEC-ECON.png" alt="Kannada Koota crest"/><span>ನಮ್ಮ<br/>ಕನ್ನಡ</span></div>
      <div className="poster-margin-note">ವಿದ್ಯಾರ್ಥಿಗಳ ಕನ್ನಡ ಕೂಟ · PESU ELECTRONIC CITY</div>
      <div className="poster-foot"><span>ನಮ್ಮ ನಾಡು · ನಮ್ಮ ನುಡಿ · ನಮ್ಮ ಕೂಟ</span><span className="poster-foot-line"/><a href="#worlds">SCROLL TO EXPLORE <ArrowDown size={13}/></a><span className="poster-foot-number">01 / 04</span></div>
    </section>

    <div className="culture-ticker" aria-label="Language, dance, stories, music, literature, festivals, art and community"><div className="culture-ticker-track">{[0, 1].map((copy) => TICKER.map((word) => <Fragment key={`${copy}-${word}`}><span>{word}</span><b>✱</b></Fragment>))}</div></div>

    <section className="chapters-section" id="about">
      <div className="chapters-heading"><div><span className="issue-label">ಕೂಟದ ಒಳಗೆ · INSIDE THE KOOTA <i>—</i> 02 / 04</span><h2>Pick a door.<br/><em>ನಿಮ್ಮವರನ್ನು ಕಂಡುಕೊಳ್ಳಿ.</em></h2></div><p>Every Koota has a different first day.<br/>ನಿಮ್ಮ ಮೊದಲ ದಿನ ಹೇಗಿರುತ್ತದೆ?</p></div>
      <div className="chapter-explorer" id="worlds">
        <div className="chapter-tabs" role="tablist" aria-label="Explore Koota experiences">{chapters.map((item, index) => <button type="button" role="tab" aria-selected={active === index} className={`chapter-tab${active === index ? " selected" : ""}`} onClick={() => setActive(index)} key={item.title}><span>0{index + 1}</span><span className="chapter-tab-kannada">{item.kannada}</span><span>{item.tag.split(" ").slice(1, 4).join(" ")}</span><ArrowUpRight size={16}/></button>)}</div>
        <div className="chapter-feature" role="tabpanel" key={chapter.title}><img src={chapter.image} alt={chapter.alt} loading="lazy"/><div className="chapter-feature-shade"/><div className="chapter-feature-copy"><span>{chapter.tag}</span><h3>{chapter.title}</h3><p>{chapter.copy}</p><Link to="/events">ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನೋಡಿ <ArrowUpRight size={14}/></Link></div><div className="chapter-feature-kannada">{chapter.kannada}</div></div>
      </div>
      <div className="chapter-bottomline"><span>NO WRONG WAY IN.</span><span>ನೀವು ಹೇಗಿದ್ದೀರೋ ಹಾಗೇ ಬನ್ನಿ.</span><span>ಕನ್ನಡ ಕೂಟ <b>✱</b></span></div>
    </section>

    <section className="archive-section" id="archive">
      <div className="archive-heading"><div><span className="issue-label">ಕೆಲವು ಸುಂದರ ನೆನಪುಗಳು · A FEW GOOD MEMORIES <i>—</i> 03 / 04</span><h2>Recently on<br/><em>our side.</em></h2></div><Link to="/events">ಹಿಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು <ArrowUpRight size={15}/></Link></div>
      <div className="archive-grid">{highlights.map((item, index) => <Link to="/events" className={`archive-card archive-card-${index + 1}`} key={item.title}><div className="archive-image"><img src={item.image} alt={item.title} loading="lazy"/><span className="archive-stamp">0{index + 1}</span><span className="archive-arrow"><ArrowUpRight size={17}/></span></div><span className="archive-tag">{item.tag}</span><h3>{item.title}</h3></Link>)}</div>
    </section>

    <section className="join-poster" id="join"><div className="join-halftone"/><div className="join-side-label">04 / 04 · SAY HELLO</div><div className="join-poster-copy"><span className="join-kicker">A QUESTION, AN IDEA, OR JUST A HELLO?</span><h2>ನಮ್ಮೊಂದಿಗೆ<br/><em>ಮಾತನಾಡಬೇಕೆ?</em></h2><p>Want to talk to us? Ask a question, share an idea for an event, or simply say hello. We would love to hear from you.</p><Link to="/contact">ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ · CONNECT WITH US <MoveUpRight size={16}/></Link></div><div className="join-roundel"><span>WE’RE<br/>ALL<br/>EARS</span><i>✱</i></div><div className="join-signoff"><span>ಕನ್ನಡ ಕೂಟ · PES EC</span><i/>ಬಾಗಿಲು ತೆರೆದಿದೆ</div></section>

    <div className="fest-home-footer"><span>ಕನ್ನಡವೇ ನಮ್ಮ ಉಸಿರು</span><span>Made with care at PES University, EC</span><a href="https://www.instagram.com/kannadakoota_ecc?igsh=eGJnODZ6Njd0dTU5" target="_blank" rel="noreferrer"><Instagram size={14}/> FIND US ON INSTAGRAM <ArrowUpRight size={13}/></a></div>
  </div>;
}
