'use client'

import LandingLayoutView from '@hhs/layouts/landing-layout';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';


const EventDetailPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    const getEvent = (id) => {
        fetch(`https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events/${id}`)
            .then((response) => response.json())
            .then((event) => {
                setEvent(event);
            });

    }

    useEffect(() => {
        getEvent(id);
    }, [])

    if (!event) return <div>Loading...</div>;

    return (
        <LandingLayoutView>
            <main className="grow p-4">
                <h1 className="text-xl -ml-4 mb-10 -mt-6 group-focus-visible:decoration-primary-500 group-focus-visible:decoration-2 border-l border-dashed border-primary p-1 pl-4 font-bold">
                    Event: {event.data.name}
                </h1>
                <Image src={event.data.highlight_photo} alt={event.data.name} width={800} height={400} />
                <div className="flex space-x-4 mb-8 mt-4">
                    <div
                        dangerouslySetInnerHTML={{ __html: `${event.data.detail} Coordinates: <a href="https://www.google.com/maps/place/${event.data.venue.lat}, ${event.data.venue.lng}" target="_blank" alt="${event.data.name}">${event.data.venue.lat}, ${event.data.venue.lng}</a>` }}
                    />

                    {
                        // https://www.google.com/maps/place/49.46800006494457,17.11514008755796
                    }
                   
                </div>
            </main>
        </LandingLayoutView>
    );
};



export default EventDetailPage;
