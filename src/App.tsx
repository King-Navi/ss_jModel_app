import { Home } from "./app/Home/Home";
import { SettingsPage } from "./app/Setting/SettingsPage";
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
