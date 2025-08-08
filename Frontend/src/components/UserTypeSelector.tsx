import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Award } from "lucide-react";
import mentorAvatar from "@/assets/mentor-avatar.png";
import menteeAvatar from "@/assets/mentee-avatar.png";
import { MentorRegistrationDialog } from "@/components/MentorRegistrationDialog";
import { MenteeRegistrationDialog } from "@/components/MenteeRegistrationDialog";

export const UserTypeSelector = () => {
  const [isMentorRegistrationOpen, setIsMentorRegistrationOpen] = useState(false);
  const [isMenteeRegistrationOpen, setIsMenteeRegistrationOpen] = useState(false);

  return (
    <section id="get-started" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Choose Your <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to learn from others or share your expertise, we'll match you perfectly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mentee Card */}
          <Card className="p-8 group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="relative">
                <img 
                  src={menteeAvatar} 
                  alt="Mentee" 
                  className="w-24 h-24 mx-auto rounded-full shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">I Want to Learn</h3>
                <p className="text-muted-foreground">Connect with experienced mentors who can guide your growth</p>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white group"
                onClick={() => setIsMenteeRegistrationOpen(true)}
              >
                Find Your Mentor
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          {/* Mentor Card */}
          <Card className="p-8 group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 text-center space-y-6">
              <div className="relative">
                <img 
                  src={mentorAvatar} 
                  alt="Mentor" 
                  className="w-24 h-24 mx-auto rounded-full shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">I Want to Mentor</h3>
                <p className="text-muted-foreground">Share your expertise and help others achieve their goals</p>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white group"
                onClick={() => setIsMentorRegistrationOpen(true)}
              >
                Become a Mentor
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
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
    </section>
  );
};