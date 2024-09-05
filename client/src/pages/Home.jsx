
import AOS from 'aos';
import 'aos/dist/aos.css';
import MyTimer from "../components/atoms/clock";
import Navbar from "../components/organism/Navbar";
import ContactForm from "../components/organism/ContactSection";
import AboutUs from "../components/organism/AboutUs";
import ButtonComponent from "../components/atoms/ButtonComponent";
import eventsData from "../constants/eventsData";
import EventCard from "../components/molecule/EventCard";
import { useSelector } from 'react-redux';
// ..
AOS.init();
export default function Home() {
  const authData = useSelector((state) => state.authData);
  const accessToken = authData?.accessToken;

  return (
    <div>
      <Navbar />
      <section id="home" className='relative bg-home-img bg-base-color bg-no-repeat bg-cover bg-bottom w-full h-[100vh] '>
        <div className=' absolute w-full h-full bg-slate-900 bg-opacity-70'></div>
        <div className='first-section text-white flex flex-col justify-center items-center max-w-[1300px] mx-auto h-full pt-20'>
          <h1 data-aos="fade-right" data-aos-duration="2000" className='text-3xl xmobile:text-5xl 2xmobile:text-7xl md:text-8xl font-black z-10' >SWEET SPOT</h1>
          <h1 data-aos="fade-left" data-aos-duration="2000" className='text-lg xmobile:text-xl 2xmobile:text-3xl md:text-5xl font-black z-10 mt-7'>Next Event</h1>
          <MyTimer />
          {!accessToken ? (
            <div data-aos="fade-up" data-aos-duration="2000" className="flex flex-col 2xmobile:flex-row gap-10 z-10 mt-20">
              <ButtonComponent text={'Log In'} path={"/logIn"} />
              <ButtonComponent text={'Sign Up'} path={"/signUp"} />
            </div>
          ) : (
            <div data-aos="fade-up" data-aos-duration="2000" className="flex flex-col 2xmobile:flex-row gap-10 z-10 mt-20">
              <ButtonComponent text={'My Tickets'} path={"/myTickets"} />
            </div>
          )}
        </div>

      </section>
      <AboutUs />

      <section id="events" className="relative bg-ticket-bg bg-no-repeat bg-cover bg-center w-full">
        <div className='absolute w-full h-full bg-blue-600 bg-opacity-40'></div>
        <div className="max-w-[1300px] mx-auto flex flex-col justify-center items-center">
          <div className="z-10 mt-10 px-4 2xmobile:px-10">
            <div className="border-t-2 border-base-color border-opacity-60 w-44 my-10"></div>
            <h1 className="text-xl xmobile:text-2xl 2xmobile:text-4xl 2md:text-5xl text-gray-800 font-black z-10 text-center">Browse Through Our <span className="text-base-color">Events</span> Here.</h1>
          </div>
          <div className="mt-20 grid z-10 px-4 2xmobile:px-10 mb-20 gap-5">
            {eventsData.map(event => (
              <EventCard
                key={event.id}
                image={event.image}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                status={event.status}
                homeTickets={'Home'}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="second-section flex max-w-[1300px] mx-auto my-14 gap-6 p-4 overflow-hidden">
        <ContactForm />
      </div>
    </div>
  )
}
