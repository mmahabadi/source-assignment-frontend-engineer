import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { ToasterType, useToaster } from '@ui-kit';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCultivationUsers } from '../../services/cultivation-service';
import { TeamTable } from './team-table';

const TeamList: FC = () => {
  const { id } = useParams();
  const { addToaster } = useToaster();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['cultivations', id, 'users'],
    queryFn: ({ signal, queryKey }: QueryFunctionContext) =>
      fetchCultivationUsers({ signal, id: queryKey[1] as string }),
  });

  useEffect(() => {
    if (isError) {
      addToaster(error?.message || 'Failed to fetch data.', ToasterType.ERROR);
    }
  }, [isError, error, addToaster]);

  return <TeamTable isLoading={isLoading} data={data || []} />;
};

export { TeamList };
