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
import { AddCultivationModal } from './components/cultivations/new/cultivation-modal-add';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/cultivations" />,
  },
  {
    path: 'cultivations',
    element: <Cultivations />,
    children: [
      {
        path: 'new',
        element: <AddCultivationModal />,
      },
    ],
  },
  {
    path: '/cultivations/:id',
    element: <Team />,
    children: [
      {
        path: 'add-user',
        element: <AddUserModal />,
      },
      {
        path: 'remove-user/:userId',
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
