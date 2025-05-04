import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTicketAlt, FaHome } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { logOut } from "../../api/endpoints/auth";
import { deleteAuthData } from "../../features/authData/authDataSlice";

const SidebarNavigation = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authData);
  const accessToken = authData?.accessToken;
  const userRole = authData?.userData?.role;

  const handleLogOut = async () => {
    await logOut();
    dispatch(deleteAuthData());
  };

  const navItems = [
    {
      label: "Home",
      icon: <FaHome className="text-xl" />,
      to: "/",
      show: true,
    },
    {
      label: "Log In",
      icon: <IoLogIn className="text-xl" />,
      to: "/logIn",
      show: !accessToken,
    },
    {
      label: "Sign Up",
      icon: <IoMdPersonAdd className="text-xl" />,
      to: "/signUp",
      show: !accessToken,
    },
    {
      label: "My Tickets",
      icon: <FaTicketAlt className="text-xl" />,
      to: "/myTickets",
      show: accessToken && userRole !== "scanner",
    },
    {
      label: "QR Scanner",
      icon: <BsQrCodeScan className="text-xl" />,
      to: "/qrScanner",
      show: accessToken && (userRole === "admin" || userRole === "scanner"),
    },
    {
      label: "Admin",
      icon: <RiAdminFill className="text-xl" />,
      to: "/admin",
      show: accessToken && userRole === "admin",
    },
  ];

  return (
    <div className="fixed top-1/3 right-0 z-[300] w-14 hover:w-56 transition-all duration-300 group">
      <div className="flex flex-col bg-white shadow-xl border-l border-gray-200 rounded-l-lg overflow-hidden w-full">
        {navItems
          .filter((item) => item.show)
          .map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="flex items-center gap-3 px-3 py-3 border-b border-gray-100 hover:bg-gray-100 transition-all relative"
            >
              <div className="text-gray-700">{item.icon}</div>
              <span className="text-gray-800 text-sm font-medium absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          ))}

        {accessToken && (
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 border-t border-gray-200 relative"
          >
            <IoLogOut className="text-xl" />
            <span className="text-sm font-medium absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Log Out
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarNavigation;
