import { QueryClientProvider } from '@tanstack/react-query';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { queryClient } from './providers/query-client';
import { Cultivations } from './components/cultivations/cultivations';
import { Team } from './components/team/team';
import { AddUserModal } from './components/users/user-modal-add';
import { ToasterProvider } from '@ui-kit';
import { RemoveUserModal } from './components/users/user-modal-remove';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/cultivations" />,
  },
  {
    path: '/cultivations',
    element: <Cultivations />,
  },
  {
    path: '/cultivations/:id',
    element: <Team />,
    children: [
      {
        path: '/cultivations/:id/add-user',
        element: <AddUserModal />,
      },
      {
        path: '/cultivations/:id/remove-user/:userId',
        element: <RemoveUserModal />,
      },
    ],
  },
]);

export function App() {
  // throw new Error('I crashed!');
  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <div className="container max-w-[800px] mt-8 mx-auto">
          <RouterProvider router={router} />
        </div>
      </ToasterProvider>
    </QueryClientProvider>
  );
}

export default App;
