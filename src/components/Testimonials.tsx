import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Small Business Owner",
      content: "EW CPA Tax & Bookkeeping LLC saved my business thousands in taxes through their proactive planning. Their expertise in the business landscape is unmatched.",
      rating: 5,
      company: "Design Studio"
    },
    {
      name: "Michael Rodriguez",
      role: "Tech Executive",
      content: "Professional, responsive, and incredibly knowledgeable. They made tax season stress-free and found deductions I didn't even know existed.",
      rating: 5,
      company: "TechFlow Solutions"
    },
    {
      name: "Jennifer Adams",
      role: "Real Estate Investor",
      content: "The tax planning strategies they provided have been game-changing for my investment portfolio. Highly recommend their services.",
      rating: 5,
      company: "Adams Properties"
    },
    {
      name: "David Chen",
      role: "Consultant",
      content: "Finally found a CPA who understands my complex situation. Their personalized approach and attention to detail is exceptional.",
      rating: 5,
      company: "Independent Consultant"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 fade-in">
          <span className="inline-block px-4 py-2 bg-gold-muted text-gold rounded-full text-sm font-semibold mb-4">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what businesses and individuals 
            have to say about working with EW CPA Tax & Bookkeeping LLC.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-professional hover-lift fade-in relative`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-accent/20">
                <Quote className="h-8 w-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-gold fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-accent font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 fade-in">
          <div className="inline-flex items-center space-x-4 bg-success/10 text-success px-6 py-3 rounded-full">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-semibold">4.9/5 Average Rating</span>
            <span className="text-muted-foreground">•</span>
            <span className="font-semibold">500+ Happy Clients</span>
          </div>
          
          <p className="text-lg text-muted-foreground mt-6 mb-8">
            Join hundreds of satisfied clients who trust E-Tax CPA with their financial future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-professional"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule Your Consultation
            </button>
            <button 
              className="btn-outline"
              onClick={() => document.getElementById('client-testimonials')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Read More Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;