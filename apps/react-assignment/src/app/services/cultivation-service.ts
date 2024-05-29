import { CultivateUser, Cultivation } from '../types';

export async function fetchCultivatios({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Cultivation[]> {
  const url = '/api/cultivations';
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('An error occurred while fetching the cultivations');
  }

  return await response.json();
}
export async function fetchCultivationUsers({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string;
}): Promise<CultivateUser[]> {
  const url = `/api/cultivations/${id}/users`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('An error occurred while fetching the cultivation users');
  }

  return await response.json();
}

export async function addCultivationUsers({
  cultivationId,
  roleId,
  userIds,
}: {
  cultivationId: string;
  roleId: number;
  userIds: number[];
}): Promise<unknown> {
  const results = await Promise.allSettled(
    userIds.map((userId) =>
      addCultivationUser({ cultivationId, roleId, userId })
    )
  );
  const rejectedResults = results
    .map((result, index) =>
      result.status === 'rejected'
        ? { userId: userIds[index], reason: result.reason }
        : null
    )
    .filter((result) => result !== null);

  if (rejectedResults.length > 0) {
    const failedUsers = rejectedResults
      .map((result) => result?.reason?.message)
      .join('; ');
    const errorMessage = `Failed to add the following users: ${failedUsers}`;
    throw new Error(errorMessage);
  }
  return results;
}

export async function addCultivationUser({
  cultivationId,
  roleId,
  userId,
}: {
  cultivationId: string;
  roleId: number;
  userId: number;
}): Promise<unknown> {
  const url = `/api/cultivations/${cultivationId}/users`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: {
        id: roleId,
      },
      user: {
        id: userId,
      },
    }),
  });
  if (!response.ok) {
    let errorMessage = 'An error occurred while adding the cultivation user';
    if (response.status === 422) {
      errorMessage = `User '${userId}' is already part of the cultivation`;
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function removeCultivationUser({
  cultivationId,
  userId,
}: {
  cultivationId: string;
  userId: string;
}): Promise<void> {
  const url = `/api/cultivations/${cultivationId}/users/${userId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('An error occurred while removing the cultivation user');
  }
}

export async function addCultivation({
  name,
}: {
  name: string;
}): Promise<unknown> {
  const url = '/api/cultivations';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });
  if (!response.ok) {
    throw new Error('An error occurred while adding the cultivation');
  }

  return await response.json();
}
