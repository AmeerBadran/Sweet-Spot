import { Scanner } from '@yudiel/react-qr-scanner';
import { useState, useEffect } from 'react';
import { scanTicket } from '../../api/endpoints/tickets';
import { getAllEventsForScanner } from '../../api/endpoints/events';
import { toast } from 'react-toastify';

const QrScanner = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [scanResult, setScanResult] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventsForScanner();
        setEvents(response.data);
      } catch (error) {
        toast.error('Error fetching events:', error);
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
  
        if (selectedEvent) { // Use the current selectedEvent value directly
          if (eventId === selectedEvent) {
            try {
              const response = await scanTicket(text);
              setScanResult(response.data.message);
            } catch (ticketError) {
              setScanResult("Error scanning the ticket: " + ticketError.message);
            }
          } else {
            setScanResult("This ticket is not available for this event.");
          }
        } else {
          setScanResult("Select the event you want to scan.");
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
    <div className="text-center max-w-[600px]">
      {/* إضافة عنصر select لاختيار الحدث */}
      <div className="mb-2">
        <select
          value={selectedEvent}
          onChange={handleSelectChange}
          className="border p-2 rounded"
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>
      <p className={`text-3xl font-black mb-4 ${scanResult === 'Ticket used successfully' ? ('text-green-500') : (scanResult === 'Ticket already used' || scanResult === 'Ticket not found') ? ('text-red-500') : ''}`}>
        {scanResult ? `"${scanResult}"` : 'Scan QR Code'}
      </p>
      {cameraEnabled ? (
        <Scanner onScan={handleScan} onError={handleError} />
      ) : (
        <p className='text-2xl'>Open Your Camera</p>
      )}
    </div>
  );
};

export default QrScanner;
