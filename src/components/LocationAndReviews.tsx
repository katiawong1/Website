import GoogleReviews from './GoogleReviews';
import { GOOGLE_PLACE_ID } from '../config/google';

const LocationAndReviews = () => {
  return (
    <>
      {/* Service Area Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="inline-block px-4 py-2 bg-accent-muted text-accent rounded-full text-sm font-semibold mb-4">
              SERVICE AREA
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Serving Clients{" "}
              <span className="gradient-text">Nationwide</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We proudly serve clients across the United States. 
              Our expertise ensures you get the best tax strategies regardless of your location.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="fade-in">
              <div className="card-professional text-center">
                <h3 className="text-2xl font-bold mb-6">How We Serve You Nationwide</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-accent rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Virtual Consultations</h4>
                    <p className="text-sm text-muted-foreground">Secure video calls and phone consultations available at your convenience</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-accent rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Secure Document Sharing</h4>
                    <p className="text-sm text-muted-foreground">Encrypted portals for safe transmission of your sensitive tax documents</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-accent rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold">Nationwide Expertise</h4>
                    <p className="text-sm text-muted-foreground">Licensed to serve clients across all 50 states with comprehensive tax knowledge</p>
                  </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                  <h4 className="font-semibold text-accent mb-2">
                    Professional Remote Service
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our fully digital process ensures you receive the same high-quality service regardless of your location. 
                    From initial consultation to final filing, we handle everything remotely with the utmost security and professionalism.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="client-testimonials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. See what our satisfied clients have to say about our tax services.
            </p>
          </div>

          <div className="fade-in">
            <GoogleReviews 
              placeId={GOOGLE_PLACE_ID} 
              className="max-w-6xl mx-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationAndReviews;
