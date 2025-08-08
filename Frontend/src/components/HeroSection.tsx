import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MentorRegistrationDialog } from "@/components/MentorRegistrationDialog";
import { MenteeRegistrationDialog } from "@/components/MenteeRegistrationDialog";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  const [isMentorRegistrationOpen, setIsMentorRegistrationOpen] = useState(false);
  const [isMenteeRegistrationOpen, setIsMenteeRegistrationOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary-glow/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in-up">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Find Your Perfect
              <br />
              <span className="text-blue-600">Mentor</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our AI matches you with ideal mentors based on your goals, experience, and interests. 
              Start your growth journey today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg group"
              onClick={() => setIsMenteeRegistrationOpen(true)}
            >
              Find Your Mentor
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => setIsMentorRegistrationOpen(true)}
            >
              Become a Mentor
            </Button>
          </div>
        </div>
      </div>
      
      <MentorRegistrationDialog 
        isOpen={isMentorRegistrationOpen} 
        onClose={() => setIsMentorRegistrationOpen(false)} 
      />
      <MenteeRegistrationDialog 
        isOpen={isMenteeRegistrationOpen} 
        onClose={() => setIsMenteeRegistrationOpen(false)} 
      />
    </div>
  );
};