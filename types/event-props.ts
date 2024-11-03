interface EventDataProps {
  slug: string;
  name: string;
  highlight_photo: string;
  detail: string;
  start_date_humanity: {
    date: string;
  };
  venue: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  community: { slug: string };
}

interface EventsProps {
  data: EventDataProps[];
  total: number;
  per_page: number;
}
