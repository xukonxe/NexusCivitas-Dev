import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PromptDebugger from './pages/PromptDebugger';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/debug" element={<PromptDebugger />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
