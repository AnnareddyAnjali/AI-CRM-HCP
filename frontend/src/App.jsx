import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import HCP from "./pages/HCP";
import Interaction from "./pages/Interaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hcp" element={<HCP />} />
        <Route path="/interaction" element={<Interaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

