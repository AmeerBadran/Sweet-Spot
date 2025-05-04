
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState, useEffect, useRef } from "react";
import { scanTicket } from "../../api/endpoints/tickets";
import { getAllEventsForScanner } from "../../api/endpoints/events";
import { toast } from "react-toastify";

const QrScanner = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const selectedEventRef = useRef("");

  useEffect(() => {
    selectedEventRef.current = selectedEvent;
  }, [selectedEvent]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventsForScanner();
        setEvents(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error fetching events");
      }
    };
    fetchEvents();
  }, []);

  const handleScan = async (result) => {
    if (result) {
      setCameraEnabled(false);
      try {
        const rawValue = result[0].rawValue;

        const eventIdMatch = rawValue.match(/Event ID:\s*([^\s]+)/);
        const eventId = eventIdMatch ? eventIdMatch[1] : null;

        const textMatch = rawValue.match(/Text:\s*([^\n]+)/);
        const text = textMatch ? textMatch[1] : null;

        const currentSelectedEvent = selectedEventRef.current;

        if (currentSelectedEvent) {
          if (eventId === currentSelectedEvent) {
            try {
              const response = await scanTicket(text);
              setScanResult(response.data.message);
            } catch (ticketError) {
              setScanResult(
                "Error scanning the ticket: " + ticketError.message
              );
            }
          } else {
            setScanResult("This ticket is not available for this event.");
          }
        } else {
          setScanResult("Please select an event first.");
        }
      } catch (error) {
        setScanResult("Error processing scan data: " + error.message);
      } finally {
        setTimeout(() => {
          setCameraEnabled(true);
        }, 1000);
      }
    }
  };

  const handleError = () => {
    setCameraEnabled(false);
  };

  const handleSelectChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-10 text-white relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-teal-400 tracking-tight">
          🎫 QR Ticket Scanner
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-white/80">
            Select Event
          </label>
          <select
            value={selectedEvent}
            onChange={handleSelectChange}
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="" className="text-black">
              -- Choose an Event --
            </option>
            {events.map((event) => (
              <option key={event._id} value={event._id} className="text-black">
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center mb-4">
          <p
            className={`text-xl sm:text-2xl font-bold ${
              scanResult === "Ticket used successfully"
                ? "text-green-400"
                : scanResult === "Ticket already used" ||
                  scanResult === "Ticket not found"
                ? "text-red-500"
                : "text-yellow-400"
            }`}
          >
            {scanResult ? `"${scanResult}"` : "Please scan a QR code"}
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border-2 border-dashed border-white/20">
          {cameraEnabled ? (
            <Scanner onScan={handleScan} onError={handleError} />
          ) : (
            <div className="flex items-center justify-center h-64 text-white/60 text-lg">
              Activating camera...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrScanner;
