import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Tax Planning", href: "#services" },
      { name: "Tax Preparation", href: "#services" },
      { name: "Bookkeeping", href: "#services" },
      { name: "Business Advisory", href: "#services" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "Testimonials", href: "#client-testimonials" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Tax Tips", href: "#" },
      { name: "Tax Calendar", href: "#" },
      { name: "Resources", href: "#" },
      { name: "FAQ", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  EW CPA Tax & Bookkeeping LLC
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Your trusted CPA tax advisor serving clients nationwide. 
                  Providing professional tax services with integrity and expertise for over 10 years.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <a 
                  href="tel:+17372647589"
                  className="flex items-center space-x-3 text-primary-foreground/80 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>(737) 264-7589</span>
                </a>
                <a 
                  href="mailto:info@e-taxcpa.com"
                  className="flex items-center space-x-3 text-primary-foreground/80 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>info@e-taxcpa.com</span>
                </a>
                <div className="flex items-center space-x-3 text-primary-foreground/80">
                  <MapPin className="h-4 w-4" />
                  <span>Serving Clients Nationwide</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="text-primary-foreground/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>


            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/20 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-primary-foreground/80">
              © {currentYear} EW CPA Tax & Bookkeeping LLC. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6 text-sm text-primary-foreground/80">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-primary-foreground/60">
            <p>
EW CPA Tax & Bookkeeping LLC is a licensed CPA firm serving clients nationwide. 
              All tax advice and services are provided in accordance with applicable federal and state regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;