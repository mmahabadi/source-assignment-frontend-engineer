import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ToasterType, useToaster } from '@ui-kit';
import { fetchCultivatios } from '../services/cultivation-service';

const useCultivations = () => {
  const { addToaster } = useToaster();
  const {
    data: cultivations,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cultivations'],
    queryFn: ({ signal }) => fetchCultivatios({ signal }),
  });

  useEffect(() => {
    if (isError) {
      addToaster(error?.message || 'Failed to fetch data.', ToasterType.ERROR);
    }
  }, [isError, error, addToaster]);

  return { cultivations, isLoading };
};

export { useCultivations };
