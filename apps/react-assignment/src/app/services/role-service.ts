import { Role } from '../types';

export const fetchRoles = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Role[]> => {
  const response = await fetch('/api/cultivation-roles', { signal });
  if (!response.ok) {
    const errorText = await response.json();
    throw new Error(`Failed to fetch roles: ${errorText.error}`);
  }
  return await response.json();
};
