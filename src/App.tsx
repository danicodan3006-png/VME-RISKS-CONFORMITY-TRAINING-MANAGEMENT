

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// New Strategic Pages
import ExecutiveSummary from './pages/ExecutiveSummary';
import TrainingVocStats from './pages/TrainingVocStats';
import RedListLeaderboard from './pages/RedListLeaderboard';
import StrategicRoadmap from './pages/StrategicRoadmap';
import MasterForm from './pages/MasterForm';
import AccidentManagement from './pages/AccidentManagement';
import FleetCompliance from './pages/FleetCompliance';

import { SafeEquipProvider } from './context/SafeEquipContext';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';

function App() {
  return (
    <SafeEquipProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Dashboard Layout wrapper */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard/executive-summary" replace />} />
            <Route path="executive-summary" element={<ExecutiveSummary />} />
            <Route path="accident-management" element={<AccidentManagement />} />
            <Route path="red-list-leaderboard" element={<RedListLeaderboard />} />
            <Route path="training-stats" element={<TrainingVocStats />} />
            <Route path="strategic-roadmap" element={<StrategicRoadmap />} />
            <Route path="fleet-compliance" element={<FleetCompliance />} />
            <Route path="master-form" element={<MasterForm />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard/executive-summary" replace />} />
        </Routes>
      </BrowserRouter>
      <PWAUpdatePrompt />
    </SafeEquipProvider>
  );
}

export default App;
