import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface SimulationStep {
  id: number;
  action: string;
  description: string;
  duration: number;
  icon: string;
}

const simulationScenarios = {
  fire: {
    name: "Fire Emergency",
    icon: "🔥",
    color: "text-emergency",
    bgColor: "bg-emergency/10",
    steps: [
      { id: 1, action: "ALERT", description: "Fire alarm activated. Stay calm.", duration: 3, icon: "🚨" },
      { id: 2, action: "ASSESS", description: "Check for immediate danger. Feel doors for heat.", duration: 4, icon: "👀" },
      { id: 3, action: "EVACUATE", description: "Exit immediately via nearest safe route.", duration: 5, icon: "🚶" },
      { id: 4, action: "CRAWL LOW", description: "Stay low under smoke. Cover nose and mouth.", duration: 4, icon: "🤏" },
      { id: 5, action: "ASSEMBLY", description: "Report to designated assembly point.", duration: 3, icon: "📍" },
      { id: 6, action: "HEADCOUNT", description: "Wait for attendance check. Stay together.", duration: 2, icon: "✅" }
    ]
  },
  earthquake: {
    name: "Earthquake Emergency", 
    icon: "⚡",
    color: "text-warning",
    bgColor: "bg-warning/10",
    steps: [
      { id: 1, action: "DROP", description: "Immediately drop to hands and knees.", duration: 2, icon: "⬇️" },
      { id: 2, action: "COVER", description: "Take cover under desk or table.", duration: 3, icon: "🛡️" },
      { id: 3, action: "HOLD ON", description: "Hold your position until shaking stops.", duration: 8, icon: "✊" },
      { id: 4, action: "ASSESS", description: "Check for injuries and hazards around you.", duration: 4, icon: "👀" },
      { id: 5, action: "EVACUATE", description: "Exit carefully if building is damaged.", duration: 6, icon: "🚶" },
      { id: 6, action: "ASSEMBLY", description: "Report to outdoor assembly point.", duration: 3, icon: "📍" }
    ]
  },
  flood: {
    name: "Flood Emergency",
    icon: "🌊", 
    color: "text-info",
    bgColor: "bg-info/10",
    steps: [
      { id: 1, action: "ALERT", description: "Flood warning received. Prepare to evacuate.", duration: 5, icon: "📢" },
      { id: 2, action: "GATHER", description: "Collect emergency supplies and documents.", duration: 4, icon: "🎒" },
      { id: 3, action: "MOVE UP", description: "Go to higher floors immediately.", duration: 3, icon: "⬆️" },
      { id: 4, action: "AVOID WATER", description: "Never walk through moving water.", duration: 2, icon: "⛔" },
      { id: 5, action: "SIGNAL", description: "Signal for help if trapped.", duration: 4, icon: "🆘" },
      { id: 6, action: "WAIT SAFELY", description: "Stay on high ground until help arrives.", duration: 5, icon: "⏳" }
    ]
  }
};

