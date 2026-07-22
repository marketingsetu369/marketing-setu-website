import React from "react";

export default function Logo() {
  return (
    <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20C3 20 8 8 15 8C22 8 27 20 27 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ color: "var(--blue)" }} />
      <circle cx="3" cy="20" r="3" fill="var(--blue)" />
      <circle cx="27" cy="20" r="3" fill="var(--green)" />
    </svg>
  );
}
