
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const navItems = [
  { name: "Our story", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Journal", path: "/blogs" },
  { name: "Our team", path: "/team" },
  { name: "Karunadu 3D", path: "/karunadu" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => location.pathname === path;
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-3"
            aria-label="Kannada Koota home"
          >
            <img
              src="/KKCEC-ECON.png"
              alt="Kannada Koota logo"
              className="h-10 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="min-w-0">
              <span className="block text-base font-bold leading-tight tracking-tight text-foreground sm:text-lg">
                ಕನ್ನಡ ಕೂಟ
              </span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">
                PESU Electronic City
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActivePath(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Recruitment call to action */}
          <div className="hidden lg:block">
            <Button asChild className="rounded-full px-5 font-semibold">
              <Link to="/recruitments">
                Join Our Team
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 rounded-full lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="animate-fade-in-up border-t border-border py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActivePath(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Link
                to="/recruitments"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Join Our Team
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
