import { useEffect, useState } from 'react';
import { fetchRoles } from '../services/role-service';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { DefaultRoleName, Role } from '../types';
import { ToasterType, useToaster } from '@ui-kit';

const useDefaultRole = () => {
  const [defaultRoleId, setDefaultRoleId] = useState<number | null>(null);
  const { addToaster } = useToaster();

  const { data, isError, error } = useQuery({
    queryKey: ['roles'],
    queryFn: ({ signal }: QueryFunctionContext) => fetchRoles({ signal }),
    staleTime: Infinity, // cache forever because roles are not expected to change
  });

  useEffect(() => {
    if (isError) {
      addToaster(error?.message, ToasterType.ERROR);
    }
  }, [isError, error, addToaster]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const defaultRole = data.find(
        (role: Role) =>
          role.name?.toLowerCase() === DefaultRoleName.toLowerCase()
      );
      if (defaultRole) {
        setDefaultRoleId(defaultRole.id);
      }
    }
  }, [data]);

  return { defaultRoleId };
};

export { useDefaultRole };
