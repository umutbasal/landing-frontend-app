"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../shadcn/button";

const Iframe: React.FC = () => {
  const [isIframeVisible, setIframeVisibility] = useState(false);
  const [isIframeAvailable, setIframeAvailability] = useState(false);

  useEffect(() => {
    const checkIframeAvailability = async () => {
      try {
        const response = await fetch("https://kick.com/api/v2/channels/happyhackingspac3/livestream");
        if (response.status !== 404) {
          setIframeAvailability(true);
        }
        const data = await response.json();
        if (data.data !== null) {
          setIframeAvailability(true);
        }
      } catch (error) {
        console.error("Error checking iframe availability:", error);
      }
    };

    checkIframeAvailability();
  }, []);

  const toggleIframeVisibility = () => {
    setIframeVisibility((prev) => !prev);
  };

  return (
    <div className="relative h-full w-full">
      {isIframeAvailable && isIframeVisible && (
        <iframe
          src="https://player.kick.com/happyhackingspac3"
          className="absolute bottom-0 right-0 w-full md:w-[853px] h-[480px]"
          allowFullScreen
          title="Kick Player"
        />
      )}
      {isIframeAvailable && (
        <Button
          onClick={toggleIframeVisibility}
          className={`absolute right-0 border-none px-4 py-2 cursor-pointer ${isIframeVisible ? "bottom-[500px]" : "bottom-[150px]"}`}
        >
          {isIframeVisible ? "Minimize" : "📺 Live Streaming Now"}
        </Button>
      )}
    </div>
  );
};

export default Iframe;
