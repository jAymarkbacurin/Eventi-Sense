import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock, MapPin, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Define animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
      staggerChildren: 0.1
    }
  }
};

export default function ArchivedEvents() {
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Sample archived events data remains the same
  const archivedEvents = [
    {
      id: 1,
      title: "Annual Company Retreat 2024",
      date: "March 15-17, 2024",
      location: "Mountain View Resort",
      organizer: "HR Department",
      description: "Three-day team building and strategy session in the mountains.",
      attendees: 87,
      status: "Archived"
    },
    {
      id: 2,
      title: "Product Launch: Version 4.0",
      date: "January 28, 2024",
      location: "Virtual Event",
      organizer: "Marketing Team",
      description: "Official launch of our new product version with demo sessions.",
      attendees: 243,
      status: "Read-Only"
    },
    {
      id: 3,
      title: "Summer Internship Onboarding",
      date: "June 1, 2024",
      location: "Main Campus",
      organizer: "Talent Acquisition",
      description: "Welcome session for the new batch of summer interns.",
      attendees: 52,
      status: "Archived"
    }
  ];

  // Existing toggle and status color functions
  const toggleSection = (id: any) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Archived':
        return 'bg-gray-600';
      case 'Read-Only':
        return 'bg-amber-600';
      default:
        return 'bg-sky-600';
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="md:mx-10"
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="bg-[#152131] p-8 border border-gray-300 rounded-2xl font-sofia shadow-sm"
        style={{
          background: `linear-gradient(#152131, #152131) padding-box,
          linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c) border-box`,
          border: '1px solid transparent',
          borderRadius: '0.75rem'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold tracking-tight gradient-text font-bonanova text-white">Archived Events</h1>
          <select className="bg-[#1e2a3a] border border-gray-600/30 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50">
            <option>Sort by date (newest first)</option>
            <option>Sort by date (oldest first)</option>
            <option>Sort by title</option>
            <option>Sort by status</option>
          </select>
        </div>
        
        <div className="space-y-4">
          {archivedEvents.map(event => (
            <motion.div 
              key={event.id} 
              className="border border-gray-600/30 rounded-lg overflow-hidden bg-[#1e2a3a]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#263548] transition-colors duration-200"
                onClick={() => toggleSection(event.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded text-white ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <h3 className="text-lg font-medium text-white">{event.title}</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-4">{event.date}</span>
                  {expandedSection === event.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedSection === event.id && (
                <div className="p-4 border-t border-gray-600/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <Calendar size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Date</p>
                        <p className="text-white">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <MapPin size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Location</p>
                        <p className="text-white">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <User size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Organizer</p>
                        <p className="text-white">{event.organizer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Clock size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Attendees</p>
                        <p className="text-white">{event.attendees} people</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-400 mb-1">Description</p>
                    <p className="text-white">{event.description}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-600/30 text-white rounded-lg hover:bg-[#263548] transition-colors duration-200">
                      Download Report
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="flex items-center px-4 py-2 text-sky-400 hover:text-sky-300 transition-colors duration-200">
            <span>Load more archived events</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}