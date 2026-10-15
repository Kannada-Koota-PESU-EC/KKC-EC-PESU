import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { name: "Our story", kn: "ನಮ್ಮ ಕಥೆ", path: "/" },
  { name: "Events", kn: "ಕಾರ್ಯಕ್ರಮಗಳು", path: "/events" },
  { name: "Journal", kn: "ದಿನಚರಿ", path: "/blogs" },
  { name: "Our team", kn: "ನಮ್ಮ ತಂಡ", path: "/team" },
  { name: "Karunadu 3D", kn: "ಕರುನಾಡು 3D", path: "/karunadu" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setIsOpen(false);
  const isActive = (path: string) => location.pathname === path;
  const handleOurStory = (event: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (location.pathname === "/") {
      event.preventDefault();
      document.getElementById("about")?.scrollIntoView({ block: "start", behavior: "smooth" });
    } else {
      sessionStorage.setItem("kkc-scroll-to-about", "1");
    }
  };
  const handlePageNav = (path: string) => {
    closeMenu();
    if (path !== location.pathname) window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 120);
  };
  return <nav className="site-nav">
    <div className="nav-inner">
      <Link to="/" className="brand" onClick={closeMenu}><img src="/KKCEC-ECON.png" alt="" /><span><strong>ಕನ್ನಡ ಕೂಟ</strong><small>KANNADA KOOTA · PES EC</small></span></Link>
      <div className="desktop-nav">{navItems.map(item => <Link key={item.name} to={item.path} className={isActive(item.path) ? "nav-current" : ""} onClick={item.name === "Our story" ? handleOurStory : () => handlePageNav(item.path)}><span className="nav-kn">{item.kn}</span><span className="nav-en">{item.name}</span></Link>)}</div>
      <Link to="/contact" className="nav-join"><span className="nav-kn">ನಮಸ್ಕಾರ</span> Say hello <ArrowUpRight size={15} /></Link>
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle navigation">{isOpen ? <X /> : <Menu />}</button>
    </div>
    {isOpen && <div className="mobile-nav">{navItems.map(item => <Link key={item.name} to={item.path} onClick={item.name === "Our story" ? handleOurStory : () => handlePageNav(item.path)}><span><span className="nav-kn">{item.kn}</span> · {item.name}</span></Link>)}<Link to="/recruitment" onClick={() => handlePageNav("/recruitment")}><span><span className="nav-kn">ಕೂಟಕ್ಕೆ ಸೇರಿ</span> · Join the Koota</span> <ArrowUpRight size={16} /></Link><Link to="/contact" onClick={() => handlePageNav("/contact")}><span><span className="nav-kn">ಸಂಪರ್ಕಿಸಿ</span> · Contact us</span></Link></div>}
  </nav>;
}
