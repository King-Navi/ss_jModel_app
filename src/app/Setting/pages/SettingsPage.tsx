import { useEffect, useState } from "react";
import "./SettingsPage.css";
import { BackToHomeButton } from "../../Home/components/BackToHomeButton";

type Theme = "default" | "dark-theme" | "nvidia-theme";

const THEME_STORAGE_KEY = "app_theme";

function applyTheme(theme: Theme) {
  if (theme === "default") {
    document.documentElement.removeAttribute("data-theme");
    return;
  }
  document.documentElement.dataset.theme = theme;
}

function readSavedTheme(): Theme {
  const value = localStorage.getItem(THEME_STORAGE_KEY);
  if (value === "dark-theme" || value === "nvidia-theme" || value === "default") {
    return value;
  }
  return "default";
}

export function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(() => readSavedTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="settings-root">
      <header className="settings-header">
        <h1>Configuration</h1>
        <p>Choose the color theme for the dashboard.</p>
      </header>
      <BackToHomeButton />
      <h1>Configuration</h1>

      <section className="settings-card">
        <div className="settings-row">
          <div>
            <div className="settings-label">Theme</div>
            <div className="settings-muted">Current: {theme}</div>
          </div>

          <div className="settings-actions" role="group" aria-label="Theme selection">
            <button
              type="button"
              className={`settings-btn ${theme === "default" ? "is-active" : ""}`}
              onClick={() => setTheme("default")}
            >
              Default
            </button>

            <button
              type="button"
              className={`settings-btn ${theme === "dark-theme" ? "is-active" : ""}`}
              onClick={() => setTheme("dark-theme")}
            >
              Dark
            </button>

            <button
              type="button"
              className={`settings-btn ${theme === "nvidia-theme" ? "is-active" : ""}`}
              onClick={() => setTheme("nvidia-theme")}
            >
              NVIDIA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
