import { NavLink } from 'react-router-dom';

import ProfileAvatar from '../../components/Profile/profileAvatar';
import Notification from '../../components/NewNotification/usernotification';
import ChatIconWithUnread from '../../components/chatIcon/chat';
import logo from '../../assets/images/logoES.png';
interface NavbarProps {
    user: any;
    profile: any;
    searchQuery: string;
    mobileMenuOpen: boolean;
    isDropdownOpen?: boolean;
    setSearchQuery: (value: string) => void;
    setDropdownOpen?: (value: boolean) => void;
    handleSearch: (e: React.FormEvent) => void;
    toggleMobileMenu: () => void;
    navigate: (path: string) => void;
  }
  
  export const UserNavbar = ({
    user,
    profile,
    isDropdownOpen,
    setDropdownOpen,
    navigate
  }: NavbarProps) => (
    <div>
      <nav className="shadow-2xl w-full z-20 h-auto bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 text-white">
        <div className="w-full border-b border-gray-700">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo on left */}
            <div className="flex-shrink-0">
             <NavLink to="/" >
            <div className="h-14 w-14 mb-2">
          <img src={logo} alt="Background" className="h-full w-full object-contain" />
         </div>
         </NavLink>
       
            </div>
  
            {/* Main navigation */}
            <div className="flex-1 flex justify-center gap-12">
              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center justify-center space-x-8 font-sofia tracking-widest text-sm text-gray-100">
                <NavLink to="/" className={({ isActive }) => `uppercase ${isActive ? 'gradient-text' : 'hover:text-white'}`}>
                  Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => `uppercase ${isActive ? 'gradient-text' : 'hover:text-white'}`}>
                  About
                </NavLink>
                <div className="relative">
                  <button
                    type="button"
                    id="menu-button"
                    className="uppercase flex items-center hover:text-white"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen?.(!isDropdownOpen)}
                  >
                    <span>Directories</span>
                    <svg
                      className={`ml-1 mb-1 w-3 h-3 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-yellow-300' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div
                      id="services-dropdown"
                      className="absolute bg-[#08233E] shadow-lg rounded-md mt-2 text-[1rem] w-40 font-montserrat tracking-widest"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div 
                        className={`w-auto text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                          isDropdownOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <NavLink 
                          to="/Event-List"
                          className="block px-4 py-2 text-white hover:bg-gray-200/10 hover:text-yellow-500"
                          onClick={() => {
                            setDropdownOpen?.(false);
                            navigate('/Event-List');
                          }}
                        >
                          Events
                        </NavLink>
                   
                        <NavLink 
                          to="/venue-list"
                          className="block px-4 py-2 text-white hover:bg-gray-200/10 hover:text-yellow-500"
                          onClick={() => {
                            setDropdownOpen?.(false);
                            navigate('/venue-list');
                          }}
                        >
                          Venues
                        </NavLink>
                        <NavLink 
                          to="/supplier-list"
                          className="block px-4 py-2 text-white hover:bg-gray-200/10 hover:text-yellow-500"
                          onClick={() => {
                            setDropdownOpen?.(false);
                            navigate('/supplier-list');
                          }}
                        >
                          Suppliers
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
          
                <NavLink to="/Create-Event" className={({ isActive }) => `uppercase ${isActive ? 'gradient-text' : 'hover:text-white'}`}>
                 Create Event
                </NavLink>
              </div>
                 {/* Profile/Auth buttons */}
                <div className="hidden md:flex items-center gap-1">
            <ChatIconWithUnread />
            <Notification userId={user?.id}/>
              {user ? (
                <ProfileAvatar user={user} profile={profile} />
              ) : (
                <div className="flex space-x-3">
                  
                </div>
              )}
               </div>
            </div>
        <div className='md:hidden flex mr-16'>
        <ChatIconWithUnread />
        <Notification userId={user?.id}/>

        </div>
         
            
            {/* Mobile menu button here if needed */}
            <div className="md:hidden flex items-center">
              {/* Add your mobile menu toggle button here */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );


  export const DefaultNavbar = ({
    user,
    profile,
    isDropdownOpen,
    setDropdownOpen,
    navigate
  }: NavbarProps) => (
    <div>
      <nav className="shadow-2xl w-full z-20 h-auto bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 text-white">
        <div className="w-full border-b border-gray-700">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
             {/* Logo on left */}
             <div className="flex-shrink-0">
             <NavLink to="/" >
            <div className="h-14 w-14 mb-2">
          <img src={logo} alt="Background" className="h-full w-full object-contain" />
         </div>
         </NavLink>
       
            </div>
  
            {/* Main navigation */}
            <div className="flex-1 flex justify-center">
              {/* Desktop navigation */}
              <div className="hidden md:flex items-center justify-center space-x-8 font-sofia tracking-widest text-sm text-gray-100">
                {profile?.role && (
                  <NavLink 
                    to={`/${profile.role.replace('_', '-')}-Dashboard/Home`} 
                    className="uppercase font-semibold tracking-widest text-sm hover:gradient-text"
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink to="/" className={({ isActive }) => `uppercase ${isActive ? 'gradient-text' : 'hover:text-white'}`}>
                  Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => `uppercase ${isActive ? 'gradient-text' : 'hover:text-white'}`}>
                  About
                </NavLink>
                <div className="relative">
                  <button
                    type="button"
                    id="menu-button"
                    className="uppercase flex items-center hover:text-white"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen?.(!isDropdownOpen)}
                  >
                    <span>Directories</span>
                    <svg
                      className={`ml-1 mb-1 w-3 h-3 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-yellow-300' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div
                      id="services-dropdown"
                      className="absolute bg-[#08233E] shadow-lg rounded-md mt-2 text-[1rem] w-40 font-montserrat tracking-widest"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div 
                        className={`w-auto text-sm overflow-hidden transition-all duration-500 ease-in-out ${
                          isDropdownOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <NavLink 
                          to="/Event-List"
                          className="block px-4 py-2 text-white hover:bg-gray-200/10 hover:text-yellow-500"
                          onClick={() => {
                            setDropdownOpen?.(false);
                            navigate('/Event-List');
                          }}
                        >
                          Events
                        </NavLink>
                     
                        <NavLink 
                          to="/venue-list"
                          className="block px-4 py-2 text-white hover:bg-gray-200/10 hover:text-yellow-500"
                          onClick={() => {
                            setDropdownOpen?.(false);
                            navigate('/venue-list');
                          }}
                        >
                          Venues
                        </NavLink>
                        <NavLink 
                          to="/supplier-list"
                          className="block px-4 py-2 text-white hover:bg-gray-200/10 hover:text-yellow-500"
                          onClick={() => {
                            setDropdownOpen?.(false);
                            navigate('/supplier-list');
                          }}
                        >
                          Suppliers
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
                <NavLink to="/contact" className={({ isActive }) => `uppercase ${isActive ? 'gradient-text' : 'hover:text-white'}`}>
                  Contact
                </NavLink>
              </div>
            </div>
            
            {/* Profile/Auth buttons */}
            <div className="hidden md:flex items-center">
              {user ? (
                <ProfileAvatar user={user} profile={profile} />
              ) : (
                <div className="flex space-x-3">
               
                </div>
              )}
            </div>
            
            {/* Mobile menu button here if needed */}
            <div className="md:hidden flex items-center">
              {/* Add your mobile menu toggle button here */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );