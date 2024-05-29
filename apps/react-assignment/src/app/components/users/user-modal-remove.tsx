import { useMutation } from '@tanstack/react-query';
import { Button, Modal, ToasterType, useToaster } from '@ui-kit';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { queryClient } from '../../providers/query-client';
import { removeCultivationUser } from '../../services/cultivation-service';

const RemoveUserModal: FC = () => {
  const { id: cultivationId, userId } = useParams();
  const navigate = useNavigate();
  const { addToaster } = useToaster();
  const { mutate, isPending } = useMutation({
    mutationFn: removeCultivationUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cultivations', cultivationId, 'users'],
      });
      addToaster('User removed successfully.', ToasterType.SUCCESS);
      handleClose();
    },
    onError: (error) => {
      addToaster(error?.message || 'Failed to remove user.', ToasterType.ERROR);
    },
  });

  const handleClose = () => {
    navigate('../');
  };

  const handleRemove = () => {
    if (!cultivationId || !userId) return null;
    mutate({ cultivationId, userId });
  };

  return (
    <Modal title="Remove team member" onClose={handleClose}>
      <p className="p-6">Are you sure you want to remove this user?</p>
      <div className="border-t p-2 text-right">
        <Button variant="default" onClick={handleClose}>
          No, cancel it
        </Button>
        <Button loading={isPending} variant="danger" onClick={handleRemove}>
          Yes, remove it
        </Button>
      </div>
    </Modal>
  );
};

export { RemoveUserModal };
