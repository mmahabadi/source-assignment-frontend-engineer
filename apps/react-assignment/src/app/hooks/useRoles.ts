import {
    QueryFunctionContext,
    useQuery
} from '@tanstack/react-query';
import { ToasterType, useToaster } from '@ui-kit';
import { useEffect } from 'react';
import { fetchRoles } from '../services/role-service';

const useRoles = () => {
  const { addToaster } = useToaster();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: ({ signal }: QueryFunctionContext) => fetchRoles({ signal }),
    staleTime: Infinity, // cache forever because roles are not expected to change
  });

  useEffect(() => {
    if (isError) {
      addToaster(error?.message, ToasterType.ERROR);
    }
  }, [isError, error, addToaster]);

  return { roles: data, isError, error, isLoading };
};
export { useRoles };
