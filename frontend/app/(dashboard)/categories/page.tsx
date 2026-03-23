"use client";

import { LayoutGrid } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    "Allgemein",
    "Heilkunde",
    "Natur",
    "Kräuter",
    "Kopfschmerzen",
    "Gesellschaft",
    "Beruf",
    "Berufswahl",
    "Informatik"
  ];

  return (
    <div style={{ padding: "40px 24px" }}>
      <div className="section-hd">
        <div className="section-title">
          <LayoutGrid className="w-6 h-6 mr-2" />
          Kategorien
        </div>
      </div>

      <div className="vgrid" style={{ marginTop: "32px" }}>
        {categories.map((cat) => (
          <div
            key={cat}
            className="stat-tile clickable"
            style={{
              height: "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="stat-val" style={{ fontSize: "1.5rem" }}>
              {cat}
            </div>
            <div className="stat-lbl">Entdecken</div>
          </div>
        ))}
      </div>
    </div>
  );
}
