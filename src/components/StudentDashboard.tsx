import { useState } from "react";
import { Map, BookOpen, Play, AlertTriangle, Trophy, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [preparednessLevel] = useState(68);

  const recentBadges = [
    { name: "Fire Safety Expert", icon: "🔥", earned: true },
    { name: "Earthquake Warrior", icon: "⚡", earned: true },
    { name: "First Aid Helper", icon: "🏥", earned: false },
    { name: "Safety Scout", icon: "🎯", earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
              <img src="https://images.shiksha.com/mediadata/images/1652095604phpLTdf0U.jpeg" alt="bpit logo" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bhagwan Parshuram Institute of Technology</h1>
              <p className="text-sm text-muted-foreground">Student Portal</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, Keshav!</h2>
                <p className="text-muted-foreground">Ready to improve your emergency preparedness?</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{preparednessLevel}%</div>
                <div className="text-sm text-muted-foreground">Preparedness Level</div>
              </div>
            </div>
            <Progress value={preparednessLevel} className="mt-4 h-3" />
          </CardContent>
        </Card>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Campus Map */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/campus-map')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Map className="w-5 h-5 text-primary" />
                <span>Campus Safety Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Map className="w-12 h-12 text-muted-foreground" />
                <img src="https://assets.kollegeapply.com/images/1751551017205-1512469113phpxVkQNz.png"></img>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive map showing evacuation routes and safety zones
              </p>
              <Button className="w-full">Explore Map</Button>
            </CardContent>
          </Card>

          {/* Learn & Play */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/quiz')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                <span>Learn & Play</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Fire Safety</span>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Earthquake Response</span>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Flood Preparedness</span>
                  <Badge variant="secondary">Next</Badge>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4">Start Learning</Button>
            </CardContent>
          </Card>

          {/* Simulation Mode */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/simulation')}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-accent" />
                <span>Start Simulation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Button variant="outline" size="sm" className="text-xs">🔥 Fire</Button>
                <Button variant="outline" size="sm" className="text-xs">⚡ Earthquake</Button>
                <Button variant="outline" size="sm" className="text-xs">🌊 Flood</Button>
                <Button variant="outline" size="sm" className="text-xs">💨 Storm</Button>
              </div>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Choose Scenario
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Progress & Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed Fire Safety Quiz</p>
                  <p className="text-xs text-muted-foreground">Earned Fire Safety Expert badge</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Earthquake Drill Simulation</p>
                  <p className="text-xs text-muted-foreground">Response time: 45 seconds</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {recentBadges.map((badge, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      badge.earned 
                        ? 'bg-success/10 border-success/20' 
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className={`text-xs font-medium ${
                      badge.earned ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Report Button */}
      <Button 
        onClick={() => navigate('/report-issue')}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-emergency hover:bg-emergency/90"
        size="icon"
      >
        <AlertTriangle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default StudentDashboard;