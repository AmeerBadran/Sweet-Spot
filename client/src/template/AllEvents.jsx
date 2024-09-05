import { useEffect, useState } from "react";
import PaginationRounded from "../components/molecule/PaginationRounded";
import EventCard from "../components/molecule/EventCard";
import { deleteEvent, getAllEvents, getCountEvents } from "../api/endpoints/events";
import { toast } from "react-toastify";

export default function AllEvents() {
  const [eventsData, setEventsData] = useState([]);
  const [eventsCount, setEventsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const pageCount = Math.ceil(eventsCount / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes] = await Promise.all([
          getCountEvents(),
        ]);
        setEventsCount(eventsRes?.data?.count || 0);
        await allEventsData(currentPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, eventsCount]);

  const allEventsData = async (page) => {
    try {
      const response = await getAllEvents(page);
      setEventsData(response?.data || []);
    } catch (error) {
      console.error("Error fetching events data:", error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await deleteEvent(eventId);
      setEventsData((prevEventsData) => prevEventsData.filter(event => event._id !== eventId));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="lg:col-span-3 w-full mx-auto lg:ml-6 bg-white rounded-lg">
      <div className='p-6 border rounded-t-lg'>
        <h1 className='text-2xl font-semibold text-blue-900 '>All Events</h1>
      </div>
      <div className='p-6 space-y-6'>
        {eventsData.map(event => (
          <EventCard
            key={event._id}
            id={event._id}
            image={event.coverImage} // Update this to reflect the correct image path
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            price={event.price}
            capacity={event.capacity}
            availableTickets={event.availableTickets}
            homeTickets={'Admin'}
            handleDelete={() => handleDelete(event._id)}
          />
        ))}
        <div className="mx-auto mt-20">
          <PaginationRounded count={pageCount} page={currentPage} onChange={handlePagination} />
        </div>
      </div>
    </div>
  )
}
