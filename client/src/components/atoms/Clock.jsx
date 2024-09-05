import { useTimer } from 'react-timer-hook';

// eslint-disable-next-line react/prop-types
function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div data-aos="zoom-in"  data-aos-duration="2000" style={{ textAlign: 'center' }}>
      <div className=' xmobile:flex gap-5 2xmobile:gap-10 text-[50px] 2xmobile:text-[80px] md:text-[100px] 2md:gap-20 text-center'>
        <div className='flex gap-5 2xmobile:gap-10 2md:gap-20 justify-center'>
          <span>{days}<p className='text-lg md:text-2xl font-black'>Days</p></span>
          <span>{hours}<p className='text-lg md:text-2xl font-black'>Hours</p></span>
        </div>
        <div className='flex gap-5 2xmobile:gap-10 2md:gap-20 justify-center'>
          <span>{minutes}<p className='text-lg md:text-2xl font-black'>Minutes</p></span>
          <span>{seconds}<p className='text-lg md:text-2xl font-black'>Seconds</p></span>
        </div>
      </div>

    </div>
  );
}

// eslint-disable-next-line react/prop-types
export default function App({ eventDate = '2024-09-15T17:00:00' }) {
  const targetDate = new Date(eventDate);

  return (
    <div className='z-10'>
      <MyTimer expiryTimestamp={targetDate} />
    </div>
  );
}
