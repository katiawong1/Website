import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#client-testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <a href="tel:+17372647589" className="flex items-center space-x-1 sm:space-x-2 hover:text-accent-light transition-colors">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">(737) 264-7589</span>
            </a>
            <a href="mailto:info@e-taxcpa.com" className="flex items-center space-x-1 sm:space-x-2 hover:text-accent-light transition-colors">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">info@e-taxcpa.com</span>
            </a>
          </div>
          <div className="hidden md:block text-xs">
EW CPA TAX & BOOKKEEPING LLC
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#home" className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">
              EW CPA TAX & BOOKKEEPING LLC
              </a>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA button */}
            <div className="hidden md:block">
              <Button className="btn-professional" asChild>
                <a href="#contact">Get Started</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-accent transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground hover:text-accent transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="btn-professional w-full mt-4" asChild>
                <a href="#contact">Get Started</a>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;