import { ArrowUpRight, Heart, Music2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Heart, title: "A sense of belonging", copy: "Find your people, wherever you come from." },
  { icon: Music2, title: "Culture in motion", copy: "Music, dance, stories and traditions—shared." },
  { icon: Sparkles, title: "Room to create", copy: "Bring an idea. We’ll help it find a stage." },
];

export default function AboutSection() {
  return <section id="about" className="about-section">
    <div className="about-photo-wrap"><img src="/Hero/TM 2.JPG" alt="Kannada Koota friends celebrating together" loading="lazy" /><span className="about-caption">ಒಟ್ಟಾಗಿ · Together, always</span><span className="about-photo-index">BENGALURU, INDIA · EST. PES EC</span></div>
    <div className="about-copy">
      <p className="eyebrow">A little about us</p>
      <h2>Culture has a way<br />of bringing us <em>closer.</em></h2>
      <p className="about-lede">Kannada Koota EC PES is a student community celebrating the language, arts and traditions of Karnataka—while making space for every story, every voice and every kind of curious.</p>
      <div className="values-list">{values.map(({ icon: Icon, title, copy }, index) => <div className="value-row" key={title}><span className="value-index">0{index + 1}</span><Icon size={19} strokeWidth={1.6} /><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      <Link to="/team" className="underlined-link">Meet the people behind it <ArrowUpRight size={16} /></Link>
    </div>
  </section>;
}
