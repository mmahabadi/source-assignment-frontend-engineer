import { Modal, ToasterType, useToaster } from '@ui-kit';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CultivationForm } from './cultivation-form';
import { useMutation } from '@tanstack/react-query';
import { addCultivation } from '../../../services/cultivation-service';
import { queryClient } from '../../../providers/query-client';

const AddCultivationModal: FC = () => {
  const navigate = useNavigate();
  const { addToaster } = useToaster();

  const { mutate, isPending } = useMutation({
    mutationFn: addCultivation,
    onSuccess: () => {
      navigate('../');
      addToaster('Cultivation successfully added', ToasterType.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ['cultivations'],
      });
    },
    onError: (error: Error) => {
      addToaster(error.message, ToasterType.ERROR);
    },
  });

  const handleClose = useCallback(() => {
    navigate('../');
  }, [navigate]);

  const handleSubmit = (name: string) => {
    mutate({
      name,
    });
  };

  return (
    <Modal title="Add New Cultivation" onClose={handleClose}>
      <CultivationForm
        loading={isPending}
        onCancel={handleClose}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { AddCultivationModal };
