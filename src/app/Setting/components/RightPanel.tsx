import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./RightPanel.css";

export function RightPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isSettings = location.pathname === "/settings";

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Top-right hamburger button */}
      <button
        type="button"
        className="rp-hamburger"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="rp-hamburger__line" />
        <span className="rp-hamburger__line" />
        <span className="rp-hamburger__line" />
      </button>

      {/* Backdrop */}
      <div
        className={`rp-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Right drawer */}
      <aside className={`rp-drawer ${isOpen ? "is-open" : ""}`}>
        <div className="rp-drawer__header">
          <h3 className="rp-title">Menu</h3>
          <button
            type="button"
            className="rp-close"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="rp-section">
          <h4 className="rp-section__title">Configuration</h4>
          <p className="rp-section__text">
            Set model path, camera device, thresholds and other parameters.
          </p>

          <Link
            to="/settings"
            className={`rp-link ${isSettings ? "is-active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Go to settings
          </Link>
        </div>

        <div className="rp-section">
          <h4 className="rp-section__title">Run model</h4>
          <p className="rp-section__text">
            Start inference, monitor logs and see the model running in real time.
          </p>

          <Link to="/run-model" className="rp-link" onClick={() => setIsOpen(false)}>
            Go to run model
          </Link>
        </div>
      </aside>
    </>
  );
}
