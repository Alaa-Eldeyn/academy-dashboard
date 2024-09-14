import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex border-b-2   py-3 -z-10 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative">
      <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
        <Link to={"/"} className='cursor-pointer'>
          <h1 className='font-bold text-xl'>MedLearn Hub</h1>
        </Link>
        <div className="flex items-center max-sm:ml-auto space-x-6">
        <FaBell className='text-3xl' />
          <ul>
            <li>
              <FaUserCircle onClick={handleToggle} className='text-3xl cursor-pointer' />
              {
                isMenuOpen && (
                  <div className="bg-gray-100 z-20 shadow-md py-3 px-2 sm:min-w-[150px] max-sm:min-w-[100px] absolute right-5 top-16">
                  <ul className="space-y-1.5">
                    {['Gift Cards', 'Contact Us'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-sm text-gray-500 hover:text-black">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                )
              }
            </li>
          </ul>
        
        </div>
      </div>
    </header>
  );
}

export default Header;
