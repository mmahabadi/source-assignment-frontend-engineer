import { ErrorBlock } from '@ui-kit';
import { FC } from 'react';
import { useCultivationUsers } from '../../../hooks/useCultivationUsers';
import { TeamTable } from '../list/team-table';

const TeamList: FC = () => {
  const { cultivationId, cultivationUsers, isLoading } = useCultivationUsers();

  if (!cultivationId)
    return <ErrorBlock title="Error" message="Cultivation not found" />;

  return (
    <TeamTable
      cultivationId={cultivationId}
      isLoading={isLoading}
      data={cultivationUsers || []}
    />
  );
};

export { TeamList };
