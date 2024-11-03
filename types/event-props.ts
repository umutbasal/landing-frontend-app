interface EventDataProps {
  slug: string;
  name: string;
  start_date_humanity: {
    date: string;
  };
  venue: {
    name: string;
    address: string;
  };
  community: { slug: string };
}

interface EventsProps {
  data: EventDataProps[];
  total: number;
  per_page: number;
}
