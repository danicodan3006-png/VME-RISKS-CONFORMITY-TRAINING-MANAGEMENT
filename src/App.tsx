

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
import MasterForm from './pages/MasterForm';
import AccidentManagement from './pages/AccidentManagement';

import { SafeEquipProvider } from './context/SafeEquipContext';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';

function App() {
  return (
    <SafeEquipProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Dashboard Layout wrapper */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard/strategic-roadmap" replace />} />
            <Route path="strategic-roadmap" element={<StrategicRoadmap />} />
            <Route path="executive-summary" element={<ExecutiveSummary />} />
            <Route path="training-stats" element={<TrainingVocStats />} />
            <Route path="safety-awareness" element={<SafetyAwareness />} />
            <Route path="fleet-compliance" element={<FleetCompliance />} />
            <Route path="documentation-status" element={<DocumentationStatus />} />
            <Route path="red-list-leaderboard" element={<RedListLeaderboard />} />
            <Route path="master-form" element={<MasterForm />} />
            <Route path="accident-management" element={<AccidentManagement />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard/strategic-roadmap" replace />} />
        </Routes>
      </BrowserRouter>
      <PWAUpdatePrompt />
    </SafeEquipProvider>
  );
}

export default App;
