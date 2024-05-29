import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //TODO: define them as env variables
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes (gcTime)
    },
  },
});
