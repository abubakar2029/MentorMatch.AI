import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">MentorMatch.AI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting ambitious learners with experienced mentors through the power of AI. 
              Join our community of professionals.
            </p>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <div className="space-y-2">
              <a href="#browse" className="block text-gray-300 hover:text-white transition-colors text-sm">Browse Mentors</a>
              <a href="#get-started" className="block text-gray-300 hover:text-white transition-colors text-sm">Get Started</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors text-sm">How It Works</a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors text-sm">Features</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Help Center</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Community Guidelines</a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">About Us</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 MentorMatch.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};