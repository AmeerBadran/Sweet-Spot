/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import qrimage from "../../assets/images/unnamed.png";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
}

function EventCard({
  image,
  id,
  title,
  description,
  price,
  date,
  location,
  availableTickets,
  capacity,
  homeTickets,
  handleDelete,
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    handleDelete();
    setShowConfirm(false);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.01] duration-300 bg-white border ${
        homeTickets === "Home" && "xl:min-w-[1100px]"
      } 2md:flex gap-6 p-4`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 2md:w-80 2md:h-64 object-cover rounded-xl"
      />

      <div className="flex flex-col justify-between w-full">
        <div className="text-gray-800 space-y-2 text-center 2xmobile:text-left">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-4">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-my-color" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-my-color" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiDollarSign className="text-my-color" />
              <span>KWD {price}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col 2xmobile:flex-row items-center justify-between mt-6 gap-3 text-sm">
          <div>
            {availableTickets > 0 ? (
              <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full">
                <FiCheckCircle /> Open
              </span>
            ) : (
              <span className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1 rounded-full">
                <FiXCircle /> Close
              </span>
            )}
          </div>

          <p className="text-gray-700">
            Available Tickets:{" "}
            <span className="font-semibold">{availableTickets}</span> /{" "}
            <span className="font-semibold">{capacity}</span>
          </p>

          {homeTickets === "Home" && (
            <Link
              to="eventDetails"
              state={{
                event: {
                  id,
                  title,
                  price,
                  date,
                  description,
                  location,
                  capacity,
                  availableTickets,
                  coverImage: image,
                },
              }}
              className="px-4 py-2 font-semibold text-white bg-base-color hover:bg-opacity-90 transition rounded-full"
            >
              Buy Ticket
            </Link>
          )}
        </div>
      </div>

      {homeTickets === "User" && (
        <img
          src={qrimage}
          alt="QR Code"
          className="hidden md:block w-28 h-28 absolute bottom-4 right-4 object-contain"
        />
      )}

      {homeTickets === "Admin" && (
        <div className="absolute top-6 left-6 flex gap-3 bg-white bg-opacity-90 px-3 py-2 rounded-md shadow">
          <Link
            to="editEvent"
            state={{
              eventData: {
                id,
                title,
                price,
                date,
                description,
                location,
                capacity,
                availableTickets,
                coverImage: image,
              },
            }}
            className="text-xl text-blue-600 hover:text-blue-400"
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-xl text-red-500 hover:text-red-400"
          >
            <FaTrashAlt />
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm text-center">
            <p className="mb-4">Are you sure you want to delete this event?</p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCard;
