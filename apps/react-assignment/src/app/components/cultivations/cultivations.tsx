import { FC } from 'react';
import { CultivationList } from './cultivation-list';
import { Button, Panel } from '@ui-kit';
import { PlusIcon } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const Cultivations: FC = () => {
  const navigate = useNavigate();

  const gotoNewCultivation = () => {
    navigate('new', { relative: 'path' });
  };

  const tools = (
    <Button
      onClick={gotoNewCultivation}
      variant="default"
      className="flex items-center button pl-2 rounded-none"
    >
      <PlusIcon className="w-4 h-4 mr-2" />
      Add new
    </Button>
  );
  return (
    <>
      <Outlet />
      <Panel
        title="Cultivations"
        description="Manage cultivations"
        tools={tools}
      >
        <CultivationList />
      </Panel>
    </>
  );
};

export { Cultivations };
