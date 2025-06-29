import { RouteObject } from 'react-router-dom';
import Home from '../../pages/Admin/Home';
import UserManagement from '../../pages/Admin/User-Management';

import UserDetails from '../../pages/Admin/UserManagement/main';
import Venues from '../../pages/Admin/Venues';
import Supplier from '../../pages/Admin/Supplier';
import EventPlanner from '../../pages/Admin/EventPlanner';
import SurveyResponse from '../../pages/Admin/SurveyResponse';
import  Reports from '../../pages/Admin/Reports';

const routes: RouteObject[] = [
  { path: '/Home', element: <Home /> },
  { path: '/User-Management', element: <UserManagement /> },
  {path : '/UserDetails/:userId', element: <UserDetails/>},
  {path : '/Venues', element: <Venues/>},
  // {path : '/VenueDetails/:venueId', element: <VenueDetails/>}
  {path: '/Survey-Response', element: <SurveyResponse />},
  {path: '/Supplier', element: <Supplier />},
  {path: '/Event-Planner', element: <EventPlanner />},
  {path: '/Reports', element: <Reports />}
];

export default routes;