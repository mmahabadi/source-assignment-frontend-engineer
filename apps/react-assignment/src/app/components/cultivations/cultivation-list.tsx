import { useQuery } from '@tanstack/react-query';
import {
  DataTable,
  ToasterType,
  dataTableAction,
  dataTableColumn,
  useToaster
} from '@ui-kit';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCultivatios } from '../../services/cultivation-service';
import { Cultivation } from '../../types';

const CultivationList: FC = () => {
  const navigate = useNavigate();
  const { addToaster } = useToaster();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['cultivations'],
    queryFn: ({ signal }) => fetchCultivatios({ signal }),
  });

  useEffect(() => {
    if (isError) {
      addToaster(error?.message || 'Failed to fetch data.', ToasterType.ERROR);
    }
  }, [isError, error, addToaster]);

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
      key={data?.length}
      loading={isLoading}
      columns={columns}
      data={data || []}
      actions={actions}
    />
  );
};

export { CultivationList };
