import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import RiskManagement from './pages/RiskManagement';
import VmeStrategy from './pages/VmeStrategy';
import ExecutiveSummary from './pages/ExecutiveSummary';
import PeopleTraining from './pages/PeopleTraining';
import Machinery from './pages/Machinery';
import UpdatesDocuments from './pages/UpdatesDocuments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExecutiveSummary />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="risk" element={<RiskManagement />} />
          <Route path="strategy" element={<VmeStrategy />} />
          <Route path="people" element={<PeopleTraining />} />
          <Route path="machinery" element={<Machinery />} />
          <Route path="updates" element={<UpdatesDocuments />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
