import { BackIcon, Button, Panel } from '@ui-kit';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TeamList } from './team-list';
import { PlusIcon } from 'lucide-react';

const Team: FC = () => {
  const navigate = useNavigate();
  const gotoNewUser = () => {
    navigate('add-user', { relative: 'path' });
  };

  const tools = (
    <Button
      onClick={() => navigate('..')}
      variant="default"
      className="flex items-center button pl-2 rounded-none"
    >
      <BackIcon />
      Back to cultivations list
    </Button>
  );

  return (
    <>
      <Outlet />
      <Panel
        title="Cultivation team"
        description="Manage cultivation's users"
        tools={tools}
      >
        <TeamList />
        <footer className="text-right">
          <Button
            onClick={gotoNewUser}
            variant="default"
            className="flex items-center button pl-2 rounded-none"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add team member
          </Button>
        </footer>
      </Panel>
    </>
  );
};

export { Team };
