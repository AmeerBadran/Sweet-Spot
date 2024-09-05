import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className="flex 2md:ml-10 gap-5">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-all duration-500">
        <FaFacebook className="text-2xl" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600 transition-all duration-500">
        <FaInstagram className="text-2xl" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700 transition-all duration-500">
        <FaLinkedin className="text-2xl" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-all duration-500">
        <FaYoutube className="text-2xl" />
      </a>
    </div>
  );
};

export default SocialLinks;