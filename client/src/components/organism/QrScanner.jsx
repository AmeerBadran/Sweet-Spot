
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { scanTicket } from '../../api/endpoints/tickets';

const QrScanner = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [scanResult, setScanResult] = useState(null);


  const handleScan = async (result) => {
    if (result) {
      setCameraEnabled(false);
      try {
        const response = await scanTicket(result[0].rawValue);
        setScanResult(response.data.message)
        setTimeout(() => {
          setCameraEnabled(true);
        }, 1000);
      } catch (error) {
        setScanResult(error)
      }
    }
  };

  const handleError = () => {
    setCameraEnabled(false);
  };

  return (
    <div className="text-center max-w-[600px]">
      <p className={`text-3xl font-black mb-10 ${scanResult === 'Ticket used successfully' ? ('text-green-500') : (scanResult === 'Ticket already used' || scanResult === 'Ticket not found') ? ('text-red-500') : ''}`}>
        {scanResult ? `"${scanResult}"` : 'Scan QR Code'}
      </p>
      {cameraEnabled ? (
        <Scanner onScan={handleScan} onError={handleError} />
      ) : (
        <p className='text-2xl'>Open Your Camera</p>
      )}
    </div >
  );
};

export default QrScanner;
