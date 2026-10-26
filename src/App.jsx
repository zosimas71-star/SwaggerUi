import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";

// Optional: set VITE_API_BASE_URL in .env to point "Try it out" at your backend,
// e.g. VITE_API_BASE_URL=https://api.example.gov.et/api/v1
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [spec, setSpec] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/openapi.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (API_BASE_URL) json.servers = [{ url: API_BASE_URL }];
        setSpec(json);
      })
      .catch((e) => setError(e.message));
  }, []);

  const server = spec?.servers?.[0]?.url;

  return (
    <>
      <header className="topbar">
        <h1>Official Letter Management API</h1>
        <p>
          Server: <code>{server ?? "loading…"}</code> · Log in with AUTH-02, then click
          Authorize and paste the access_token.
        </p>
      </header>
      <main className="docs">
        <div className="docs-card">
          {error && <div className="status">Could not load openapi.json ({error}).</div>}
          {!spec && !error && <div className="status">Loading API…</div>}
          {spec && (
            <SwaggerUI
              spec={spec}
              docExpansion="none"
              filter
              persistAuthorization
              tryItOutEnabled
              defaultModelsExpandDepth={-1}
            />
          )}
        </div>
      </main>
    </>
  );
}
