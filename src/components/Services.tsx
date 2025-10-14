import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calculator, FileText, BookOpen, TrendingUp, Shield, Clock, X } from "lucide-react";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const services = [
    {
      id: "tax-planning",
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Tax Planning",
      description: "Build a strategy that saves you money now and in the future.",
      details: {
        subtitle: "Maximize your savings and avoid costly mistakes with expert tax planning that helps you identify every opportunity to reduce your tax burden",
        features: [
          "Review of your finances to spot tax-saving opportunities",
          "Tailored tax strategies for personal or business goals",
          "Year-round planning to reduce your tax liability",
          "Guidance on maximizing deductions and credits"
        ],
        outcomes: [
          "Lower tax bills with proactive planning",
          "Maximize deductions and credits",
          "Avoid missed savings opportunities",
          "Stay prepared and tax-efficient all year long"
        ],
        note: "Clients typically save multiple times the cost of our fee."
      }
    },
    {
      id: "tax-preparation",
      icon: <FileText className="h-8 w-8" />,
      title: "Tax Preparation",
      description: "Stress-free tax filing - for personal and business tax returns.",
      details: {
        subtitle: "From personal to business taxes, we provide thorough, accurate preparation to save you time and money.",
        features: [
          "Fast, accurate tax return preparation (personal, business, 1099)",
          "Maximized deductions and credits",
          "On-time filing to avoid penalties",
          "Review of the current year to identify tax planning opportunities for the future"
        ],
        pricing: [
          "Individual: from $895",
          "Business: from $1,595"
        ],
        note: "Final pricing after complexity review."
      }
    },
    {
      id: "bookkeeping",
      icon: <BookOpen className="h-8 w-8" />,
      title: "Bookkeeping",
      description: "Expert bookkeeping for growing businesses - financial clarity you can count on.",
      details: {
        subtitle: "Professional bookkeeping services designed to support your business growth and financial clarity.",
        features: [
          "Accurate financial reports (profit & loss, balance sheet, statement of cash flows) on a monthly/quarterly/annual basis",
          "Calls to discuss your financial reports",
          "Custom services tailored to your needs"
        ],
        outcomes: [
          "Save time and reduce stress with outsourced bookkeeping",
          "Make informed decisions with clear financial insights",
          "Stay tax-ready with accurate reports and filings",
          "Unlock proactive tax planning to minimize tax liabilities and plan ahead of tax season",
          "Improve cash flow by tracking payables/receivables",
          "Strengthen financial health and boost funding opportunities"
        ],
        pricing: [
          "Monthly fees start at $250/month",
          "Quarterly fees start at $595/quarter",
          "Annual Cleanups, Catchups or New Businesses: Contact us for a custom quote!"
        ]
      }
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 fade-in">
          <span className="inline-block px-4 py-2 bg-accent-muted text-accent rounded-full text-sm font-semibold mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What We Do
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tax return preparation, strategic tax planning, and efficient bookkeeping to keep your finances organized, reduce tax liabilities, and help your business grow.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`card-professional hover-lift fade-in group cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <Dialog open={openDialog === service.id} onOpenChange={(open) => setOpenDialog(open ? service.id : null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300"
                    onClick={() => {
                      setSelectedService(service.id);
                      setOpenDialog(service.id);
                    }}
                  >
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                      <span className="text-accent">{service.icon}</span>
                      {service.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.details.subtitle}
                    </p>

                    {service.details.features && (
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">What you get</h4>
                        <ul className="space-y-2">
                          {service.details.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.details.outcomes && (
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Outcomes</h4>
                        <ul className="space-y-2">
                          {service.details.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-success rounded-full"></div>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.details.pricing && (
                      <div>
                        <h4 className="font-semibold mb-3 text-lg">Pricing</h4>
                        <ul className="space-y-2">
                          {service.details.pricing.map((price, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gold rounded-full"></div>
                              <span>{price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.details.note && (
                      <div className="bg-accent-muted p-4 rounded-lg">
                        <p className="text-accent font-medium">
                          {service.details.note}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <Button 
                        className="btn-professional flex-1"
                        onClick={() => {
                          setOpenDialog(null);
                          setTimeout(() => {
                            const contactSection = document.querySelector('#contact');
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                      >
                        Get Started
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setOpenDialog(null);
                          setTimeout(() => {
                            const contactSection = document.querySelector('#contact');
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 100);
                        }}
                      >
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-gradient-hero rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Optimize Your Taxes?
            </h3>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your specific situation and create a personalized tax strategy that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold" asChild>
                <a href="#contact">Schedule Consultation</a>
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold" asChild>
                <a href="tel:+17372647589">Call (737) 264-7589</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;