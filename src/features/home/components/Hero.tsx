import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <div className="hero-photo" role="img" aria-label="Kannada Koota members celebrating together" />
      <div className="hero-grain" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> PES University · Electronic City</p>
          <h1 id="hero-title">Rooted in<br /><em>Karnataka.</em><br />Made for everyone.</h1>
          <p className="hero-description">A home for our language, our stories, and the people who make Kannada culture feel alive.</p>
          <p className="hero-kannada kannada-text">ನಮ್ಮ ಭಾಷೆ · ನಮ್ಮ ಸಂಸ್ಕೃತಿ · ನಮ್ಮ ಹೆಮ್ಮೆ</p>
          <div className="hero-actions">
            <Link to="/events" className="button button-light">Explore our world <ArrowUpRight size={17} /></Link>
            <a href="#about" className="hero-text-link">Get to know us <ArrowDownRight size={17} /></a>
          </div>
        </div>
        <div className="hero-note"><span>01 / 03</span><span className="note-rule" /><span>Culture, carried forward</span></div>
      </div>
      <div className="hero-stamp" aria-hidden="true"><span>ಕ</span><small>ಕನ್ನಡ<br />ಕೂಟ</small></div>
    </section>
  );
}
