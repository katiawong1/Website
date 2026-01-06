import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Tax Planning", href: "/#services" },
      { name: "Tax Preparation", href: "/#services" },
      { name: "Bookkeeping", href: "/#services" }
    ],
    company: [
      { name: "About Us", href: "/#about" },
      { name: "Our Team", href: "/#about" },
      { name: "Testimonials", href: "/#client-testimonials" },
      { name: "Contact", href: "/#contact" }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/ewCPAtax/", label: "Facebook" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/ekaterina-katia-wong-cpa-ea-ctc-a801a5a7/", label: "LinkedIn" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/us.tax/", label: "Instagram" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  EW CPA Tax & Bookkeeping LLC
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Your trusted CPA tax advisor serving clients nationwide.
                  Providing professional tax services with integrity and expertise for over 15 years.
                </p>
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

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">
                Contact Information
              </h4>

              {/* Contact details */}
              <div className="space-y-3 mb-6">
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
              <div>
                <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-primary-foreground/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-primary-foreground/80 text-center md:text-left">
              © {currentYear} EW CPA Tax & Bookkeeping LLC. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-primary-foreground/80">
              <a href="https://www.privacypolicies.com/live/753b7dea-bbac-4a94-aa58-0020e9f525f9" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="https://www.privacypolicies.com/live/4d218282-50b2-418f-870e-13bb7f7fab09" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="https://www.privacypolicies.com/live/9f9381cb-e5ad-4137-b12f-656c286eae6e" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
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