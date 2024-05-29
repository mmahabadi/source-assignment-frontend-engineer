import { User } from '../types';

export async function fetchUsers({
  signal,
}: {
  signal: AbortSignal;
}): Promise<User[]> {
  const url = '/api/users';
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('An error occurred while fetching the users');
  }

  return await response.json();
}
