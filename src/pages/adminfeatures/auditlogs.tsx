import { useState } from 'react';
import { Search, Calendar, Download, Filter } from 'lucide-react';
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

export default function AuditLogs() {
  // Sample audit log data
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, username: 'john.doe', action: 'Updated event details', timestamp: '2025-05-21T09:42:11' },
    { id: 2, username: 'admin', action: 'Deleted user account', timestamp: '2025-05-21T08:30:45' },
    { id: 3, username: 'sarah.smith', action: 'Changed password', timestamp: '2025-05-20T16:22:33' },
    { id: 4, username: 'tech.lead', action: 'Added new user', timestamp: '2025-05-20T14:15:09' },
    { id: 5, username: 'system', action: 'Scheduled maintenance', timestamp: '2025-05-19T22:00:00' },
    { id: 6, username: 'marketing', action: 'Updated landing page', timestamp: '2025-05-19T15:45:12' },
    { id: 7, username: 'john.doe', action: 'Created new event', timestamp: '2025-05-19T11:32:44' },
    { id: 8, username: 'admin', action: 'System backup', timestamp: '2025-05-18T23:00:00' },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="md:px-10 bg-navy-blue-5 py-12 h-screen"
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
          <h1 className="text-3xl font-semibold tracking-tight gradient-text font-bonanova text-white">Audit Logs</h1>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 bg-[#1e2a3a] border border-gray-600/30 rounded-lg text-white hover:bg-[#263548] transition-colors duration-200">
              <Calendar size={16} />
              <span>Filter by date</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-[#1e2a3a] border border-gray-600/30 rounded-lg text-white hover:bg-[#263548] transition-colors duration-200">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search audit logs..." 
              className="w-full px-4 py-2 pl-10 bg-[#1e2a3a] border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select className="bg-[#1e2a3a] border border-gray-600/30 rounded-lg text-white p-2 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50">
              <option>All actions</option>
              <option>Updates</option>
              <option>Creations</option>
              <option>Deletions</option>
              <option>System events</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-[#1e2a3a]">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#1e2a3a] transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white">{log.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{log.action}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(log.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-400">Showing 8 of 128 entries</p>
          
          <div className="flex">
            <button className="px-3 py-1 border border-gray-600/30 rounded-l-lg bg-[#1e2a3a] text-white hover:bg-[#263548] transition-colors duration-200">Previous</button>
            <button className="px-3 py-1 bg-sky-500 text-white hover:bg-sky-600 transition-colors duration-200">1</button>
            <button className="px-3 py-1 border border-gray-600/30 bg-[#1e2a3a] text-white hover:bg-[#263548] transition-colors duration-200">2</button>
            <button className="px-3 py-1 border border-gray-600/30 bg-[#1e2a3a] text-white hover:bg-[#263548] transition-colors duration-200">3</button>
            <button className="px-3 py-1 border border-gray-600/30 rounded-r-lg bg-[#1e2a3a] text-white hover:bg-[#263548] transition-colors duration-200">Next</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}