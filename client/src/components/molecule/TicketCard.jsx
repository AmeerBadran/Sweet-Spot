/* eslint-disable react/prop-types */
import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import {
  FiCalendar,
  FiMapPin,
  FiTag,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

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

function TicketCard({
  image,
  title,
  date,
  status,
  location,
  maxUses,
  usedCount,
}) {
  return (
    <div className="bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 max-w-sm mx-auto">
      <img src={image} alt={title} className="w-full h-72 object-cover" />
      <div className="p-5 text-gray-800 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-lg font-bold text-primary-600">
          <FiTag className="text-my-color" />
          <span className="truncate">Event: {title}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiCalendar className="text-sec-color-100" />
          <span>Date: {formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiMapPin className="text-sec-color-100" />
          <span>Location: {location}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaUserCheck className="text-sec-color-100" />
            <span>
              For: {maxUses} {maxUses === 1 ? "user" : "users"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaUserMinus className="text-sec-color-100" />
            <span>used: {usedCount} time</span>
          </div>
        </div>
        <div className="flex justify-center">
          {status === "unused" ? (
            <span className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
              <FiCheckCircle />
              Unused
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm bg-red-100 text-red-600 px-4 py-1 rounded-full font-semibold">
              <FiXCircle />
              Used
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
