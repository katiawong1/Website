import { Award, Users, Clock, Star } from "lucide-react";

const About = () => {
  const portraitImageUrl = "https://raw.githubusercontent.com/daveenci-ai/e-taxcpa-images/refs/heads/main/kate_wong_edited_light_grey_002.jpeg";
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "500+",
      label: "Satisfied Clients"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      number: "10+",
      label: "Years Experience"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "CPA",
      label: "Licensed Professional"
    },
    {
      icon: <Star className="h-8 w-8" />,
      number: "4.9",
      label: "Average Rating"
    }
  ];

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 fade-in">
            <span className="inline-block px-4 py-2 bg-accent-muted text-accent rounded-full text-sm font-semibold mb-4">
              ABOUT US
            </span>
                      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Your Trusted{" "}
            <span className="gradient-text">Tax Partner</span>
          </h2>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            With over a decade of experience serving businesses and individuals, 
            we've built our reputation on delivering exceptional service with a personal touch.
          </p>
          </div>

          {/* Main content - 2 columns */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left column - Professional Image */}
            <div className="fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-2xl opacity-15 animate-float"></div>
                <div className="relative z-10 rounded-2xl shadow-professional hover-lift overflow-hidden">
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={portraitImageUrl}
                      alt="Katia Wong, CPA - Your trusted tax advisor"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Content */}
            <div className="fade-in">
              {/* Professional info card */}
              <div className="mb-8 card-professional text-center">
                <h3 className="text-xl font-bold mb-2">Katia Wong, CPA</h3>
                <p className="text-accent font-semibold mb-2">Licensed Tax Professional</p>
                <p className="text-sm text-muted-foreground">
                  "Excellence in service, integrity in practice"
                </p>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Katia Wong is an experienced tax and bookkeeping professional with a strong background in accounting and taxation. 
                  She holds a Bachelor's in Accounting, a Master's in Taxation, and is licensed as a CPA and an Enrolled Agent, 
                  serving clients nationwide.
                </p>
                
                <p>
                  Certified as a Tax Planner, Katia specializes in strategic tax planning. After gaining experience at a Big 4 
                  accounting firm, she launched her own practice. Committed to staying up-to-date with tax laws, Katia delivers 
                  reliable, high-quality service with a direct, honest approach.
                </p>
                
                <p>
                  Outside of work, she enjoys family time, traveling, hiking, and snowboarding.
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Why Choose EW CPA Tax & Bookkeeping LLC?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Personalized Service</h4>
                      <p className="text-sm text-muted-foreground">Direct access to your CPA, not a call center</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Proactive Planning</h4>
                      <p className="text-sm text-muted-foreground">Year-round tax optimization strategies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Expertise</h4>
                      <p className="text-sm text-muted-foreground">Deep understanding of tax laws</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Technology-Driven</h4>
                      <p className="text-sm text-muted-foreground">Modern tools for efficient service</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              OUR TRACK RECORD
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted Nationwide for Over 10 Years
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence has earned us the trust of hundreds of clients across the nation.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover-lift card-professional"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 fade-in">
            <div className="bg-gradient-subtle rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Join Our Satisfied Clients?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience the difference that personalized, professional tax services can make for your financial future.
              </p>
              <button 
                className="btn-professional px-8 py-4 text-lg font-semibold"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Schedule Your Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;