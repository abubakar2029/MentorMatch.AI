import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Target, ArrowRight, CheckCircle } from "lucide-react";
import { MenteeRegistrationDialog } from "@/components/MenteeRegistrationDialog";

export const HowItWorksSection = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "AI Finds Matches",
      description: "Our advanced algorithm analyzes thousands of profiles to find your perfect mentor.",
      features: ["Smart compatibility scoring", "Industry expertise matching", "Goal alignment analysis"]
    },
    {
      step: "02",
      icon: MessageCircle,
      title: "Connect & Communicate",
      description: "Start conversations with your matches and schedule your first mentorship session.",
      features: ["Secure messaging platform", "Video call integration", "Smart scheduling tools"]
    },
    {
      step: "03",
      icon: Target,
      title: "Achieve Your Goals",
      description: "Work together to reach your objectives with ongoing support and progress tracking.",
      features: ["Goal setting framework", "Progress monitoring", "Continuous feedback"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes it easy to find and connect with the right mentor in just a few steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.step}
                  className="flex items-start space-x-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    <div className="space-y-2">
                      {step.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="p-8 border border-gray-200 bg-white shadow-lg">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">
                    Join our community of professionals who have found their perfect mentor through our platform.
                  </p>
                </div>
                  
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white group"
                  onClick={() => setIsRegistrationOpen(true)}
                >
                  Find Your Mentor
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <MenteeRegistrationDialog 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />
    </section>
  );
};