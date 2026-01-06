import { Shield, Users, UserCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "student" | "teacher" | "admin") => {
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ResQTech
            </h1>
            <p className="text-lg font-medium text-foreground">
              Adaptive Resilience System
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Emergency preparedness for educational institutions
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Select Your Role
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleRoleSelect("student")}
              variant="outline"
              size="lg"
              className="w-full h-16 text-left justify-start space-x-4 border-primary/20 hover:border-primary hover:bg-primary/5 text-black hover:text-black"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-black">Student</div>
                <div className="text-sm text-black">
                  Access learning modules and drills
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleRoleSelect("teacher")}
              variant="outline"
              size="lg"
              className="w-full h-16 text-left justify-start space-x-4 border-secondary/20 hover:border-secondary hover:bg-secondary/5 text-black hover:text-black"
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="font-semibold text-black">Teacher</div>
                <div className="text-sm text-black">
                  Manage classes and conduct drills
                </div>
              </div>
            </Button>

            <Button
              onClick={() => handleRoleSelect("admin")}
              variant="outline"
              size="lg"
              className="w-full h-16 text-left justify-start space-x-4 border-accent/20 hover:border-accent hover:bg-accent/5 text-black hover:text-black"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-black">Administrator</div>
                <div className="text-sm text-black">
                  Full system access and analytics
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 ResQTech - Building Safer Educational Environments</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
