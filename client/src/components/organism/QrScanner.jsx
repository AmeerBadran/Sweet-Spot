import { Scanner } from '@yudiel/react-qr-scanner';
import { useState, useEffect } from 'react';

const QrScanner = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [scanResult, setScanResult] = useState(null); // null when no result

  useEffect(() => {
    if (scanResult) {
      const timer = setTimeout(() => {
        setCameraEnabled(true);
        setScanResult(null);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [scanResult]);

  function handleResult(id) {
    if (id === true) {
      setScanResult('Success Scan');
    } else {
      setScanResult('Failed Scan');
    }
  }
  const handleScan = (result) => {
    if (result) {
      console.log(result);
      setCameraEnabled(false);
      handleResult(false);
    }
  };

  const handleError = () => {
    setCameraEnabled(false);
  };

  return (
    <div className="text-center max-w-[600px]">
      <p className={`text-3xl font-black mb-10 ${scanResult === 'Success Scan' ? ('text-green-500') : scanResult === 'Failed Scan' ? ('text-red-500') : ''}`}>
        {scanResult ? `"${scanResult}"` : 'Scan QR Code'}
      </p>
      {
        cameraEnabled ? (
          <Scanner onScan={handleScan} onError={handleError} />
        ) : (
          !scanResult && (
            <p className="text-red-500 text-xl">
              Camera is unavailable or turned off. Please check your camera settings.
            </p>
          )
        )
      }
    </div >
  );
};

export default QrScanner;
