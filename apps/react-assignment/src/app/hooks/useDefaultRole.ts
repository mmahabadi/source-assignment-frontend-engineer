import { useEffect, useState } from 'react';
import { DefaultRoleName, Role } from '../types';
import { useRoles } from './useRoles';

const useDefaultRole = () => {
  const [defaultRoleId, setDefaultRoleId] = useState<number | null>(null);
  const { roles } = useRoles();

  useEffect(() => {
    if (roles && roles?.length > 0) {
      const defaultRole = roles.find(
        (role: Role) =>
          role.name?.toLowerCase() === DefaultRoleName.toLowerCase()
      );
      if (defaultRole) {
        setDefaultRoleId(defaultRole.id);
      }
    }
  }, [roles]);

  return { defaultRoleId };
};

export { useDefaultRole };
