import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { ToasterType, useToaster } from "@ui-kit";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCultivationUsers } from "../services/cultivation-service";

export const useCultivationUsers = () => {
    const { id: cultivationId } = useParams();
  const { addToaster } = useToaster();
  const { data: cultivationUsers, isError, isLoading, error } = useQuery({
    queryKey: ['cultivations', cultivationId, 'users'],
    queryFn: ({ signal, queryKey }: QueryFunctionContext) =>
      fetchCultivationUsers({ signal, id: queryKey[1] as string }),
  });

  useEffect(() => {
    if (isError) {
      addToaster(error?.message || 'Failed to fetch data.', ToasterType.ERROR);
    }
  }, [isError, error, addToaster]);

  return { cultivationId, cultivationUsers, isLoading };
}