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

export async function updateUserRole({
  cultivationId,
  roleId,
  userId,
}: {
  cultivationId: string;
  roleId: number;
  userId: number;
}): Promise<unknown> {
  const url = `/api/cultivations/${cultivationId}/users/${userId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: {
        id: roleId,
      },
    }),
  });
  if (!response.ok) {
    throw new Error("An error occurred while updating the users' role");
  }

  return await response.json();
}
