import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button } from './components/ui/button';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import MadeNewJob from './pages/admin/MadeNewJob';
import { Auth } from './pages/Auth';
import OnBoardPage from './pages/OnBoardPage';
import Profile from './pages/candidate/Profile';
import Applications from './pages/Applications';
import ProfileView from './pages/candidate/ProfileView';
import UserActivity from './pages/candidate/UserActivity';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'userActivity/:userId',
        element: <UserActivity />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'profile/:userId',
        element: <ProfileView />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
        children: [
          {
            path: ':recId',
            element: <Jobs />,
          },
        ],
      },
      {
        path: 'application/:jobId',
        element: <Applications />,
      },
      {
        path: 'createNewJob',
        element: <MadeNewJob />,
      },
      {
        path: 'On-Boarding',
        element: <OnBoardPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Auth />,
  },
]);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
