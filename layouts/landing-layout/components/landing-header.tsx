"use client";
import * as React from "react";
import Link from "next/link";
import ThemeSwitcher from "@hhs/components/custom/theme-switcher";
import { Button } from "@hhs/components/shadcn/button";
import Image from "next/image";
import { SITE } from "@hhs/constants/metadata";
import { NAV_ITEMS } from "@hhs/constants/layout";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@hhs/components/shadcn/drawer";
import { useTheme } from "next-themes";
import { a } from "framer-motion/client";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const serverLogoSrc = SITE.colorScheme === "dark" ? "/assets/hhs-white.png" : "/assets/hhs-black.avif";
  const [logoSrc, setLogoSrc] = React.useState(serverLogoSrc);
  const color = resolvedTheme || SITE.colorScheme;

  React.useEffect(() => {
    setLogoSrc(color === 'dark' ? '/assets/hhs-white.avif' : '/assets/hhs-black.avif');
  }, [resolvedTheme, color])

  return (
    <Image
      src={logoSrc}
      width={40}
      height={40}
      alt={SITE.title}
    />
  );
};

interface Event {
  name: string;
  start_date_humanity: { date: string };
  venue: { name: string };
  calendar_links: { google: string };
}

const EventComponent = () => {
  const [event, setEvent] = React.useState<Event | null>(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const upcomingEvents = fetch('https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events?page=1');
        const pastEvents = fetch('https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events?status=past&page=1');

        const [upcomingResponse, pastResponse] = await Promise.all([upcomingEvents, pastEvents]);
        const upcomingData = await upcomingResponse.json();
        const pastData = await pastResponse.json();

        let allEvents = upcomingData.data.length > 0 ? upcomingData.data : pastData.data;

        allEvents = allEvents.sort((a : Event, b : Event) => {
          return new Date(a.start_date_humanity.date).getTime() - new Date(b.start_date_humanity.date).getTime();
        });
        
        setEvent(allEvents[0]);
      } catch (error) {
        setError('Failed to fetch event');
      } finally {
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="text-center">Loading event...</div>;
  }

  return (
    <div className="bg-yellow-300 text-black text-center py-2 font-semibold">
      <p>{event.name} - {event.start_date_humanity.date} @ {event.venue.name}
        <a
          href={event.calendar_links.google}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline ml-2"
        >
          +
        </a>
      </p>
    </div>
  );
};

const LandingHeader = () => {
  const pathname = usePathname();

  return (
    <>
    <EventComponent/>
    <header className="flex items-center md:items-end justify-between gap-4 flex-wrap ">
      <div className="flex-wrap flex gap-4 md:block md:px-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 md:px-2 order-2 md:order:1"
        >
          <Logo />
          <span className="font-bold w-44">{SITE.title}</span>
        </Link>
        {/* Desktop */}
        <nav className="hidden md:flex items-center flex-wrap grow h-10">
          {NAV_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
            <Button
              variant="ghost"
              asChild
              key={item.label}
              className="capitalize relative text-base px-2"
            >
              <Link href={item.href}>
                {item.label}

                {pathname === item.href && (
                  <motion.div
                    layoutId="landing-header-nav"
                    initial={{ y: "calc(100%)" }}
                    className="absolute inset-0 top-[calc(100%)] z-20 h-[1px] w-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </Button>
            {index < NAV_ITEMS.length - 1 && (
              <span className="mx-2 text-gray-500">|</span>
            )}
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <MenuIcon size={20} className="text-gray-500" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="min-h-80 border-t rounded-none	">
            <div className="grid gap-4 p-6 pt-8">
              {NAV_ITEMS.map((item) => (
                <DrawerClose asChild key={item.label}>
                  <Link
                    className="flex w-full items-center py-1 text-lg font-semibold"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </DrawerClose>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <ThemeSwitcher />
    </header>
    </>
  );
};

export default LandingHeader;
