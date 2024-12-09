"use client";

import * as React from "react";
import { Button } from "../shadcn/button";

const KickIframe: React.FC = () => {
  const [isIframeVisible, setIframeVisibility] = React.useState(false);
  const [isIframeAvailable, setIframeAvailability] = React.useState(false);

  React.useEffect(() => {
    const checkIframeAvailability = async () => {
      try {
        const response = await fetch("https://kick.com/api/v2/channels/happyhackingspac3/livestream");
        const data = await response.json();
        if (data.data !== null) {
          setIframeAvailability(true);
        }
      } catch (error) {
        return error;
      }
    };

    checkIframeAvailability();
  }, []);

  const toggleIframeVisibility = React.useCallback(() => {
    setIframeVisibility((prev) => !prev);
  }, []);

  return (
    <div className="h-full w-full">
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
          className={`controls-container right-0 absolute ${isIframeVisible ? "bottom-[500px]" : "bottom-[150px]"}`}
        >
          {isIframeVisible ? "Minimize" : "📺 Live Streaming Now"}
        </Button>
      )}
    </div>
  );
};

export default KickIframe;