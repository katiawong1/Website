import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
const advisorImageUrl = "https://raw.githubusercontent.com/katiawong1/Website-Images/refs/heads/main/kate_wong_edited_light_blue_001.png";

const Hero = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    taxPlanning: "yes",
    discoveryCall: "yes",
    businessOwner: "yes",
    name: "",
    email: "",
    helpNeeded: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
          subject: 'New CPA Consultation Request',
          formData
        }),
      });

      if (response.ok) {
        alert('Thank you! Your information has been submitted successfully.');
        // Reset form
        setFormData({
          taxPlanning: "yes",
          discoveryCall: "yes",
          businessOwner: "yes",
          name: "",
          email: "",
          helpNeeded: ""
        });
        setCurrentStep(1);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="home" className="relative min-h-screen bg-[#eeeeee] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column - Content */}
          <div className="fade-in">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-4 py-2 bg-accent-muted text-accent rounded-full text-sm font-semibold mb-3 sm:mb-4">
                CPA TAX ADVISOR NATIONWIDE
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              OVERPAYING IN TAXES? WORK WITH A CPA WHO{" "}
              <span className="gradient-text">SPECIALIZES IN STRATEGIC</span>{" "}
              TAX PLANNING!
            </h1>
            
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent mb-3 sm:mb-4">
                WE'VE GOT YOU COVERED.
              </h2>
            </div>

            {/* Multi-step Contact form */}
            <div className="card-professional max-w-md w-full">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step {currentStep} of 4
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full ${
                          step <= currentStep ? 'bg-accent' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <form onSubmit={currentStep === 4 ? handleSubmit : handleNext} className="space-y-6">
                {/* Step 1: Tax Planning */}
                {currentStep === 1 && (
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      Are you looking for help with proactive tax planning?
                    </Label>
                    <RadioGroup value={formData.taxPlanning} onValueChange={(value) => updateFormData('taxPlanning', value)}>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="tax-planning-yes" />
                          <Label htmlFor="tax-planning-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="tax-planning-no" />
                          <Label htmlFor="tax-planning-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 2: Discovery Call + Contact Info */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Interested in a complimentary tax planning discovery call?
                      </Label>
                      <RadioGroup value={formData.discoveryCall} onValueChange={(value) => updateFormData('discoveryCall', value)}>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="discovery-yes" />
                            <Label htmlFor="discovery-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="discovery-no" />
                            <Label htmlFor="discovery-no">No</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Business Owner */}
                {currentStep === 3 && (
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      Do you own a business?
                    </Label>
                    <RadioGroup value={formData.businessOwner} onValueChange={(value) => updateFormData('businessOwner', value)}>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="business-yes" />
                          <Label htmlFor="business-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="business-no" />
                          <Label htmlFor="business-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 4: Help Needed */}
                {currentStep === 4 && (
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      What do you need the most help with right now?
                    </Label>
                    <Textarea
                      placeholder="Please describe what you need help with..."
                      value={formData.helpNeeded}
                      onChange={(e) => updateFormData('helpNeeded', e.target.value)}
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 h-12"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="btn-professional flex-1 h-12 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : currentStep === 4 ? (
                      "Submit"
                    ) : (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Licensed CPA</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Nationwide Service</span>
              </div>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="flex justify-center fade-in mt-6 sm:mt-8 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-3xl opacity-20 animate-float"></div>
              <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl shadow-professional hover-lift overflow-hidden">
                <div className="aspect-[4/5] w-full">
                  <img
                    src={advisorImageUrl}
                    alt="Professional CPA advisor"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;