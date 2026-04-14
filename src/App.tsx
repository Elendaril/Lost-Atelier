import './App.css';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { ItemJsonBuilderPage } from './pages/ItemJsonBuilderPage';
import { ItemPreviewPage } from './pages/ItemPreviewPage';

function App() {
  return (
    <main className="app-shell">
      <div className="app-frame">
        <header className="topbar panel">
          <div className="topbar-copy">
            <span className="eyebrow">Lost Atelier</span>
            <div>
              <h1 className="topbar-title">Ingredient workshop</h1>
              <p className="topbar-subtitle">Switch between card previewing and JSON generation without leaving the tool.</p>
            </div>
          </div>

          <nav className="route-nav" aria-label="App sections">
            <NavLink className={({ isActive }) => `route-link${isActive ? ' is-active' : ''}`} to="/preview">
              Card Preview
            </NavLink>
            <NavLink className={({ isActive }) => `route-link${isActive ? ' is-active' : ''}`} to="/generator">
              JSON Generator
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/preview" replace />} />
          <Route path="/preview" element={<ItemPreviewPage />} />
          <Route path="/generator" element={<ItemJsonBuilderPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
