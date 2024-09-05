import { PiStarFourFill } from 'react-icons/pi';
import ContactCard from '../molecule/ContactCard';
import { contactInfoData } from '../../constants/contactInfoCardsData';

export default function ContactInfo() {
  return (
    <div className="flex flex-col xl:flex-row gap-9 p-6">
      <div className="flex-1 mb-7">
        <div className="flex flex-col gap-6 w-full mb-7">
          <div data-aos="fade-down" data-aos-duration="1500" className="flex gap-3 items-center text-[#1e84b5]">
            <PiStarFourFill />
            <p>CONTACT INFO</p>
          </div>
          <h1 data-aos="zoom-out" data-aos-duration="1500" className="text-5xl font-black text-[#476877]"><span className="text-[#1e84b5]">Connecting</span> Near & Far</h1>
          <p data-aos="fade-up" data-aos-duration="1500" className="text-[#446a7c]">
            For emergency dental care or to schedule an appointment, contact our office at visit our clinic.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactInfoData.map((item) => (
            <ContactCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              details={item.details}
            />
          ))}
        </div>
      </div>
      <div className="flex-1">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8837416793465!2d-74.00601548459189!3d40.712775279330275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19a7c1b1eb%3A0x6e1c65b1edb0d2f8!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687886862432!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[650px] h-full rounded-3xl"
          data-aos="fade-up" data-aos-duration="1500"
        ></iframe>
      </div>
    </div>
  );
}