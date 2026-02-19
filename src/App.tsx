
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// New Strategic Pages
import ExecutiveSummary from './pages/ExecutiveSummary';
import TrainingVocStats from './pages/TrainingVocStats';
import SafetyAwareness from './pages/SafetyAwareness';
import FleetCompliance from './pages/FleetCompliance';
import DocumentationStatus from './pages/DocumentationStatus';
import RedListLeaderboard from './pages/RedListLeaderboard';
import StrategicRoadmap from './pages/StrategicRoadmap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/executive-summary" replace />} />

          {/* 7 Strategic Pillars */}
          <Route path="executive-summary" element={<ExecutiveSummary />} />
          <Route path="training-stats" element={<TrainingVocStats />} />
          <Route path="safety-awareness" element={<SafetyAwareness />} />
          <Route path="fleet-compliance" element={<FleetCompliance />} />
          <Route path="documentation-status" element={<DocumentationStatus />} />
          <Route path="red-list-leaderboard" element={<RedListLeaderboard />} />
          <Route path="roadmap" element={<StrategicRoadmap />} />

          <Route path="*" element={<Navigate to="/executive-summary" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
