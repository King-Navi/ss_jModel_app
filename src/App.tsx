import { Home } from "./app/Home/pages/Home";
import { SettingsPage } from "./app/Setting/pages/SettingsPage";
import { RunModelPage } from "./app/RunModel/RunModelPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/run-model" element={<RunModelPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
