import { BackIcon, Button, Panel } from '@ui-kit';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TeamList } from './list/team-list';
import { PlusIcon } from 'lucide-react';

const Team: FC = () => {
  const navigate = useNavigate();
  const gotoNewUser = () => {
    navigate('add-user', { relative: 'path' });
  };

  const tools = (
    <Button
      onClick={gotoNewUser}
      variant="default"
      className="flex items-center button pl-2 rounded-none"
    >
      <PlusIcon className="w-4 h-4 mr-2" />
      Add team member
    </Button>
  );

  return (
    <>
      <Button
        onClick={() => navigate('..')}
        variant="default"
        className="flex items-center button pl-2 rounded-none"
      >
        <BackIcon />
        Back to cultivations list
      </Button>
      <Outlet />
      <Panel
        title="Cultivation team"
        description="Manage cultivation's users"
        tools={tools}
      >
        <TeamList />
      </Panel>
    </>
  );
};

export { Team };
