import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ProviderPostAuth from "./pages/Provider-PA";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Video from "./pages/Video";
import Profile from "./pages/Profile";
import Broadcast from "./pages/Broadcast";
import Broadcaster from "./server/Broadcaster";
import Viewer from "./server/Viewer";

import { AuthProvider } from "./contexts/Auth";

function App() {
  return (
    <AuthProvider>
      <div className="body">
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/auth/post/provider" element={<ProviderPostAuth />} />
            <Route path="/videos/specific" element={<Video />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/broadcast" element={<Broadcast />} />
            <Route path="/broadcaster" element={<Broadcaster />} />
            <Route path="/viewer" element={<Viewer />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
