"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const isLight = localStorage.getItem("devops-theme") === "light";
    setLight(isLight);
    document.documentElement.dataset.theme = isLight ? "light" : "";
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "";
    localStorage.setItem("devops-theme", next ? "light" : "dark");
  };

  return (
    <button className="icon-btn" onClick={toggle} title="Toggle theme" aria-label="Toggle theme">
      {light ? "☀️" : "🌙"}
    </button>
  );
}
