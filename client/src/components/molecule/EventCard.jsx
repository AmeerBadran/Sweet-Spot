/* eslint-disable react/prop-types */
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import qrimage from "../../assets/images/unnamed.png"
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleDateString('en-US', options);
}


function EventCard({ image, id, title, description, price, date, location, availableTickets, capacity, homeTickets, handleDelete }) {
  return (
    <div className={`2md:flex ${homeTickets === 'Home' && 'xl:min-w-[1100px]'} p-3 border bg-slate-200 rounded-xl gap-4 2md:max-h-72 relative`}>
      <img src={`http://localhost:5501/uploads/eventsImage/${image}`} alt={title} className="object-cover w-full rounded-t-lg 2md:h-64 min-h-64 2md:w-96 2md:min-w-64 2md:rounded-none 2md:rounded-s-lg" />
      <div className="text-black mt-4 w-full flex flex-col justify-between text-center 2xmobile:text-start overflow-y-auto">
        <div>
          <h5 className="mb-2 text-xl 2xmobile:text-2xl font-bold tracking-tight">Event: {title}</h5>
          <p className="mb-3 text-sm 2xmobile:text-base font-normal">{description}</p>
          <p className="mb-2 text-sm 2xmobile:text-base font-semibold tracking-tight">Date: {formatDate(date)}</p>
          <p className="mb-2 text-sm 2xmobile:text-base font-semibold tracking-tight">Location: {location}</p>
          <p className="mb-2 text-sm 2xmobile:text-base font-semibold tracking-tight">Price: <span className='text-gray-600'>KWD </span>{price}</p>
        </div>
        <div className="w-full flex flex-col 2xmobile:flex-row justify-between gap-2 items-center">
          {availableTickets > 0 ? (
            <span className={`py-1 px-3 border rounded-full text-sm bg-green-500 text-white`}>
              open
            </span>
          ) : (
            <span className={`py-1 px-3 border rounded-full text-sm bg-red-500 text-white`}>
              close
            </span>
          )}

          <p> Available Tickets <span className="font-semibold"> {availableTickets}</span> from <span className="font-semibold"> {capacity}</span></p>
          {homeTickets === 'Home' && (
            <Link
              to="eventDetails"
                state={{
                  event: {
                    id: id,
                    title: title,
                    price: price,
                    date: date,
                    description: description,
                    location: location,
                    capacity: capacity,
                    availableTickets: availableTickets,
                    coverImage: image
                  }
                }}
              className="px-4 py-2 font-semibold border border-slate-700 rounded-full hover:text-white hover:bg-base-color transition-all duration-300"
            >
              Buy Ticket
            </Link>
          )}

        </div>
      </div>
      {homeTickets === 'User' && (
        <img src={qrimage} alt={title} className="object-cover w-full rounded-t-lg 2md:h-64 min-h-64 2md:w-96 2md:min-w-64 md:rounded-none md:rounded-s-lg mt-10 2md:mt-0" />
      )}

      {homeTickets === 'Admin' && (
        <div className="absolute right-3 flex flex-col gap-4">
          <Link
            to="editEvent"
            state={{
              eventData: {
                id: id,
                title: title,
                price: price,
                date: date,
                description: description,
                location: location,
                capacity: capacity,
                availableTickets: availableTickets,
                coverImage: image
              }
            }}
            className="text-3xl hover:text-base-color transition-all duration-300"
          >
            <FaEdit />
          </Link>
          <button type="button" onClick={handleDelete} className="text-3xl hover:text-red-500 transition-all duration-300">
            <FaTrashAlt />
          </button>
        </div>
      )}
    </div>
  );
}

export default EventCard;
