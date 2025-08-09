import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Bell, Link } from "lucide-react";
import { SignInDialog } from "./SignInDialog";
import { MenteeRegistrationDialog } from "./MenteeRegistrationDialog";
import { MentorRegistrationDialog } from "./MentorRegistrationDialog";
import { redirect, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMentorRegistrationOpen, setIsMentorRegistrationOpen] = useState(false);
  const [isMenteeRegistrationOpen, setIsMenteeRegistrationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // ✅ Check login status from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    setIsLoggedIn(!!storedUser);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">MentorMatch.AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>

            {isLoggedIn ? (
              // ✅ Show Bell icon when logged in
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => navigate("/MentorGallery")}
              >
                <Bell className="w-4 h-4 text-gray-600 !bg-transparent" />
                {/* Optional: Notification Dot */}
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            ) : (
              <>
                <Button
                  className="bg-transparent text-gray-500 hover:text-gray-800 hover:bg-transparent"
                  onClick={() => setIsSignInOpen(true)}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsMentorRegistrationOpen(true)}
                >
                  Become a Mentor
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-card-border bg-background/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>

              <div className="px-3 py-2 space-y-2">
                {isLoggedIn ? (
                  <Button
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-6 h-6 text-gray-600" />
                    {/* Optional: Notification Dot */}
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsSignInOpen(true)}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setIsMentorRegistrationOpen(true)}
                    >
                      Become a Mentor
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <SignInDialog isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <MentorRegistrationDialog
        isOpen={isMentorRegistrationOpen}
        onClose={() => setIsMentorRegistrationOpen(false)}
      />
      <MenteeRegistrationDialog
        isOpen={isMenteeRegistrationOpen}
        onClose={() => setIsMenteeRegistrationOpen(false)}
      />
    </nav >
  );
};
