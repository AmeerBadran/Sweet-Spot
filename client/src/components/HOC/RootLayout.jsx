import { Outlet } from "react-router-dom";
import Footer from "../organism/Footer"
import SpeedDialComponent from "../organism/SpeedDialComponent";
export default function RootLayout() {

  return (
    <div className="bg-[#FFF]">
      <SpeedDialComponent />
      <Outlet />
      <Footer />
    </div>
  );
}
