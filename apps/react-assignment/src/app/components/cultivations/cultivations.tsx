import { FC } from 'react';
import { CultivationList } from './cultivation-list';
import { Panel } from '@ui-kit';

const Cultivations: FC = () => {
  return (
    <Panel title="Cultivations" description="Manage cultivations">
      <CultivationList />
    </Panel>
  );
};

export { Cultivations };
