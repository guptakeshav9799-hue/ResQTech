import { useState } from "react";
import { Shield, BarChart3, MapPin, FileText, TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { mockReports, institutionRankings, drillHistory } from "@/data/mockData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [resilienceScore] = useState(78);

  const campusStats = {
    totalBuildings: 8,
    totalStudents: 1247,
    totalStaff: 89,
    lastDrillDate: "Jan 10, 2024",
    avgDrillTime: "4.2 min",
    completedDrills: 12
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bhagwan Parshuram Institute of Technology</h1>
              <p className="text-sm text-muted-foreground">Emergency Preparedness Control Center</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel - Campus Map */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Live Campus Map</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/campus-map')}
                  >
                    Full View
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                  {/* Simplified campus map */}
                  <div className="absolute inset-4 bg-card rounded border-2 border-dashed border-primary/30">
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Campus Overview</span>
                        <Badge variant="outline">Live Status</Badge>
                      </div>
                      
                      {/* Building indicators */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="p-2 bg-success/20 rounded text-xs text-center border border-success/30">
                          Main Building<br />
                          <span className="font-semibold text-success">Safe</span>
                        </div>
                        <div className="p-2 bg-warning/20 rounded text-xs text-center border border-warning/30">
                          Girl's Hostel Building<br />
                          <span className="font-semibold text-warning">Caution</span>
                        </div>
                        <div className="p-2 bg-success/20 rounded text-xs text-center border border-success/30">
                          Library<br />
                          <span className="font-semibold text-success">Safe</span>
                        </div>
                        <div className="p-2 bg-success/20 rounded text-xs text-center border border-success/30">
                          Cafeteria<br />
                          <span className="font-semibold text-success">Safe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{campusStats.totalBuildings}</div>
                    <div className="text-xs text-muted-foreground">Buildings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{campusStats.totalStudents}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{campusStats.totalStaff}</div>
                    <div className="text-xs text-muted-foreground">Staff</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  <span>Safety Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-xl font-bold text-primary">{campusStats.avgDrillTime}</div>
                    <div className="text-sm text-muted-foreground">Avg Drill Time</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/10 rounded-lg">
                    <div className="text-xl font-bold text-secondary">
                      Sep 13, 2025
                    </div>

                    <div className="text-sm text-muted-foreground">Last Drill</div>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-lg">
                    <div className="text-xl font-bold text-accent">{campusStats.completedDrills}</div>
                    <div className="text-sm text-muted-foreground">Drills This Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Reports & Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resilience Index */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span>Campus Resilience Index</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/rankings')}
                  >
                    View Rankings
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{resilienceScore}/100</div>
                    <Progress value={resilienceScore} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Good - Above average preparedness level
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-lg font-semibold text-success">96%</div>
                      <div className="text-xs text-muted-foreground">Staff Trained</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-lg font-semibold text-primary">4.2min</div>
                      <div className="text-xs text-muted-foreground">Avg Response</div>
                    </div>
                  </div>
                  
                  {/* Mini Leaderboard */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Institution Rankings</h4>
                    {institutionRankings.slice(0, 4).map((institution) => (
                      <div key={institution.rank} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">#{institution.rank}</Badge>
                          <span className={institution.name === "Your Institution" ? "font-semibold text-primary" : ""}>
                            {institution.name}
                          </span>
                        </div>
                        <span className="font-semibold">{institution.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-warning" />
                    <span>Active Reports</span>
                  </div>
                  <Badge variant="outline">{mockReports.filter(r => r.status !== 'Resolved').length} Open</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockReports.slice(0, 4).map((report) => (
                  <div key={report.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{report.title}</h4>
                        <p className="text-xs text-muted-foreground">{report.building}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant={
                          report.severity === 'Critical' ? 'destructive' :
                          report.severity === 'High' ? 'destructive' :
                          report.severity === 'Medium' ? 'default' : 'secondary'
                        } >
                          {report.severity}
                        </Badge>
                        <Badge variant={
                          report.status === 'Resolved' ? 'outline' :
                          report.status === 'In Progress' ? 'default' : 'secondary'
                        } >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Reported by: {report.reporter}
                    </p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">View All Reports</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;