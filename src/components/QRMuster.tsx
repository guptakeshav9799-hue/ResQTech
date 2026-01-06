import { useState, useEffect } from "react";
import { ArrowLeft, QrCode, Users, CheckCircle, Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { mockStudents } from "@/data/mockData";

const QRMuster = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(mockStudents);
  const [assemblyPoint] = useState("Assembly Point A - Main Campus");
  const [drillStartTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isScanning, setIsScanning] = useState(false);

  const safeStudents = students.filter(s => s.status === 'safe').length;
  const totalStudents = students.length;
  const safePercentage = (safeStudents / totalStudents) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const elapsedTime = Math.floor((currentTime.getTime() - drillStartTime.getTime()) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate QR scan delay
    setTimeout(() => {
      const pendingStudents = students.filter(s => s.status === 'pending');
      if (pendingStudents.length > 0) {
        const randomStudent = pendingStudents[Math.floor(Math.random() * pendingStudents.length)];
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.id === randomStudent.id
              ? { ...student, status: 'safe' }
              : student
          )
        );
      }
      setIsScanning(false);
    }, 1500);
  };

  const markAllSafe = () => {
    setStudents(prevStudents =>
      prevStudents.map(student => ({ ...student, status: 'safe' }))
    );
  };

  const resetDrill = () => {
    setStudents(mockStudents);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-success';
      case 'pending': return 'text-warning';
      case 'missing': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'missing': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <QrCode className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">QR Muster Point System</h1>
                <p className="text-sm text-muted-foreground">{assemblyPoint}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{minutes}:{seconds.toString().padStart(2, '0')}</div>
            <div className="text-sm text-muted-foreground">Elapsed Time</div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* QR Scanner Simulation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  <span>QR Code Scanner</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-4 border-2 border-primary rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-primary" />
                  </div>
                  {isScanning && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {isScanning ? 'Scanning QR code...' : 'Point camera at student QR code'}
                  </p>
                  
                  <Button 
                    onClick={simulateScan} 
                    disabled={isScanning}
                    className="w-full"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4 mr-2" />
                        Simulate Scan
                      </>
                    )}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={markAllSafe}>
                      Mark All Safe
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetDrill}>
                      Reset Drill
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Drill Statistics */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Drill Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Target Time:</span>
                    <span className="font-medium">5:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Time:</span>
                    <span className="font-medium">{minutes}:{seconds.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Safe Rate:</span>
                    <span className="font-medium">{Math.round(safePercentage)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Response Grade:</span>
                    <span className={`font-medium ${
                      safePercentage >= 90 ? 'text-success' :
                      safePercentage >= 70 ? 'text-warning' : 'text-destructive'
                    }`}>
                      {safePercentage >= 90 ? 'Excellent' :
                       safePercentage >= 70 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Status Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center bg-success/10">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-success">{safeStudents}</div>
                  <div className="text-sm text-muted-foreground">Safe</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-warning/10">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-warning">
                    {students.filter(s => s.status === 'pending').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-destructive/10">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-destructive">
                    {students.filter(s => s.status === 'missing').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Missing</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Evacuation Progress</span>
                  <span>{safeStudents} / {totalStudents} students safe</span>
                </div>
                <Progress value={safePercentage} className="h-3" />
              </CardContent>
            </Card>

            {/* Student List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Class 10-A Student Status</span>
                  </div>
                  <Badge variant="outline">{safeStudents}/{totalStudents}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {students.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          student.status === 'safe' ? 'bg-success/20' :
                          student.status === 'pending' ? 'bg-warning/20' :
                          'bg-destructive/20'
                        }`}>
                          <div className={getStatusColor(student.status)}>
                            {getStatusIcon(student.status)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.class}</div>
                        </div>
                      </div>
                      <Badge variant={
                        student.status === 'safe' ? 'default' :
                        student.status === 'pending' ? 'secondary' :
                        'destructive'
                      }>
                        {student.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Complete Drill Button */}
            {safePercentage === 100 && (
              <Card className="bg-success/10 border-success">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-success mb-2">All Students Accounted For!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Evacuation completed in {minutes}:{seconds.toString().padStart(2, '0')}
                  </p>
                  <Button onClick={() => navigate('/after-action-report')}>
                    Generate Drill Report
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRMuster;