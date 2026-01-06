import { useState } from "react";
import { MapPin, ArrowLeft, AlertTriangle, CheckCircle, Clock, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { campusLocations } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CampusMap = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<typeof campusLocations[0] | null>(null);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-success border-success bg-success/20';
      case 'Medium': return 'text-warning border-warning bg-warning/20';
      case 'High': return 'text-emergency border-emergency bg-emergency/20';
      default: return 'text-muted-foreground border-border bg-muted/20';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return <CheckCircle className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">Campus Safety Map</h1>
                <p className="text-sm text-muted-foreground">Interactive emergency preparedness map</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-success border-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              All Systems Normal
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Bhagwan Parshuram Institute of Technology Campus</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">Zoom In</Button>
                    <Button size="sm" variant="outline">Zoom Out</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="relative w-full h-[500px] bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg overflow-hidden">
                  {/* Background campus outline */}
                  <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg">
                    <img 
                    src="/campus-map1.jpg" 
                    alt="Campus Map" 
                    className="w-full h-full object-contain" 
                    />


                    {/* Campus locations as interactive pins */}
                    {campusLocations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => setSelectedLocation(location)}
                        className={`absolute w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${getRiskColor(location.riskLevel)} shadow-lg`}
                        style={{
                          left: `${location.position.x}%`,
                          top: `${location.position.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {getRiskIcon(location.riskLevel)}
                      </button>
                    ))}

                    {/* Assembly points */}
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">A</span>
                    </div>
                    <div className="absolute top-40 right-20 w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2">
                      <span className="text-white font-bold text-xs">B</span>
                    </div>
                    <div className="absolute top-4 left-1/2 w-8 h-8 bg-accent rounded-full border-4 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2">
                      <span className="text-white font-bold text-xs">C</span>
                    </div>

                    {/* Campus roads/paths */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path 
                          d="M 10 50 Q 50 30 90 50" 
                          stroke="currentColor" 
                          strokeWidth="0.5" 
                          fill="none" 
                          className="text-muted-foreground opacity-50"
                          strokeDasharray="2,2"
                        />
                        <path 
                          d="M 50 10 L 50 90" 
                          stroke="currentColor" 
                          strokeWidth="0.5" 
                          fill="none" 
                          className="text-muted-foreground opacity-50"
                          strokeDasharray="2,2"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur rounded-lg p-3 border">
                    <h4 className="font-semibold text-sm mb-2">Legend</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span>Safe Zone (Low Risk)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <span>Caution Zone (Medium Risk)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-emergency"></div>
                        <span>High Risk Zone</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span>Assembly Points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Building Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedLocation ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
                      <Badge className={getRiskColor(selectedLocation.riskLevel)}>
                        {getRiskIcon(selectedLocation.riskLevel)}
                        <span className="ml-1">{selectedLocation.riskLevel} Risk</span>
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Capacity:</span>
                        <span className="font-medium">{selectedLocation.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current Occupancy:</span>
                        <span className="font-medium">{selectedLocation.currentOccupancy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Utilization:</span>
                        <span className="font-medium">
                          {Math.round((selectedLocation.currentOccupancy / selectedLocation.capacity) * 100)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Evacuation Route</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedLocation.evacuationRoute}
                      </p>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => navigate('/qr-muster')}
                    >
                      Start Drill for this Zone
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Click on a building pin to view details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/simulation')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Campus-wide Drill
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/report-issue')}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Safety Issue
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Occupancy Status
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Location Details Dialog (Mobile) */}
      <Dialog 
        open={!!selectedLocation && window.innerWidth < 1024} 
        onOpenChange={(open) => !open && setSelectedLocation(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedLocation?.name}</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <div className="space-y-4">
              <Badge className={getRiskColor(selectedLocation.riskLevel)}>
                {getRiskIcon(selectedLocation.riskLevel)}
                <span className="ml-1">{selectedLocation.riskLevel} Risk</span>
              </Badge>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Capacity:</span>
                  <span className="font-medium">{selectedLocation.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Occupancy:</span>
                  <span className="font-medium">{selectedLocation.currentOccupancy}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Evacuation Route</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation.evacuationRoute}
                </p>
              </div>

              <Button 
                className="w-full"
                onClick={() => {
                  setSelectedLocation(null);
                  navigate('/qr-muster');
                }}
              >
                Start Drill for this Zone
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampusMap;