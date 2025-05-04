import { useState } from "react";
import { useLocation } from "react-router-dom";
import SpeedDialComponent from "./SpeedDialComponent";
import Footer from "./Footer";
import { FaMinus, FaPlus } from "react-icons/fa";
import { createTicket } from "../../api/endpoints/tickets";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event || {};

  const userData = useSelector((state) => state.authData.userData);
  const [ticketCount, setTicketCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = ticketCount * event.price;

  const handleTicketChange = (e) => {
    setTicketCount(e.target.value);
  };

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const ticketData = {
        eventData: event,
        userEmail: userData.email,
        numberOfTickets: ticketCount,
      };
      const response = await createTicket(ticketData);
      toast.success(response.data.message);
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("An error occurred while creating the ticket.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center pt-8 pb-24 px-4 relative">
      <SpeedDialComponent />
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-6 md:p-10">
        {/* Event Image */}
        <div className="rounded-2xl overflow-hidden shadow-md mb-6">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-64 object-cover object-center"
          />
        </div>

        {/* Title & Price */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            {event.title}
          </h1>
          <p className="text-xl text-base-color font-semibold">
            KWD{" "}
            <span className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-700 shadow-inner">
              {event.price}
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
          {event.description}
        </p>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium text-lg text-center mb-2">
            Quantity
          </label>
          <div className="flex justify-center items-center space-x-3">
            <button
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
              className="w-12 h-12 rounded-lg bg-base-color hover:bg-blue-600 text-white flex justify-center items-center shadow"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              value={ticketCount}
              onChange={handleTicketChange}
              min="1"
              max={event.availableTickets}
              className="w-20 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold shadow"
            />
            <button
              onClick={() => setTicketCount(ticketCount + 1)}
              className="w-12 h-12 rounded-lg bg-base-color hover:bg-blue-600 text-white flex justify-center items-center shadow"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="text-center mb-8">
          <p className="text-xl font-bold text-gray-900">
            Total Price:{" "}
            <span className="text-base-color font-semibold">
              KWD{" "}
              <span className="inline-block px-2 py-1 border border-gray-300 rounded shadow-inner">
                {totalPrice}
              </span>
            </span>
          </p>
        </div>

        {/* PAY Button */}
        <div className="text-center">
          <button
            onClick={handlePay}
            disabled={isLoading}
            className={`w-full md:w-2/3 py-3 rounded-xl font-bold text-white text-lg transition-all duration-300 
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-base-color hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              "Get Ticket"
            )}
          </button>
        </div>

        {/* Availability */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            <strong>Available Tickets:</strong>{" "}
            <span className="inline-block px-3 py-1 font-semibold border border-gray-300 rounded shadow-inner ml-2">
              {event.availableTickets}
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default EventDetails;
