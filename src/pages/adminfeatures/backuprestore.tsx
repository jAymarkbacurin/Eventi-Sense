import { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Database, HardDrive, RefreshCw, X, Check } from 'lucide-react';

export default function BackupRestore() {
  
  const [expandedSection, setExpandedSection] = useState(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'new' | 'restore' | 'download' | 'restore-point' | null;
    step: number;
    backupId: number | null;
    selectedBackup: typeof backupData[0] | null;
  }>({
    isOpen: false,
    type: null,
    step: 1,
    backupId: null,
    selectedBackup: null
  });
  // Sample backup data
  const backupData = [
    {
      id: 1,
      title: "Full System Backup",
      date: "March 21, 2025 09:30 AM",
      size: "2.3 GB",
      type: "Automated",
      description: "Complete system backup including all user data and configurations.",
      tables: 32,
      status: "Complete"
    },
    {
      id: 2,
      title: "User Data Backup",
      date: "March 20, 2025 11:45 PM",
      size: "1.1 GB",
      type: "Manual",
      description: "Backup of user-specific data and related configurations.",
      tables: 15,
      status: "In Progress"
    },
    {
      id: 3,
      title: "Event Database Backup",
      date: "March 20, 2025 06:00 AM",
      size: "850 MB",
      type: "Scheduled",
      description: "Backup of all event-related data and associated media files.",
      tables: 8,
      status: "Complete"
    }
  ];

  const toggleSection = (id: any) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Complete':
        return 'bg-emerald-600';
      case 'In Progress':
        return 'bg-amber-600';
      default:
        return 'bg-sky-600';
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      step: 1,
      backupId: null,
      selectedBackup: null
    });
  };

  const handleNewBackup = () => {
    setModalState({
      isOpen: true,
      type: 'new' as const,
      step: 1,
      backupId: null,
      selectedBackup: null
    });
  };

  const handleRestorePoint = () => {
    setModalState({
      isOpen: true,
      type: 'restore-point',
      step: 1,
      backupId: null,
      selectedBackup: null
    });
  };
  const handleRestore = (backupId: any) => {
    const selectedBackup = backupData.find(backup => backup.id === backupId) || null;
    setModalState({
      isOpen: true,
      type: 'restore',
      step: 1,
      backupId,
      selectedBackup
    });
  };

  const handleDownload = (backupId: any) => {
    const selectedBackup = backupData.find(backup => backup.id === backupId) || null;
    setModalState({
      isOpen: true,
      type: 'download',
      step: 1,
      backupId,
      selectedBackup
    });
  };

  const nextStep = () => {
    setModalState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const prevStep = () => {
    setModalState(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const renderModalContent = () => {
    const { type, step, selectedBackup } = modalState;

    if (type === 'new') {
      switch (step) {
        case 1:
          return (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Select Backup Type</h3>
              <div className="space-y-4">
                <button
                  onClick={nextStep}
                  className="w-full p-4 text-left border border-gray-600/30 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  <h4 className="font-medium text-white">Full System Backup</h4>
                  <p className="text-sm text-gray-400">Backup all system data and configurations</p>
                </button>
                <button
                  onClick={nextStep}
                  className="w-full p-4 text-left border border-gray-600/30 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  <h4 className="font-medium text-white">User Data Only</h4>
                  <p className="text-sm text-gray-400">Backup user-specific data only</p>
                </button>
                <button
                  onClick={nextStep}
                  className="w-full p-4 text-left border border-gray-600/30 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  <h4 className="font-medium text-white">Custom Backup</h4>
                  <p className="text-sm text-gray-400">Select specific tables and data to backup</p>
                </button>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Configure Backup</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Backup Name</label>
                  <input
                    type="text"
                    className="w-full bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-2 text-white"
                    placeholder="Enter backup name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Description</label>
                  <textarea
                    className="w-full bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-2 text-white"
                    rows={3}
                    placeholder="Enter backup description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Compression Level</label>
                  <select className="w-full bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-2 text-white">
                    <option>Fast (Low compression)</option>
                    <option>Standard (Balanced)</option>
                    <option>Maximum (High compression)</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevStep}
                    className="flex-1 border border-gray-600/30 text-white py-2 rounded-lg hover:bg-[#263548] transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-1 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    Start Backup
                  </button>
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-white">Creating Backup...</h3>
              <p className="text-gray-400 mb-4">This may take a few minutes. Please don't close this window.</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-sky-600 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">75% Complete</p>
              <button
                onClick={nextStep}
                className="mt-4 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Simulate Complete
              </button>
            </div>
          );
        case 4:
          return (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Backup Complete!</h3>
              <p className="text-gray-400 mb-4">Your backup has been created successfully.</p>
              <div className="bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-4 mb-4">
                <div className="text-left">
                  <p className="text-sm text-gray-400">Backup Name:</p>
                  <p className="text-white">System Backup - {new Date().toLocaleString()}</p>
                  <p className="text-sm text-gray-400 mt-2">Size:</p>
                  <p className="text-white">1.8 GB</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Done
              </button>
            </div>
          );
        default:
          return null;
      }
    }

    if (type === 'restore-point') {
      switch (step) {
        case 1:
          return (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Create Restore Point</h3>
              <p className="text-gray-400 mb-4">Create a restore point before making system changes. This allows you to revert back if needed.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Restore Point Name</label>
                  <input
                    type="text"
                    className="w-full bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-2 text-white"
                    placeholder="Before System Update"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Description</label>
                  <textarea
                    className="w-full bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-2 text-white"
                    rows={3}
                    placeholder="Describe why you're creating this restore point"
                  />
                </div>
                <button
                  onClick={nextStep}
                  className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Create Restore Point
                </button>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-white">Creating Restore Point...</h3>
              <p className="text-gray-400">Capturing current system state...</p>
              <button
                onClick={nextStep}
                className="mt-4 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Simulate Complete
              </button>
            </div>
          );
        case 3:
          return (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Restore Point Created!</h3>
              <p className="text-gray-400 mb-4">You can now safely make system changes.</p>
              <button
                onClick={closeModal}
                className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Done
              </button>
            </div>
          );
        default:
          return null;
      }
    }

    if (type === 'restore') {
      switch (step) {
        case 1:
          return (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Confirm Restore</h3>
              {selectedBackup && (
                <div className="bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-white mb-2">{selectedBackup.title}</h4>
                  <p className="text-sm text-gray-400">Date: {selectedBackup.date}</p>
                  <p className="text-sm text-gray-400">Size: {selectedBackup.size}</p>
                  <p className="text-sm text-gray-400">Type: {selectedBackup.type}</p>
                </div>
              )}
              <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4 mb-4">
                <p className="text-amber-400 text-sm font-medium">⚠️ Warning</p>
                <p className="text-amber-200 text-sm">This will overwrite your current system state. All changes made after the backup date will be lost.</p>
              </div>
              <p className="text-gray-400 mb-4">Are you sure you want to restore from this backup? This action cannot be undone.</p>
              <div className="space-y-2">
                <button
                  onClick={nextStep}
                  className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Yes, Restore
                </button>
                <button
                  onClick={closeModal}
                  className="w-full border border-gray-600/30 text-white py-2 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-white">Restoring Backup...</h3>
              <p className="text-gray-400 mb-4">This may take a few minutes. Please don't close this window.</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-sky-600 h-2 rounded-full w-1/2 transition-all duration-1000"></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">50% Complete</p>
              <button
                onClick={nextStep}
                className="mt-4 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
              >
               Loading
              </button>
            </div>
          );
        case 3:
          return (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Restore Complete!</h3>
              <p className="text-gray-400 mb-4">Your system has been successfully restored.</p>
              <button
                onClick={closeModal}
                className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Done
              </button>
            </div>
          );
        default:
          return null;
      }
    }

    if (type === 'download') {
      switch (step) {
        case 1:
          return (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Download Options</h3>
              {selectedBackup && (
                <div className="bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-white mb-2">{selectedBackup.title}</h4>
                  <p className="text-sm text-gray-400">Size: {selectedBackup.size}</p>
                </div>
              )}
              <div className="space-y-4">
                <button
                  onClick={nextStep}
                  className="w-full p-4 text-left border border-gray-600/30 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  <h4 className="font-medium text-white">Full Backup</h4>
                  <p className="text-sm text-gray-400">Download complete backup archive</p>
                </button>
                <button
                  onClick={nextStep}
                  className="w-full p-4 text-left border border-gray-600/30 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  <h4 className="font-medium text-white">Partial Backup</h4>
                  <p className="text-sm text-gray-400">Select specific components to download</p>
                </button>
                <button
                  onClick={nextStep}
                  className="w-full p-4 text-left border border-gray-600/30 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  <h4 className="font-medium text-white">Metadata Only</h4>
                  <p className="text-sm text-gray-400">Download backup information and structure</p>
                </button>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2 text-white">Preparing Download...</h3>
              <p className="text-gray-400 mb-4">Compressing files and preparing your download...</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-sky-600 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">80% Complete</p>
              <button
                onClick={nextStep}
                className="mt-4 bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Simulate Complete
              </button>
            </div>
          );
        case 3:
          return (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Download Ready!</h3>
              <p className="text-gray-400 mb-4">Your backup file is ready for download.</p>
              <div className="bg-[#1e2a3a] border border-gray-600/30 rounded-lg p-4 mb-4">
                <div className="text-left">
                  <p className="text-sm text-gray-400">File Name:</p>
                  <p className="text-white">backup_system_20240321.zip</p>
                  <p className="text-sm text-gray-400 mt-2">Size:</p>
                  <p className="text-white">2.1 GB (compressed)</p>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    // Simulate download
                    const link = document.createElement('a');
                    link.href = 'data:text/plain;charset=utf-8,Sample backup file';
                    link.download = 'backup_system_20240321.zip';
                    link.click();
                  }}
                  className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Download Now
                </button>
                <button
                  onClick={closeModal}
                  className="w-full border border-gray-600/30 text-white py-2 rounded-lg hover:bg-[#263548] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div className='bg-[#152131] h-screen'>
    <div className="md:mx-10 py-10 ">
      <div
        className="bg-[#152131] p-8 border border-gray-300 rounded-2xl font-sofia shadow-sm"
        style={{
          background: `linear-gradient(#152131, #152131) padding-box,
          linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c) border-box`,
          border: '1px solid transparent',
          borderRadius: '0.75rem'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold tracking-tight gradient-text font-bonanova text-white">Backup & Restore</h1>
          <div className="flex gap-2">
            <button 
              onClick={handleNewBackup}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Database size={16} />
              <span>New Backup</span>
            </button>
            <button 
              onClick={handleRestorePoint}
              className="bg-[#1e2a3a] border border-gray-600/30 text-white px-4 py-2 rounded-lg hover:bg-[#263548] transition-colors duration-200 flex items-center gap-2"
            >
              <RefreshCw size={16} />
              <span>Restore Point</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {backupData.map(backup => (
            <div 
              key={backup.id} 
              className="border border-gray-600/30 rounded-lg overflow-hidden bg-[#1e2a3a] hover:bg-[#263548] transition-colors duration-200"
            >
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection(backup.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded text-white ${getStatusColor(backup.status)}`}>
                    {backup.status}
                  </span>
                  <h3 className="text-lg font-medium text-white">{backup.title}</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-4">{backup.date}</span>
                  {expandedSection === backup.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedSection === backup.id && (
                <div className="p-4 border-t border-gray-600/30 bg-[#1e2a3a]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <Calendar size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Backup Date</p>
                        <p className="text-white">{backup.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <HardDrive size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Size</p>
                        <p className="text-white">{backup.size}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Database size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Tables</p>
                        <p className="text-white">{backup.tables} tables</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <RefreshCw size={18} className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-400">Type</p>
                        <p className="text-white">{backup.type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-400 mb-1">Description</p>
                    <p className="text-white">{backup.description}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleRestore(backup.id)}
                      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200"
                    >
                      Restore from Backup
                    </button>
                    <button 
                      onClick={() => handleDownload(backup.id)}
                      className="px-4 py-2 border border-gray-600/30 text-white rounded-lg hover:bg-[#263548] transition-colors duration-200"
                    >
                      Download Backup
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="flex items-center px-4 py-2 text-sky-400 hover:text-sky-300 transition-colors duration-200">
            <span>Load more backups</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#152131] border border-gray-600/30 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-600/30">
              <h2 className="text-lg font-semibold text-white">
                {modalState.type === 'new' && 'Create New Backup'}
                {modalState.type === 'restore-point' && 'Create Restore Point'}
                {modalState.type === 'restore' && 'Restore Backup'}
                {modalState.type === 'download' && 'Download Backup'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
    </div>
    );
  }

