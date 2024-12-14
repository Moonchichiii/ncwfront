import React from 'react';
import ScrollContainer from '@/components/scroll/ScrollContainer';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '@pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ScrollContainer />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;