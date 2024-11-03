"use client";
import React, { useEffect, useState } from 'react';
import LandingLayoutView from '@hhs/layouts/landing-layout';
import { getEvents } from '@hhs/lib/kommunity';
import Link from 'next/link';

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [events, setEvents] = useState({
        upcoming: [],
        past: [],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getEvents(activeTab, currentPage).then((data) => {
            if (data) {
                setEvents((prev) => ({
                    ...prev,
                    [activeTab]: data.data || [], // Set data to events state
                }));
                setTotalPages(data.total ? Math.ceil(data.total / data.per_page) : 1); // Set total pages
            }
        });
    }, [activeTab, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <LandingLayoutView>
            <main className="grow p-4">
                <h1 className="text-xl -ml-4 mb-10 -mt-6 group-focus-visible:decoration-primary-500 group-focus-visible:decoration-2 border-l border-dashed border-primary p-1 pl-4 font-bold">
                    List of our events
                </h1>
                <div className="flex space-x-4 mb-8">
                    <button
                        onClick={() => {
                            setActiveTab('upcoming');
                            setCurrentPage(1); // Reset to first page
                        }}
                        className={`px-4 py-2 font-semibold border-b-2 ${
                            activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-gray-600'
                        } hover:border-primary hover:text-primary`}
                    >
                        Upcoming Events
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('past');
                            setCurrentPage(1); // Reset to first page
                        }}
                        className={`px-4 py-2 font-semibold border-b-2 ${
                            activeTab === 'past' ? 'border-primary text-primary' : 'border-transparent text-gray-600'
                        } hover:border-primary hover:text-primary`}
                    >
                        Past Events
                    </button>
                </div>
                <div>
                    {events[activeTab].map((event, index) => (
                        <Link key={index} href={`/events/${event.slug}`} legacyBehavior>
                            <a>
                                <div className="flex items-center space-x-4 mb-4 hover:bg-gray-100 p-4 rounded-lg transition-all hover:text-primary">
                                    <div>
                                        <h2 className="font-semibold">{event.name}</h2>
                                        <p>{event.start_date_humanity.date}</p>
                                        <p>{event.venue.address}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>

                {totalPages > 1 ? (
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {isNaN(totalPages) ? "N/A" : totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                        >
                            Next
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-center text-gray-500">
                        No additional pages
                    </div>
                )}
            </main>
        </LandingLayoutView>
    );
};

export default EventsPage;
