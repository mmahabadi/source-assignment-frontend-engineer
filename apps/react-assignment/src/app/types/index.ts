export type Cultivation = {
  id: string;
  name: string;
};

export type User = {
  id: number;
  name: string;
};

export type Role = {
  id: number;
  name: string;
  description: string;
};

export type CultivateUser = {
  id: string;
  user: User;
  role: Role;
};

export const DefaultRoleName = 'Observer';
