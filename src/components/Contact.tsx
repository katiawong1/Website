import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'anton.osipov@daveenci.com',
          subject: 'New Contact Form Submission',
          formData
        }),
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.');
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "(737) 264-7589",
      action: "tel:+17372647589"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "info@e-taxcpa.com",
      action: "mailto:info@e-taxcpa.com"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Service Area",
      details: "Nationwide",
      action: null
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM CST",
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-[#eeeeee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 fade-in">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Contact us today for a free consultation. Let's discuss how we can help 
            optimize your taxes and secure your financial future.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact form - wider, takes 2 columns */}
          <div className="lg:col-span-2 fade-in">
            <div className="card-professional h-full">
              <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-12"
                    placeholder="(737) 264-7589"
                  />
                </div>

                <div className="flex-1">
                  <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="min-h-[160px] resize-none"
                    placeholder="Tell us about your tax situation and how we can help..."
                  />
                </div>

                <Button type="submit" className="btn-professional w-full group mt-auto" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact information - single column, aligned with form height */}
          <div className="fade-in">
            <div className="card-professional h-full">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              {/* Contact methods */}
              <div className="space-y-6 flex-1">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg hover:bg-accent/5 cursor-pointer group transition-colors"
                    onClick={() => info.action && window.open(info.action)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-accent group-hover:scale-110 transition-transform duration-300 mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {info.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;