import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { name: "Our story", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Journal", path: "/blogs" },
  { name: "Our team", path: "/team" },
  { name: "Karunadu 3D", path: "/karunadu" },
  { name: "ಪ್ರಯೋಗ", path: "/prayoga" },
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
      <div className="desktop-nav">{navItems.map(item => <Link key={item.name} to={item.path} className={isActive(item.path) ? "nav-current" : ""} onClick={item.name === "Our story" ? handleOurStory : () => handlePageNav(item.path)}>{item.name}</Link>)}</div>
      <Link to="/contact" className="nav-join">Say hello <ArrowUpRight size={15} /></Link>
      <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="Toggle navigation">{isOpen ? <X /> : <Menu />}</button>
    </div>
    {isOpen && <div className="mobile-nav">{navItems.map(item => <Link key={item.name} to={item.path} onClick={item.name === "Our story" ? handleOurStory : () => handlePageNav(item.path)}>{item.name}</Link>)}<Link to="/recruitment" onClick={() => handlePageNav("/recruitment")}>Join the Koota <ArrowUpRight size={16} /></Link><Link to="/contact" onClick={() => handlePageNav("/contact")}>Contact us</Link></div>}
  </nav>;
}
