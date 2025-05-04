import QrScanner from "../components/organism/QrScanner";
import SpeedDialComponent from "../components/organism/SpeedDialComponent";

export default function ScannerPage() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <SpeedDialComponent />
          <QrScanner />
    </div>
  )
}
