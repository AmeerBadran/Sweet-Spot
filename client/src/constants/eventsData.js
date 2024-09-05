import event1 from "../assets/images/event1.jpg"
import event2 from "../assets/images/event2.jpg"
import event3 from "../assets/images/event3.webp"
const eventsData = [
  {
    id: 1,
    image: event1, // قم بتغيير المسار إلى صورة مناسبة
    title: 'Padel Championship 2024',
    description: 'Join the most anticipated Padel Championship of the year with top players competing.',
    date: '10/9/2024 At 5:00 PM',
    location: 'Padel Arena, City Name',
    status: 'open',
  },
  {
    id: 2,
    image: event2,
    title: 'Padel Doubles Tournament',
    description: 'Exciting doubles tournament with teams from around the country.',
    date: '15/9/2024 At 3:00 PM',
    location: 'Padel Courts, Another City',
    status: 'open',
  },
  {
    id: 3,
    image: event3,
    title: 'Youth Padel Cup',
    description: 'A special event for young players to showcase their skills in Padel.',
    date: '20/9/2024 At 10:00 AM',
    location: 'Youth Sports Center, Some City',
    status: 'closed',
  },
];

export default eventsData;
