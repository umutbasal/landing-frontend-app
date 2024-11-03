"use client";
import * as React from "react";
import LandingLayoutView from "@hhs/layouts/landing-layout";
import { getEvent } from "@hhs/lib/kommunity";
import Image from "next/image";
import { useParams } from "next/navigation";
import Subtitle from "@hhs/components/custom/subtitle";
import { Spinner } from "@hhs/components/shadcn/spinner";

interface EventDataProps {
    name: string;
    highlight_photo: string;
    detail: string;
    venue?: {
        lat: number;
        lng: number;
    };
}

const EventDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = React.useState<EventDataProps | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true); // Initialize loading to true

    React.useEffect(() => {
        if (id) {
            getEvent(id)
                .then((response) => {
                    if (response.status === 404) {
                        throw new Error("Event not found");
                    }
                    return response.data;
                })
                .then((eventData) => {
                    setEvent(eventData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <LandingLayoutView>
                <Spinner />
            </LandingLayoutView>
        );
    }

    return (
        <LandingLayoutView>
            {
                event ? (
                    <>
                        <Subtitle>Event: {event?.name}</Subtitle>
                        <Image
                            src={event?.highlight_photo || ''}
                            alt={event?.name || 'Event Image'}
                            width={800}
                            height={400}
                        />
                        <div className="flex space-x-4 mb-8 mt-4">
                            {event?.venue && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: `${event.detail} Coordinates: <a href="https://www.google.com/maps/place/${event.venue.lat},${event.venue.lng}" target="_blank" rel="noopener noreferrer">${event.venue.lat}, ${event.venue.lng}</a>`,
                                    }}
                                />
                            )}
                        </div>
                    </>
                ) :
                    <div>Event not found or something went wrong</div>
            }
        </LandingLayoutView>
    );
};

export default EventDetailPage;
