export type ApiMode = "local" | "external";

export type ApiConfig = {
  mode: ApiMode;
  externalIp: string;
  externalPort: string; // optional, keep as string for easy input
};

const STORAGE_KEY = "api_config";

const DEFAULT_CONFIG: ApiConfig = {
  mode: "local",
  externalIp: "",
  externalPort: "",
};

export function readApiConfig(): ApiConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;

    const parsed = JSON.parse(raw) as Partial<ApiConfig>;
    const mode: ApiMode = parsed.mode === "external" ? "external" : "local";

    return {
      mode,
      externalIp: typeof parsed.externalIp === "string" ? parsed.externalIp : "",
      externalPort: typeof parsed.externalPort === "string" ? parsed.externalPort : "",
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveApiConfig(config: ApiConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function getApiBaseUrl(config?: ApiConfig): string {
  const effective = config ?? readApiConfig();

  if (effective.mode === "local") {
    return "http://127.0.0.1";
  }

  const ip = effective.externalIp.trim();
  const port = effective.externalPort.trim();

  if (!ip) return "http://127.0.0.1"; // safety fallback
  return port ? `http://${ip}:${port}` : `http://${ip}`;
}
