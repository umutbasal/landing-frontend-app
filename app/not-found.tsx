"use client";

import { useEffect, useState } from "react";
import LandingLayout from "./(landing)/layout";

export default function NotFound() {
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

	const [currentArt, setCurrentArt] = useState(asciiArt1);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentArt((prev) => (prev === asciiArt1 ? asciiArt2 : asciiArt1));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<LandingLayout>
			<div className="flex flex-col items-center justify-center">
				<pre className="text-primary text-xl" style={
					{
						fontFamily: "GT America Mono, monospace",
					}
				}>{currentArt}</pre>
			</div>
		</LandingLayout>
	);
}
