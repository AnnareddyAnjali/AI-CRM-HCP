import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import HCP from "./pages/HCP";
import Interaction from "./pages/Interaction";
import AIAssistant from "./pages/AIAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/hcp"
      element={
        <ProtectedRoute>
          <HCP />
        </ProtectedRoute>
      }
    />

    <Route
      path="/interaction"
      element={
        <ProtectedRoute>
          <Interaction />
        </ProtectedRoute>
      }
    />

    <Route
      path="/ai"
      element={
        <ProtectedRoute>
          <AIAssistant />
        </ProtectedRoute>
      }
    />
  </Routes>
</BrowserRouter>
  );
}

export default App;