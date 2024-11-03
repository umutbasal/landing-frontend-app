"use client";
import * as React from "react";
import LandingLayoutView from "@hhs/layouts/landing-layout";
import { getEvent } from "@hhs/lib/kommunity";
import Image from "next/image";
import { useParams } from "next/navigation";
import Subtitle from "@hhs/components/custom/subtitle";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = React.useState<EventDataProps | null>(null);

  React.useEffect(() => {
    if (id) {
      getEvent(id)
        .then((event) => event && setEvent(event.data))
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [id]);

  if (!event) return null;

  return (
    <LandingLayoutView>
      <Subtitle>Event: {event.name}</Subtitle>
      <Image
        src={event.highlight_photo}
        alt={event.name}
        width={800}
        height={400}
      />
      <div className="flex space-x-4 mb-8 mt-4">
        {event.venue && (
          <div
            dangerouslySetInnerHTML={{
              __html: `${event.detail} Coordinates: <a href="https://www.google.com/maps/place/${event.venue.lat},${event.venue.lng}" target="_blank" alt="${event.name}">${event.venue.lat}, ${event.venue.lng}</a>`,
            }}
          />
        )}
      </div>
    </LandingLayoutView>
  );
};

export default EventDetailPage;
