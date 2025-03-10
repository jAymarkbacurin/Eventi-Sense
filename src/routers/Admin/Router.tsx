import { RouteObject } from 'react-router-dom';
import Home from '../../pages/Admin/Home';
import UserManagement from '../../pages/Admin/User-Management';

import UserDetails from '../../pages/Admin/UserManagement/UserDetails';

const routes: RouteObject[] = [
  { path: '/Home', element: <Home /> },
  { path: '/User-Management', element: <UserManagement /> },
  {path : '/UserDetails/:userId', element: <UserDetails/>}
];

export default routes;