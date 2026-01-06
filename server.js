const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Load mock data
const mockData = JSON.parse(fs.readFileSync('./data/mockData.json', 'utf8'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard/:role', (req, res) => {
    const role = req.params.role;
    const validRoles = ['student', 'teacher', 'admin'];
    
    if (validRoles.includes(role)) {
        res.sendFile(path.join(__dirname, 'public', `${role}-dashboard.html`));
    } else {
        res.status(404).send('Dashboard not found');
    }
});

app.get('/campus-map', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'campus-map.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

app.get('/simulation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'simulation.html'));
});

app.get('/qr-muster', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'qr-muster.html'));
});

app.get('/rankings', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'rankings.html'));
});

app.get('/report-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'report-form.html'));
});

app.get('/after-action-report', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'after-action-report.html'));
});

// API Routes
app.get('/api/quiz', (req, res) => {
    res.json(mockData.quiz);
});

app.get('/api/rankings', (req, res) => {
    res.json(mockData.rankings);
});

app.get('/api/reports', (req, res) => {
    res.json(mockData.reports);
});

app.get('/api/students', (req, res) => {
    res.json(mockData.students);
});

app.get('/api/drills', (req, res) => {
    res.json(mockData.drills);
});

app.get('/api/campus-locations', (req, res) => {
    res.json(mockData.campusLocations);
});

app.post('/api/report-issue', (req, res) => {
    const newReport = {
        id: mockData.reports.length + 1,
        ...req.body,
        timestamp: new Date().toISOString(),
        status: 'Pending'
    };
    mockData.reports.push(newReport);
    res.json({ success: true, report: newReport });
});

app.post('/api/send-alert', (req, res) => {
    res.json({ success: true, message: 'Alert sent to all staff members' });
});

app.listen(PORT, () => {
    console.log(`ResQTech server running on http://localhost:${PORT}`);
});