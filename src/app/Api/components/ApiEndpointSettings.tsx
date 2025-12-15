import { useEffect, useMemo, useState } from "react";
import "./ApiEndpointSettings.css";
import { readApiConfig, saveApiConfig, getApiBaseUrl } from "../helpers/apiConfig";
import type { ApiConfig } from "../helpers/apiConfig";

function isValidIpv4(value: string): boolean {
  const parts = value.trim().split(".");
  if (parts.length !== 4) return false;

  for (const p of parts) {
    if (!/^\d+$/.test(p)) return false;
    const n = Number(p);
    if (n < 0 || n > 255) return false;
  }
  return true;
}

function isValidPort(value: string): boolean {
  if (value.trim() === "") return true; // optional
  if (!/^\d+$/.test(value.trim())) return false;
  const n = Number(value.trim());
  return n >= 1 && n <= 65535;
}

export function ApiEndpointSettings() {
  const [config, setConfig] = useState<ApiConfig>(() => readApiConfig());

  useEffect(() => {
    saveApiConfig(config);
  }, [config]);

  const ipOk = config.mode === "local" ? true : isValidIpv4(config.externalIp);
  const portOk = config.mode === "local" ? true : isValidPort(config.externalPort);

  const baseUrl = useMemo(() => getApiBaseUrl(config), [config]);

  return (
    <section className="api-card">
      <div className="api-card__header">
        <div>
          <h2 className="api-card__title">API endpoint</h2>
          <p className="api-card__subtitle">
            Choose where requests will be sent (default: local 127.0.0.1).
          </p>
        </div>

        <div className="api-badge">
          Base URL: <span className="api-badge__value">{baseUrl}</span>
        </div>
      </div>

      <div className="api-row">
        <label className="api-label">Mode</label>
        <div className="api-toggle" role="group" aria-label="API mode">
          <button
            type="button"
            className={`api-btn ${config.mode === "local" ? "is-active" : ""}`}
            onClick={() =>
              setConfig((c) => ({
                ...c,
                mode: "local",
              }))
            }
          >
            Local (127.0.0.1)
          </button>

          <button
            type="button"
            className={`api-btn ${config.mode === "external" ? "is-active" : ""}`}
            onClick={() =>
              setConfig((c) => ({
                ...c,
                mode: "external",
              }))
            }
          >
            External
          </button>
        </div>
      </div>

      {config.mode === "external" && (
        <div className="api-grid">
          <div className="api-field">
            <label className="api-label" htmlFor="externalIp">
              External IP
            </label>
            <input
              id="externalIp"
              className={`api-input ${ipOk ? "" : "is-invalid"}`}
              placeholder="e.g. 192.168.1.50"
              value={config.externalIp}
              onChange={(e) =>
                setConfig((c) => ({
                  ...c,
                  externalIp: e.target.value,
                }))
              }
            />
            {!ipOk && <div className="api-error">Invalid IPv4 address.</div>}
          </div>

          <div className="api-field">
            <label className="api-label" htmlFor="externalPort">
              Port (optional)
            </label>
            <input
              id="externalPort"
              className={`api-input ${portOk ? "" : "is-invalid"}`}
              placeholder="e.g. 8000"
              value={config.externalPort}
              onChange={(e) =>
                setConfig((c) => ({
                  ...c,
                  externalPort: e.target.value,
                }))
              }
            />
            {!portOk && <div className="api-error">Port must be 1–65535.</div>}
          </div>
        </div>
      )}

      {config.mode === "external" && (!ipOk || !portOk) && (
        <div className="api-warning">
          Fix the fields above. While invalid, the app will fall back to 127.0.0.1.
        </div>
      )}
    </section>
  );
}
