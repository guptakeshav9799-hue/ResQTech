import { useState } from "react";
import { Users, AlertCircle, Calendar, FileText, Send, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { mockReports, mockStudents } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [alertSent, setAlertSent] = useState(false);

  const classes = [
    { id: "10A", name: "CSE-A", students: 28, lastDrill: "2024-01-10" },
    { id: "10B", name: "CSE-B", students: 31, lastDrill: "2024-01-08" },
    { id: "9A", name: "CSE-C", students: 26, lastDrill: "2024-01-12" }
  ];  

  const handleSendAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
              <img src="https://images.shiksha.com/mediadata/images/1652095604phpLTdf0U.jpeg" alt="bpit logo" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bhagwan Parshuram Institution of Technology</h1>
              <p className="text-sm text-muted-foreground">Teacher Portal - Vivek Gupta</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Alert Button */}
        <Card className={`transition-colors ${alertSent ? 'bg-success/10 border-success' : 'bg-emergency/5 border-emergency/20'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Send className={`w-6 h-6 ${alertSent ? 'text-success' : 'text-emergency'}`} />
                <div>
                  <h3 className="font-semibold">Emergency Alert System</h3>
                  <p className="text-sm text-muted-foreground">
                    {alertSent ? 'Alert sent to all staff members' : 'Send immediate alert to all staff and administrators'}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleSendAlert}
                variant={alertSent ? "outline" : "destructive"}
                disabled={alertSent}
                className={alertSent ? 'border-success text-success hover:bg-success/10' : ''}
              >
                {alertSent ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Alert Sent
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send All-Staff Alert
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Class Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-secondary" />
                <span>Manage Classes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {classes.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{classItem.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {classItem.students} students
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">Start Drill</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Start Evacuation Drill - {classItem.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>This will initiate an evacuation drill for {classItem.name} ({classItem.students} students).</p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button onClick={() => navigate('/qr-muster')}>Start Drill</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Student Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Student Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockReports.slice(0, 3).map((report) => (
                <div key={report.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{report.title}</span>
                    <Badge variant={
                      report.severity === 'High' ? 'destructive' :
                      report.severity === 'Medium' ? 'default' : 'secondary'
                    }>
                      {report.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{report.building}</p>
                  <p className="text-xs text-muted-foreground">By: {report.reporter}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">View All Reports</Button>
            </CardContent>
          </Card>

          {/* Training Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>Training Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Fire Safety Training</span>
                    <Badge variant="outline">Tomorrow</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">10:00 AM - Main Hall</p>
                </div>
                
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Earthquake Drill</span>
                    <Badge variant="outline">Jan 20</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">2:00 PM - All Buildings</p>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">Schedule New Training</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Statistics */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Drills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Drill Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Fire Drill - CSE-A</div>
                    <div className="text-sm text-muted-foreground">Sep 10, 2025 </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-success">4.2 min</div>
                    <div className="text-xs text-muted-foreground">Excellent</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Earthquake Drill - CSE-B</div>
                    <div className="text-sm text-muted-foreground">Sep 13, 2025</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-warning">5.8 min</div>
                    <div className="text-xs text-muted-foreground">Good</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Class Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Students</span>
                  <span className="font-semibold">85</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Present Today</span>
                  <span className="font-semibold text-success">82</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Safety Training Complete</span>
                  <span className="font-semibold text-primary">78</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Drill Participation</span>
                  <span className="font-semibold">96%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;