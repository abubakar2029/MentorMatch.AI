import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, User } from "lucide-react";

interface MenteeRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenteeRegistrationDialog = ({ isOpen, onClose }: MenteeRegistrationDialogProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    country: "",
    currentRole: "",
    industryInterest: "",
    mentorshipGoals: [] as string[],
    bio: "",
    availability: [] as string[],
    languages: [] as string[]
  });
  const [errors, setErrors] = useState({} as Record<string, string>);

  const availabilityOptions = ["Weekdays", "Weekends", "Evenings"];
  const goals = [
    "Career Development", "Leadership", "Technical Skills", "Entrepreneurship", "Public Speaking",
    "Networking", "Work-Life Balance", "Industry Insights", "Skill Development", "Job Search",
    "Interview Preparation", "Project Management", "Team Management", "Strategy", "Innovation"
  ];

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.country) newErrors.country = "Country is required";
    } else if (step === 2) {
      if (!formData.currentRole) newErrors.currentRole = "Current role is required";
      if (!formData.industryInterest) newErrors.industryInterest = "Industry interest is required";
      if (formData.mentorshipGoals.length === 0) newErrors.mentorshipGoals = "At least one goal is required";
    } else if (step === 3) {
      if (!formData.bio) newErrors.bio = "Bio is required";
      if (formData.availability.length === 0) newErrors.availability = "At least one availability option is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Mentee registration data:", formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-6">Find Your Mentor</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <Card className="p-6 bg-gray-50">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a password"
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="Enter your country"
                      className={errors.country ? "border-red-500" : ""}
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Your age"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      placeholder="Enter your gender"
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => validateStep() && setStep(2)} 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Professional Information</h3>
              <Card className="p-6 bg-gray-50">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role *</Label>
                    <Input
                      id="currentRole"
                      value={formData.currentRole}
                      onChange={(e) => handleInputChange('currentRole', e.target.value)}
                      placeholder="e.g., Student, Junior Developer"
                      className={errors.currentRole ? "border-red-500" : ""}
                    />
                    {errors.currentRole && <p className="text-red-500 text-sm">{errors.currentRole}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industryInterest">Industry Interest *</Label>
                    <Input
                      id="industryInterest"
                      value={formData.industryInterest}
                      onChange={(e) => handleInputChange('industryInterest', e.target.value)}
                      placeholder="e.g., Technology"
                      className={errors.industryInterest ? "border-red-500" : ""}
                    />
                    {errors.industryInterest && <p className="text-red-500 text-sm">{errors.industryInterest}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Mentorship Goals *</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border rounded-md p-4 bg-white">
                      {goals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={formData.mentorshipGoals.includes(goal)}
                            onCheckedChange={() => handleArrayToggle('mentorshipGoals', goal)}
                          />
                          <Label htmlFor={goal} className="text-sm">{goal}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.mentorshipGoals && <p className="text-red-500 text-sm">{errors.mentorshipGoals}</p>}
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)} 
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={() => validateStep() && setStep(3)} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Additional Information</h3>
              <Card className="p-6 bg-gray-50">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself (max 500 characters)"
                      maxLength={500}
                      className={errors.bio ? "border-red-500" : ""}
                    />
                    {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Availability *</Label>
                    <div className="flex flex-wrap gap-4">
                      {availabilityOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option}
                            checked={formData.availability.includes(option)}
                            onCheckedChange={() => handleArrayToggle('availability', option)}
                          />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages</Label>
                    <Input
                      id="languages"
                      value={formData.languages.join(", ")}
                      onChange={(e) => handleInputChange('languages', e.target.value.split(", ").filter(Boolean))}
                      placeholder="Enter languages (comma-separated)"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(2)} 
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Complete Registration
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};