import { FC } from 'react';

import { DataTable, dataTableAction, dataTableColumn } from '@ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { CultivateUser } from '../../../types';
import { UserName } from '../user-name';
import { RoleDropDownContainer } from '../dropdown/role-dropdown-container';

type propTypes = {
  data: CultivateUser[];
  isLoading: boolean;
};
const TeamTable: FC<propTypes> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { id: cultivationId } = useParams();

  if (!data) return null;

  const handleRemove = (row: unknown) => {
    const userId = (row as CultivateUser).user.id;
    if (!userId) return;
    navigate(`remove-user/${userId}`, {
      relative: 'path',
    });
  };

  const columns: dataTableColumn[] = [
    {
      title: 'Name',
      prop: 'user',
      template: (row: unknown) => (
        <UserName name={(row as CultivateUser)?.user?.name} />
      ),
    },
    {
      title: 'Cultivation role',
      prop: 'roleName',
      template: (row: unknown) => (
        <RoleDropDownContainer
          cultivationId={cultivationId}
          selectedRole={(row as CultivateUser)?.role}
          user={(row as CultivateUser)?.user}
        />
      ),
    },
  ];
  const actions: dataTableAction[] = [
    {
      label: 'Remove',
      onClick: handleRemove,
    },
  ];

  return (
    <DataTable
      key={data?.length}
      loading={isLoading}
      columns={columns}
      data={data}
      actions={actions}
    />
  );
};

export { TeamTable };
