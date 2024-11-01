import * as React from "react";
import { promises as fs } from 'fs';
import path from 'path';
import Subtitle from "@hhs/components/custom/subtitle";

interface EventsPageProps {
  params: {
    slug: string[];
  };
}

const CACHE_FILE = path.join(process.cwd(), 'events_cache.json');
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

interface CacheData {
  timestamp: number;
  data: any;
}

export async function getCache(): Promise<any | null> {
  try {
    const cache: CacheData = JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8'));
    return (Date.now() - cache.timestamp < CACHE_EXPIRATION_TIME) ? cache.data : null;
  } catch {
    console.error('No valid cache found, fetching fresh data.');
    return null;
  }
}

export async function setCache(data: any) {
  await fs.writeFile(CACHE_FILE, JSON.stringify({timestamp: Date.now(), data: data}), 'utf-8');
}

interface Event {
  name: string;
  start_date_humanity: { date: string };
  venue: { name: string };
  calendar_links: { google: string };
}

async function fetchEvents(): Promise<Event[]> {
  const cachedEvents = await getCache();
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    const upcomingResponse = await fetch('https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events?page=1');
    const pastResponse = await fetch('https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events?status=past&page=1');

    if (!upcomingResponse.ok || !pastResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const upcomingData = await upcomingResponse.json();
    const pastData = await pastResponse.json();

    let allEvents = [...upcomingData.data, ...pastData.data];

    allEvents = allEvents.sort((a: Event, b: Event) => {
      return new Date(a.start_date_humanity.date).getTime() - new Date(b.start_date_humanity.date).getTime();
    });

    await setCache(allEvents);

    return allEvents;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export default async function EventsPage(props: EventsPageProps) {
  const events = await fetchEvents();

  return (
    <>
    <Subtitle>Get Involved</Subtitle>
    <ul>
      {events.map((event) => (
        <li className="flex items-center before:content-['*'] before:text-2xl before:mr-2 mb-1" key={event.name}>
          {event.name} - {event.start_date_humanity.date} @ {event.venue.name}
        </li>
      ))}
    </ul>
    </>
  );
}
