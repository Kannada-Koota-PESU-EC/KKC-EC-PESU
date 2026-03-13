import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm kannada-text">ಕ</span>
              </div>
              <span className="font-bold text-lg">ಕನ್ನಡ ಕೂಟ</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Celebrating and preserving Kannada culture, language, and traditions at PES University Electronic City Campus.
            </p>
            <p className="text-xs text-muted-foreground kannada-text">
              ಕನ್ನಡ ಸಂಸ್ಕೃತಿಯನ್ನು ಉಳಿಸುವ ನಮ್ಮ ಪ್ರಯತ್ನ
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/upis" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Support Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>kannadakoota.ecc@pes.edu</span>
              </div>
              {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91-9876543210</span>
              </div> */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>PES University, EC, 
                  Bangalore
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/kannadakoota_ecc?igsh=eGJnODZ6Njd0dTU5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4 text-accent-foreground" />
              </a>
              {/* <a
                href="https://facebook.com/kannadakoota.pes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4 text-accent-foreground" />
              </a> */}
              {/* <a
                href="https://twitter.com/kannadakoota_pes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4 text-accent-foreground" />
              </a> */}
            </div>
            <p className="text-xs text-muted-foreground">
              Stay updated with our latest events and activities
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Kannada Koota EC PES. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for preserving Kannada culture
          </p>
        </div>
      </div>
    </footer>
  );
}