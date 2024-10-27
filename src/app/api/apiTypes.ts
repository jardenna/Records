export type Roles = 'Admin' | 'Employee' | 'Manager';

export interface User {
  id: string;
  username: string;
  active?: boolean;
  password?: string;
  roles?: Roles[];
}

export interface UpdateUserRequest {
  id: string;
  roles: Roles[];
  username: string;
  active?: boolean;
}
export interface CreateUserRequest {
  password: string;
  roles: string[] | Roles[];
  username: string;
  active?: boolean;
}

export interface UserRequest {
  _id: string;
  username: string;
  active?: boolean;
  roles?: Roles[];
}

export interface NotesRequest {
  ticket: number;
  title: string;
  user: string;
}

export interface NotesResponse {
  _id: string;
  completed: boolean;
  createdAt: Date;
  text: string;
  ticket: number;
  title: string;
  updatedAt: Date;
  user: string;
  username: string;
}
