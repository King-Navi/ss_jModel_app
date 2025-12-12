import "./Home.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="home-root">
      <header className="home-header">
        <h1>Jetson Model Dashboard</h1>
        <p>Control panel to configure and run the model.</p>
      </header>

      <main className="home-grid">
        <Link to="/settings" className="home-card">
          <h2>Configuration</h2>
          <p>
            Set model path, camera device, thresholds and other parameters.
          </p>
        </Link>

        <Link to="/run-model" className="home-card">
          <h2>Run model</h2>
          <p>
            Start inference, monitor logs and see the model running in real time.
          </p>
        </Link>
      </main>
    </div>
  );
}
