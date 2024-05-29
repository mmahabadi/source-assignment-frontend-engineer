import { ArrowDownIcon, Button, ToasterType, useToaster } from '@ui-kit';
import { FC, useState } from 'react';
import { useRoles } from '../../hooks/useRoles';
import { Role, User } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { updateUserRole } from '../../services/user-service';
import { queryClient } from '../../providers/query-client';
import { RoleDropDownMenu } from './role-dropdown-menu';

type propTypes = {
  cultivationId?: string;
  selectedRole: Role;
  user: User;
};
const RoleDropDownContainer: FC<propTypes> = ({
  cultivationId,
  selectedRole,
  user,
}) => {
  const [show, setShow] = useState(false);
  const { roles } = useRoles();
  const { addToaster } = useToaster();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      addToaster("User's role updated successfully.", ToasterType.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['cultivations'],
      });
    },
    onError: (error: Error) => {
      addToaster(error.message, ToasterType.ERROR);
    },
  });

  const changeRoleHandler = (roleId: number) => {
    if (!cultivationId) {
      addToaster('Cultivation ID is missing', ToasterType.ERROR);
      return;
    }
    mutate({
      cultivationId,
      roleId,
      userId: user.id,
    });
  };
  return (
    <Button
      variant="link"
      loading={isPending}
      onMouseOut={() => setShow(false)}
      onMouseOver={() => setShow(true)}
    >
      <div className="flex items-center">
        {selectedRole?.name} <ArrowDownIcon />
      </div>
      {show && (
        <RoleDropDownMenu
          roles={roles as Role[]}
          selectedRole={selectedRole}
          onChange={changeRoleHandler}
        />
      )}
    </Button>
  );
};
export { RoleDropDownContainer };
