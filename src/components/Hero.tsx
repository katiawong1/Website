import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
const advisorImageUrl = "https://raw.githubusercontent.com/katiawong1/Website-Images/refs/heads/main/kate_wong_edited_light_grey_001.jpeg";

const Hero = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessOwner: "",
    name: "",
    email: "",
    employeeCount: "",
    businessDuration: "",
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
          to: 'info@e-taxcpa.com',
          subject: 'New CPA Consultation Request',
          formData
        }),
      });

      if (response.ok) {
        alert('Thank you! Your information has been submitted successfully.');
        // Reset form
        setFormData({
          businessOwner: "",
          name: "",
          email: "",
          employeeCount: "",
          businessDuration: "",
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
    <section id="home" className="relative min-h-screen bg-gradient-subtle flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="fade-in">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent-muted text-accent rounded-full text-sm font-semibold mb-4">
                CPA TAX ADVISOR NATIONWIDE
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              LOOKING FOR A{" "}
              <span className="gradient-text">CPA TAX ADVISOR</span>{" "}
              YOU CAN TRUST?
            </h1>
            
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-accent mb-4">
                AND WE CAN HELP.
              </h2>
            </div>

            {/* Multi-step Contact form */}
            <div className="card-professional max-w-md">
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
                {/* Step 1: Business Owner + Contact Info */}
                {currentStep === 1 && (
                  <>
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Do you own a business?
                      </Label>
                      <RadioGroup value={formData.businessOwner} onValueChange={(value) => updateFormData('businessOwner', value)}>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no">No</Label>
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

                {/* Step 2: Employee Count */}
                {currentStep === 2 && (
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      How many employees do you have?
                    </Label>
                    <Select value={formData.employeeCount} onValueChange={(value) => updateFormData('employeeCount', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="just-me">Just me</SelectItem>
                        <SelectItem value="1-5">1-5 employees</SelectItem>
                        <SelectItem value="6-10">6-10 employees</SelectItem>
                        <SelectItem value="11-25">11-25 employees</SelectItem>
                        <SelectItem value="26-50">26-50 employees</SelectItem>
                        <SelectItem value="51-100">51-100 employees</SelectItem>
                        <SelectItem value="100+">100+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Step 3: Business Duration */}
                {currentStep === 3 && (
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">
                      How long have you been operating your business?
                    </Label>
                    <Select value={formData.businessDuration} onValueChange={(value) => updateFormData('businessDuration', value)}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select business duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-20">11-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
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
            <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Licensed CPA</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>20+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Nationwide Service</span>
              </div>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="lg:flex justify-center fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-3xl opacity-20 animate-float"></div>
              <div className="relative z-10 w-full max-w-lg rounded-2xl shadow-professional hover-lift overflow-hidden">
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