import { Card } from "@/components/ui/card";
import { Brain, Users, MessageSquare, Calendar, Shield, Zap } from "lucide-react";
import aiIcon from "@/assets/ai-icon.png";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced algorithm analyzes your goals, experience, and preferences to find perfect mentorship matches.",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Connect with mentors and mentees from around the world across different industries and expertise levels.",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: MessageSquare,
      title: "Secure Messaging",
      description: "Built-in secure messaging system to communicate safely and effectively with your mentorship partners.",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All mentors are verified for authenticity and expertise to ensure quality mentorship experiences.",
      gradient: "from-blue-50 to-blue-100"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-card-border rounded-full px-4 py-2 shadow-card">
            <img src={aiIcon} alt="AI" className="w-4 h-4" />
            <span className="text-sm font-medium text-muted-foreground">Powered by Advanced AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose <span className="text-blue-600">MentorMatch.AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of mentorship with our cutting-edge features designed to create meaningful connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="p-8 group relative overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};