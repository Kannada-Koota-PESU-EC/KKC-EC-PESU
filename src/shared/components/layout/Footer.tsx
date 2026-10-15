import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="site-footer"><div className="footer-main">
    <div className="footer-brand"><Link to="/" className="brand brand-footer"><img src="/KKCEC-ECON.png" alt="" /><span><strong>ಕನ್ನಡ ಕೂಟ</strong><small>KANNADA KOOTA · PES EC</small></span></Link><p>Keeping our roots close<br />and our circle open.</p></div>
    <div className="footer-column"><span>ಅನ್ವೇಷಿಸಿ · EXPLORE</span><Link to="/events">ಕಾರ್ಯಕ್ರಮಗಳು · Events</Link><Link to="/blogs">ದಿನಚರಿ · Journal</Link><Link to="/team">ನಮ್ಮ ತಂಡ · The team</Link><Link to="/karunadu">ಕರುನಾಡು 3D</Link><Link to="/recruitment">ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ · Join us</Link></div>
    <div className="footer-column"><span>ಸಂಪರ್ಕ · FIND US</span><a href="mailto:kannadakoota.ecc@pes.edu">kannadakoota.ecc@pes.edu <ArrowUpRight size={14} /></a><p>PES University, Electronic City<br />Bengaluru, Karnataka</p><a href="https://www.instagram.com/kannadakoota_ecc?igsh=eGJnODZ6Njd0dTU5" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a></div>
    <Link to="/contact" className="footer-contact"><Mail size={19} /><span>Have an idea, a question,<br />or just want to say hi?</span><strong>ಮಾತನಾಡೋಣ · Let’s talk <ArrowUpRight size={16} /></strong></Link>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kannada Koota EC PES</span><span>ಕನ್ನಡವೇ ಸತ್ಯ · ಕನ್ನಡವೇ ನಿತ್ಯ</span><span>Made with care in Bengaluru ✳</span></div></footer>;
}
