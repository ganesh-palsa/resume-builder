import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserTypeSelect from './pages/UserTypeSelect/UserTypeSelect';
import Builder from './pages/Builder/Builder';
import Templates from './pages/Templates/Templates';
import Preview from './pages/Home/Preview/Preview';
import Analyze from './pages/Analyze/Analyze';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-type" element={<UserTypeSelect />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
