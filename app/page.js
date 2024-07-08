"use client";

import { useState } from "react";

export default function ShowCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCode = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/c  ode");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }
      const data = await response.json();
      setCode(data.code);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Show Code</h1>
      <button onClick={fetchCode} disabled={loading}>
        {loading ? "Loading..." : "Fetch Code"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {code && (
        <div>
          <h2>Code:</h2>
          <p>{code}</p>
        </div>
      )}
    </div>
  );
}
