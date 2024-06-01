import { DataTable, dataTableAction, dataTableColumn } from '@ui-kit';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCultivations } from '../../hooks/useCultivations';
import { Cultivation } from '../../types';

const CultivationList: FC = () => {
  const navigate = useNavigate();
  const { cultivations, isLoading } = useCultivations();

  const handleOnClick = (row: unknown) => {
    navigate(`${(row as Cultivation).id}`, { relative: 'path' });
  };

  const columns: dataTableColumn[] = [
    {
      title: 'Name',
      prop: 'name',
    },
  ];
  const actions: dataTableAction[] = [
    {
      label: 'Manage team',
      onClick: handleOnClick,
    },
  ];

  return (
    <DataTable
      key={cultivations?.length}
      loading={isLoading}
      columns={columns}
      data={cultivations || []}
      actions={actions}
    />
  );
};

export { CultivationList };
