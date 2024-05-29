import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { LoadingIndicator, Modal, ToasterType, useToaster } from '@ui-kit';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../services/user-service';
import { UsersList } from './user-modal-list';

const AddUserModal: FC = () => {
  const navigate = useNavigate();
  const { addToaster } = useToaster();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: ({ signal }: QueryFunctionContext) => fetchUsers({ signal }),
  });

  const handleClose = useCallback(() => {
    navigate('../');
  }, [navigate]);

  useEffect(() => {
    if (isError) {
      addToaster(error?.message || 'Failed to fetch data.', ToasterType.ERROR);
      handleClose();
    }
  }, [isError, error, addToaster, handleClose]);

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (data) {
    content = <UsersList key={data.length} users={data} />;
  }

  return (
    <Modal title="Add team member" onClose={handleClose}>
      {content}
    </Modal>
  );
};

export { AddUserModal };
