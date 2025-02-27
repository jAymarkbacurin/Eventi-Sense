import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import supabase from '../../../../../api/supabaseClient';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CustomModal from '../../../../../assets/modal/customcalendar';


interface AvailabilityEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string; // Add this line
  backgroundColor?: string;
  
}

const AddVenueAvailabilityForm: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [events, setEvents] = useState<AvailabilityEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<AvailabilityEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [newAvailability, setNewAvailability] = useState({
    start: null as Date | null,
    end: null as Date | null,
    title: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const calendarRef = useRef<FullCalendar>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStart, setEditedStart] = useState<Date | null>(null);
  const [editedEnd, setEditedEnd] = useState<Date | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');




  // Fetch events when venueId changes
  useEffect(() => {
    if (venueId) {
      fetchEvents();
    }
  }, [venueId]);

  const fetchEvents = async () => {
    setIsCreating(false);
    try {
      const { data, error } = await supabase
        .from("venue_availability")
        .select("*")
        .eq("venue_id", venueId);
  
      if (error) throw error;
      console.log("Fetched events:", data); // Debugging
  
      const eventsForCalendar = data.map((event: any): AvailabilityEvent => ({
        id: event.id,
        title: event.title || 'Not_Available',
        start: event.available_start,
        end: event.available_end,
        backgroundColor: event.color || '#CDB0E8', // Default color if not specified
      }));
      setEvents(eventsForCalendar);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to fetch events. Please try again.");
    }
  };

// Update handleEventClick
const handleEventClick = (info: any) => {
  const clickedEventId = info.event.id;
  const originalEvent = events.find(event => event.id === clickedEventId);

  if (originalEvent) {
    setSelectedEvent(originalEvent);
    setEditedStart(new Date(originalEvent.start));
    setEditedEnd(new Date(originalEvent.end));
    setSelectedColor(originalEvent.color || '#E2D6FF'); // Set the event's color
    setIsModalOpen(true);
  }
};
const handleDateClick = (info: any) => {
  setSelectedDate(info.date);
  setIsEditing(false); // Ensure we're not in edit mode

  // Filter events that overlap with the clicked date
  const clickedEvents = events.filter((event) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    const clickedStart = info.date;
    const clickedEnd = new Date(info.date);
    clickedEnd.setDate(info.date.getDate() + 1); // Next day

    // Check if the event overlaps with the clicked date
    return eventStart < clickedEnd && eventEnd > clickedStart;
  });

  // Format unavailable times for display
  let unavailableTimes = "No unavailability set for this day.";
  if (clickedEvents.length > 0) {
    unavailableTimes = clickedEvents
      .map((event) => {
        const startTime = new Date(event.start).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endTime = new Date(event.end).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `${startTime} - ${endTime}`;
      })
      .join("<br/>");
    unavailableTimes = `Unavailable Times:<br/>${unavailableTimes}`;
  }

  // Set modal content and open the modal
  setModalContent(unavailableTimes);
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
    setError('');
    setSuccessMessage('');
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setNewAvailability({ start: selectedDate, end: null, title: '' });
    setSelectedColor('#E2D6FF'); // Set a default color
    setError('');
    setSuccessMessage('');
  };

  const handleNewAvailabilityChange = (field: string, value: string | Date | null) => {
    if (field === 'color') {
      setSelectedColor(value as string);
    } else {
      setNewAvailability(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveAvailability = async () => {
    setError('');
    setSuccessMessage('');
  
    if (!newAvailability.start || !newAvailability.end) {
      setError("Please select start and end times.");
      return;
    }
    if (newAvailability.end <= newAvailability.start) {
      setError('End time must be after start time');
      return;
    }
  
    try {
      const { error } = await supabase
        .from("venue_availability")
        .insert([{
          venue_id: venueId,
          available_start: newAvailability.start.toISOString(),
          available_end: newAvailability.end.toISOString(),
          title: newAvailability.title,
          color: selectedColor, // Ensure this line is present
        }]);
  
      if (error) throw error;
  
      fetchEvents();
      closeModal();
      setIsCreating(false);
      setNewAvailability({ start: null, end: null, title: '' });
      setSuccessMessage("Availability saved successfully!");
    } catch (error) {
      console.error("Error saving availability:", error);
      setError("Error saving availability. Please try again.");
    }
  };
  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewAvailability({ start: null, end: null, title: '' });
    setError('');
    setSuccessMessage('');
  };

  const handleDeleteAvailability = async (id: string) => {
    setError('');
    setSuccessMessage('');

    try {
      const { error } = await supabase
        .from("venue_availability")
        .delete()
        .eq("id", id);

      if (error) throw error;

      fetchEvents();
      closeModal();
      setSuccessMessage("Availability deleted successfully!");
    } catch (error) {
      console.error("Error deleting availability:", error);
      setError("Error deleting availability. Please try again.");
    }
  };
    // Add update function
    const handleUpdateAvailability = async () => {
      if (!selectedEvent || !editedStart || !editedEnd) return;
    
      try {
        const { error } = await supabase
          .from("venue_availability")
          .update({
            available_start: editedStart.toISOString(),
            available_end: editedEnd.toISOString(),
            color: selectedColor, // Ensure this line is present
          })
          .eq("id", selectedEvent.id);
    
        if (error) throw error;
    
        fetchEvents();
        setIsEditing(false);
        setSuccessMessage("Availability updated successfully!");
      } catch (error) {
        console.error("Error updating availability:", error);
        setError("Error updating availability. Please try again.");
      }
    };
  return (
    <div className='py-4 my-[2rem] font-sofia bg-white dark:bg-gray-900 mx-4 p-8 rounded-3xl border-[1px] border-gray-300 dark:border-gray-700'>
    
      {selectedDate && (
        <p className="mb-4 text-gray-700 dark:text-gray-300">Selected date: {selectedDate.toDateString()}</p>
      )}
      <div className='flex justify-between my-4'>
        <div>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4 font-bonanova">Existing Events</h2>
      
        </div>
        {isCreating ? (
          <div className="border dark:border-gray-700 rounded-xl mb-8 overflow-hidden max-w-max bg-white dark:bg-gray-800 p-4 shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-200">Create New Availability</h3>
            <label htmlFor="start" className="text-gray-700 dark:text-gray-300">Start Time:</label><br />
            <DatePicker
              selected={newAvailability.start}
              onChange={(date) => handleNewAvailabilityChange('start', date)}
              showTimeSelect
              dateFormat="Pp"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg p-2"
            /><br /><br />

            <label htmlFor="end" className="text-gray-700 dark:text-gray-300">End Time:</label><br />
            <DatePicker
              selected={newAvailability.end}
              onChange={(date) => handleNewAvailabilityChange('end', date)}
              showTimeSelect
              dateFormat="Pp"
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg p-2"
            /><br /><br />

            <label htmlFor="title" className="text-gray-700 dark:text-gray-300">Title:</label><br />
            <textarea
              value={newAvailability.title}
              onChange={(e) => handleNewAvailabilityChange('title', e.target.value)}
              className="border dark:border-gray-600 rounded w-full p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            /><br /><br />

            <button onClick={handleSaveAvailability} 
              className="bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
              Save
            </button>
            <button onClick={handleCancelCreate} 
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleCreateClick} 
            className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-4 px-4 rounded-2xl">
           Add Event+
          </button>
        )}
      </div>
      <div className='text-gray-500 dark:text-gray-400 my-4 ml-4'>
        <div className='flex gap-2 mb-2'> <p style={{backgroundColor: '#E2D6FF'}} className='w-4 h-4 rounded'></p>
          <h2 className='flex justify-center'>
           <span className='text-indigo-500 dark:text-indigo-400'>Scheduled: </span> 
           <span className="dark:text-gray-300">This indicates an event or task that is planned for a future date and time.</span>
          </h2>
        </div>
        <div className='flex gap-2 mb-2'> <p style={{backgroundColor: '#FCD9D9'}} className='w-4 h-4 rounded'></p>
          <h2 className='flex justify-center'>
            <span className='text-red-500 dark:text-red-400'>Cancelled: </span>
            <span className="dark:text-gray-300">This indicates that an event or task has been canceled or postponed.</span>
          </h2>
        </div>
        <div className='flex gap-2 mb-2'> <p style={{backgroundColor: '#D6FFE7'}} className='w-4 h-4 rounded'></p>
          <h2 className='flex justify-center'>
           <span className='text-green-500 dark:text-green-400'>Completed: </span>
           <span className="dark:text-gray-300">This indicates that an event or task has been completed.</span>
          </h2>
        </div>
        <div className='flex gap-2 mb-2'> <p style={{backgroundColor: '#FFE9D6'}} className='w-4 h-4 rounded'></p>
          <h2 className='flex justify-center'>
            <span className='text-orange-500 dark:text-orange-400'>On Progress: </span>
            <span className="dark:text-gray-300">This indicates that an event or task is currently in progress.</span>
          </h2>
        </div>
      
      </div>
      <div className="border dark:border-gray-700 rounded-3xl mb-8 overflow-hidden bg-white dark:bg-gray-950 p-8 shadow-lg">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',  
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events} // Pass the events array with color properties

        eventClick={handleEventClick}
        dateClick={handleDateClick}
        // Add eventContent for more customization if needed
        eventContent={(arg) => {
        return (
          <div
          className="fc-event-content flex flex-col py-4 xl:flex-row items-center justify-start md:justify-between md:space-x-4 rounded-lg px-4 w-full"
          style={{ backgroundColor: arg.event.backgroundColor, color: arg.event.textColor }}
        >
    {/* Event Dot */}
    <div className="fc-daygrid-event-line w-2  h-2 rounded-full mb-2 md:mb-0 py-4" style={{ backgroundColor: arg.event.backgroundColor,color: arg.event.textColor, filter: 'brightness(0.8)' }}></div>
  
    {/* Event Details */}
    <div className="flex flex-col xl:flex-row items-center justify-start md:justify-between md:space-x-4 w-full">
      {/* Event Title */}
      <div className="fc-event-time text-center md:text-left mb-2 md:mb-0 dark:text-gray-200">
        {arg.event.title}
      </div>
  
    </div>
  </div>
 )
  }}
/>
      </div>

  

      <CustomModal
  isOpen={isModalOpen}
  onClose={closeModal}
  title="Availability Details"
  selectedEvent={selectedEvent}
  selectedDate={selectedDate}
  error={error}
  setError={setError}
  successMessage={successMessage}
  setSuccessMessage={setSuccessMessage}
  modalContent={modalContent}
  onDelete={handleDeleteAvailability}
  onUpdate={handleUpdateAvailability}
  isEditing={isEditing}
  setIsEditing={setIsEditing}
  editedStart={editedStart}
  editedEnd={editedEnd}
  setEditedStart={setEditedStart}
  setEditedEnd={setEditedEnd}
  selectedColor={selectedColor} // Add this line
  setSelectedColor={setSelectedColor} // Add this line
/>
    </div>
  );
};

export default AddVenueAvailabilityForm;