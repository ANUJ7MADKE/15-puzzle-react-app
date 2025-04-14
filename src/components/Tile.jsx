import React from "react";

export default function Tile({ value, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 60,
        height: 60,
        backgroundColor: value === 0 ? "#ccc" : "#fff",
        color: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #999",
        fontSize: 20,
        cursor: value === 0 ? "default" : "pointer",
      }}
    >
      {value !== 0 ? value : ""}
    </div>
  );
}
