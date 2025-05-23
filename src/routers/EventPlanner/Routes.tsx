import { RouteObject } from 'react-router-dom';
import Home from '../../pages/EventPlanner/Home';
import Profiles from '../../pages/Profile/Profiles';
import CreateCompany from '../../pages/Profile/CreateCompany';
import EventListing from '../../components/EventsCards/Event-List';
import CreateEventForm from '../../pages/Events/CreateEvents';
import UpdateEvents from '../../pages/Events/UpdateEvent';
import TicketList from '../../pages/Events/TicketsList';
import RequestTicket from '../../pages/Events/RequestTickets';


import ProfilePage from '../../pages/Profile/Personal Profile/ProfilePage';
import EventPlannerinfo from '../../pages/EventPlanner/Register'; 
import UpdateInfo from '../../pages/EventPlanner/UpdateInfo';
import EPCalendar from '../../pages/EventPlanner/EPCalendar';
import ExampleProfile from '../../pages/EventPlanner/exampleProfile';

import AttendeeManagementPage from '../../components/payment/EventCreator/attendee';
import Venues from '../../pages/List/Venues';
import Supplier from '../../pages/List/Supplier';
import BudgetTracker from '../../components/Budget/Home'
import Main from '../../components/messenger/Main'


  const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/Home', element: <Home /> },
  { path: '/Profiles', element: <Profiles /> },
  { path: '/CreateCompany/:userId', element: <CreateCompany /> },
  { path: '/EventPlannerinfo', element: <EventPlannerinfo /> },
  { path: '/UpdateInfo', element: <UpdateInfo /> },
  { path: '/Calendar', element: <EPCalendar /> },
  { path: '/exampleProfile', element: <ExampleProfile /> },
  { path: '/Venue-List', element: <Venues /> },
  { path: '/Supplier-List', element: <Supplier /> },


  { path: '/EventList', element: <EventListing /> },
  { path: '/CreateEvents', element: <CreateEventForm/>},
  { path: '/UpdateEvents/:id', element: <UpdateEvents/>},
  { path: '/TicketList', element: <TicketList  /> },
  { path: '/tickets', element: <RequestTicket   /> },

  { path: '/Profile', element: <ProfilePage /> },
  {path: '/messenger', element: <Main/>},
  

 {path: '/Events/:eventId/attendees', element: <AttendeeManagementPage/> },
 {path: '/BudgetTracker', element: <BudgetTracker/> },

];

export default routes;