const SimulationMode = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof simulationScenarios | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const scenario = selectedScenario ? simulationScenarios[selectedScenario] : null;
  const steps = scenario?.steps || [];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(time => time - 1);
        setTotalTime(total => total + 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(step => step + 1);
        setTimeRemaining(steps[currentStep + 1].duration);
      } else {
        setIsRunning(false);
        setSimulationCompleted(true);
      }
    }

    return () => clearTimeout(timer);
  }, [isRunning, timeRemaining, currentStep, steps]);

  const startSimulation = () => {
    if (scenario) {
      setCurrentStep(0);
      setTimeRemaining(scenario.steps[0].duration);
      setIsRunning(true);
      setTotalTime(0);
      setSimulationCompleted(false);
    }
  };

  const pauseSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setTimeRemaining(0);
    setSimulationCompleted(false);
    setTotalTime(0);
  };

  const getTimeGrade = (time: number) => {
    if (time <= 25) return { grade: "Excellent", color: "text-success", message: "Outstanding response time!" };
    if (time <= 35) return { grade: "Good", color: "text-primary", message: "Good response, room for improvement." };
    if (time <= 45) return { grade: "Average", color: "text-warning", message: "Practice more for better times." };
    return { grade: "Needs Practice", color: "text-destructive", message: "More training needed." };
  };

  // Scenario Selection Screen
  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b shadow-sm px-4 py-3">
          <div className="flex items-center space-x-3 max-w-4xl mx-auto">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold">Emergency Simulation Training</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Choose Your Emergency Scenario</h2>
            <p className="text-muted-foreground">Practice your response to different emergency situations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(simulationScenarios).map(([key, scenario]) => (
              <Card 
                key={key}
                className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${scenario.bgColor}`}
                onClick={() => setSelectedScenario(key as keyof typeof simulationScenarios)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-3xl">{scenario.icon}</span>
                    <span className={scenario.color}>{scenario.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {scenario.steps.length} steps • {scenario.steps.reduce((acc, step) => acc + step.duration, 0)} seconds
                    </div>
                    <div className="space-y-1">
                      {scenario.steps.slice(0, 3).map((step, index) => (
                        <div key={index} className="text-xs text-muted-foreground flex items-center space-x-2">
                          <span>{step.icon}</span>
                          <span>{step.action}</span>
                        </div>
                      ))}
                      {scenario.steps.length > 3 && (
                        <div className="text-xs text-muted-foreground">+ {scenario.steps.length - 3} more steps...</div>
                      )}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Simulation Completed Screen
  if (simulationCompleted && scenario) {
    const timeGrade = getTimeGrade(totalTime);
    
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b shadow-sm px-4 py-3">
          <div className="flex items-center space-x-3 max-w-4xl mx-auto">
            <Button variant="outline" size="sm" onClick={() => setSelectedScenario(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Scenarios
            </Button>
            <h1 className="text-lg font-semibold">Simulation Complete</h1>
          </div>
        </header>

        <div className="max-w-2xl mx-auto p-4">
          <Card className="text-center">
            <CardHeader>
              <div className={`mx-auto w-20 h-20 ${scenario.bgColor} rounded-full flex items-center justify-center mb-4`}>
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <CardTitle className="text-2xl">{scenario.name} - Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {totalTime}s
                </div>
                <div className={`text-lg ${timeGrade.color} font-semibold`}>
                  {timeGrade.grade}
                </div>
                <div className="text-sm text-muted-foreground">
                  {timeGrade.message}
                </div>
              </div>

              <div className="p-4 bg-success/10 rounded-lg">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="font-semibold text-success">You reached the Assembly Zone!</div>
                <div className="text-sm text-muted-foreground">Mark Yourself Safe</div>
              </div>

              <div className="space-y-2">
                <Button onClick={resetSimulation} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => setSelectedScenario(null)} className="w-full">
                  Choose Different Scenario
                </Button>
                <Button variant="outline" onClick={() => navigate('/qr-muster')} className="w-full">
                  Practice QR Muster
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Active Simulation Screen
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => setSelectedScenario(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold">{scenario.name} Simulation</h1>
          </div>
          <Badge className={`${scenario.color} bg-transparent`}>
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Simulation Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Current Step */}
          <Card className={`${scenario.bgColor} border-2`}>
            <CardHeader>
              <div className="text-center">
                <div className="text-6xl mb-4">{currentStepData.icon}</div>
                <CardTitle className="text-2xl mb-2">{currentStepData.action}</CardTitle>
                <p className="text-lg text-muted-foreground">{currentStepData.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">
                    {timeRemaining}s
                  </span>
                </div>
                
                <div className="space-x-2">
                  {!isRunning && currentStep === 0 && (
                    <Button onClick={startSimulation} size="lg">
                      <Play className="w-4 h-4 mr-2" />
                      Start Simulation
                    </Button>
                  )}
                  
                  {isRunning && (
                    <Button onClick={pauseSimulation} variant="outline" size="lg">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  
                  {!isRunning && currentStep > 0 && (
                    <Button onClick={pauseSimulation} size="lg">
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  
                  <Button onClick={resetSimulation} variant="outline" size="lg">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Steps Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      index === currentStep ? scenario.bgColor : 
                      index < currentStep ? 'bg-success/10' : 
                      'bg-muted/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                      index < currentStep ? 'bg-success text-white' :
                      index === currentStep ? 'bg-primary text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.action}</span>
                    <span className="text-xs text-muted-foreground">({step.duration}s)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimulationMode;