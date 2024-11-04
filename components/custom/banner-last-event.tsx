"use client";
import * as React from "react";
import { getAllEvents } from "@hhs/lib/kommunity";
import { cn } from "@hhs/utils/cn";
import Link from "next/link";
import { Loader } from "@hhs/components/custom/loader";

interface WrapperProps extends React.PropsWithChildren {
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => (
  <div
    className={cn(
      "flex items-center justify-center h-10 font-semibold px-2",
      className
    )}
  >
    {children}
  </div>
);

const BannerLastEvent = () => {
  const [event, setEvent] = React.useState<EventDataProps | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingData, pastData] = await Promise.all([
          getAllEvents("upcoming"),
          getAllEvents("past"),
        ]);

        const allEvents = (
          upcomingData.data.length > 0 ? upcomingData.data : pastData.data
        ).sort(
          (a: EventDataProps, b: EventDataProps) =>
            new Date(a.start_date_humanity.date).getTime() -
            new Date(b.start_date_humanity.date).getTime()
        );

        setEvent(allEvents[0]);
      } catch (error) {
        console.info(error);
        setError("Failed to fetch last event.");
        setTimeout(() => setError(""), 3000);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return (
      <Wrapper className="bg-red-300 border border-red-500 text-black">
        <p>{error}</p>
      </Wrapper>
    );
  }

  if (!event) {
    return (
      <Wrapper className="animate-pulse bg-slate-100 border border-input/30 bg-primary/30">
        <span>Loading last event </span>
        <Loader className="ml-1" />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="border border-input bg-primary text-primary-foreground">
      <Link
        className="after:content-['_↗'] truncate space-x-2"
        rel="noopener noreferrer"
        href={
          `https://kommunity.com/${event.community.slug}/events/${event.slug}` ||
          ""
        }
        target="_blank"
      >
        <span className="underline underline-offset-4">Last event:</span>
        <span>
          {event.name} - {event.start_date_humanity.date} @ {event.venue.name}
        </span>
      </Link>
    </Wrapper>
  );
};

export default BannerLastEvent;
