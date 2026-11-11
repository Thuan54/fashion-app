import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import CreateIdeaPage from './pages/CreateIdeaPage';
import './styles/components.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProfilePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="create" element={<CreateIdeaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;