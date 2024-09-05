import EventCard from "../components/molecule/EventCard";
import eventsData from "../constants/eventsData";

export default function MyTickets() {
  return (
    <section id="events" className="relative bg-ticket-bg bg-no-repeat bg-cover bg-center w-full">
      <div className='absolute w-full h-full bg-blue-600 bg-opacity-40'></div>
      <div className="max-w-[1300px] mx-auto flex flex-col justify-center items-center">
        <div className="z-10 mt-10 px-4 2xmobile:px-10">
          <div className="border-t-2 border-base-color border-opacity-60 w-44 my-10"></div>
          <h1 className="text-xl xmobile:text-2xl 2xmobile:text-4xl 2md:text-5xl text-gray-800 font-black z-10 text-center">My Tic<span className="text-base-color">ke</span>ts</h1>
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
              homeTickets={'User'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
