"use client";
import * as React from "react";

const asciiArt1 = `
┌───────────────────┐
│               ─ x │
├───────────────────┤
│                   │
│ ~> 404            │
│ ERROR             │
│ NOT-FOUND-404     │
│                   │
│ ~> ⎕              │
└───────────────────┘
`;

const asciiArt2 = `
┌───────────────────┐
│               ─ x │
├───────────────────┤
│                   │
│ ~> 404            │
│ ERROR             │
│ NOT-FOUND-404     │
│                   │
│ ~> ▉              │
└───────────────────┘
`;

const NotFoundAsciiArt = () => {
  const [currentArt, setCurrentArt] = React.useState(asciiArt1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArt((prev) => (prev === asciiArt1 ? asciiArt2 : asciiArt1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <pre
      className="text-primary text-xl text-center"
      style={{ fontFamily: "GT America Mono, monospace" }}
    >
      {currentArt}
    </pre>
  );
};

export default NotFoundAsciiArt;
