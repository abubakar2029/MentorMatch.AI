import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInDialog = ({ isOpen, onClose }: SignInDialogProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending sign in request:", formData);

      const response = await axios.post(
          "http://127.0.0.1:8000/api/signin/",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      // ✅ Store in localStorage
      localStorage.setItem("userData", JSON.stringify(response.data));

      // ✅ Log & Toast success
      console.log("✅ Sign in successful:", response.data);
      toast.success("Signed in successfully!");

      onClose();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Sign in failed";
      console.error("❌ Sign in error:", errorMsg);

      // ✅ Toast error
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Sign In</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}{" "}
            {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onClose}
                className="text-blue-600 hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
