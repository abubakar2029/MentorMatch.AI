import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Briefcase } from "lucide-react";
import axios from "axios";

interface MentorRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MentorRegistrationDialog = ({ isOpen, onClose }: MentorRegistrationDialogProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age: "",
    profilePhoto: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    gender: "",
    country: "",
    jobRole: "",
    industry: "",
    experienceYears: "",
    mentorshipTopics: [] as string[],
    bio: "",
    availability: [] as string[],
    languages: [] as string[],
    linkedIn: "",
    website: ""
  });
  const [errors, setErrors] = useState({} as Record<string, string>);

  const availabilityOptions = ["Weekdays", "Weekends", "Evenings"];
  const topics = [
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
      if (!formData.jobRole) newErrors.jobRole = "Job role is required";
      if (!formData.industry) newErrors.industry = "Industry is required";
      if (!formData.experienceYears) newErrors.experienceYears = "Years of experience is required";
      if (formData.mentorshipTopics.length === 0) newErrors.mentorshipTopics = "At least one topic is required";
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

  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/mentor/register/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ Registration successful:", response.data);
        onClose();
      } catch (error: any) {
        console.error("❌ Registration failed:", error.response?.data || error.message);
        // Optional: Show error to user
        setErrors(prev => ({
          ...prev,
          submit: error.response?.data?.message || "Registration failed. Please try again."
        }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-6">Become a Mentor</DialogTitle>
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
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                    <Label htmlFor="jobRole">Job Role *</Label>
                    <Input
                      id="jobRole"
                      value={formData.jobRole}
                      onChange={(e) => handleInputChange('jobRole', e.target.value)}
                      placeholder="e.g., Software Engineer"
                      className={errors.jobRole ? "border-red-500" : ""}
                    />
                    {errors.jobRole && <p className="text-red-500 text-sm">{errors.jobRole}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      placeholder="e.g., Technology"
                      className={errors.industry ? "border-red-500" : ""}
                    />
                    {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (Years) *</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                      placeholder="Years of experience"
                      className={errors.experienceYears ? "border-red-500" : ""}
                    />
                    {errors.experienceYears && <p className="text-red-500 text-sm">{errors.experienceYears}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Mentorship Topics *</Label>
                    <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border rounded-md p-4 bg-white">
                      {topics.map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                            id={topic}
                            checked={formData.mentorshipTopics.includes(topic)}
                            onCheckedChange={() => handleArrayToggle('mentorshipTopics', topic)}
                          />
                          <Label htmlFor={topic} className="text-sm">{topic}</Label>
                        </div>
                      ))}
                    </div>
                    {errors.mentorshipTopics && <p className="text-red-500 text-sm">{errors.mentorshipTopics}</p>}
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
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                      <Input
                        id="linkedIn"
                        value={formData.linkedIn}
                        onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="Your website URL"
                      />
                    </div>
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