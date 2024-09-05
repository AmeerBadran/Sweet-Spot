import loginImg from "../assets/images/login-img.jpg"
import logo from "../assets/images/projectMainLogo.png"
import facebook from "../assets/images/facebook.png"
import google from "../assets/images/google.png"
import { Link } from "react-router-dom";
import SignUpForm from "../components/organism/SignUpForm";
import SpeedDialComponent from "../components/organism/SpeedDialComponent";

export default function SignUp() {
  return (
    <div className="grid grid-cols-1 2md:grid-cols-2 min-h-screen">
      <SpeedDialComponent />
      {/* Left Section */}
      <div className=" flex flex-col justify-center items-center text-center px-8">
        <img src={loginImg} alt="Login" className="w-10/12 xl:w-8/12" />
        <h1 className="text-3xl font-semibold mt-8">Welcome to Sweet Spot Events.</h1>
        <p className="text-center mt-4 text-gray-600 w-10/12">
          Welcome! Sign up to create your account and start your journey with our exclusive padel events. Unlock new experiences and skills today!
        </p>
        <div className="flex my-8 w-32 h-2 bg-base-color rounded-full">
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center bg-white p-8 relative md:px-24 lg:px-24 2md:px-12 transition-all duration-300">
        {/* Logo and Back to Home */}
        <div className="w-full flex justify-between items-center mb-8">
          <Link to="/"><img src={logo} alt="Logo" className="h-12" /></Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-base-color">Back to Home</Link>
        </div>

        <div className="w-full mb-48">
          <h2 className="text-2xl mb-5 font-semibold text-start">Create Your Account here</h2>
          <SignUpForm />
        </div>
        {/* Social Login Buttons */}
        <div className="mt-6 text-center bg-blue-50 absolute bottom-0 w-full py-10">
          <p className="text-sm text-gray-600">Or sign in with</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-2 mt-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-50 hover:shadow-lg">
              <img src={google} alt="Google" className="h-5 w-5" />
              <span>Sign In using Google</span>
            </button>
            <span className="text-gray-400">|</span>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-50 hover:shadow-lg">
              <img src={facebook} alt="Facebook" className="h-5 w-5" />
              <span>Sign In using Facebook</span>
            </button>
          </div>
          <p className="mt-6 text-sm">
            New User? <a href="#" className="text-base-color hover:underline">Create an Account</a>
          </p>
        </div>
      </div>
    </div >
  );
}