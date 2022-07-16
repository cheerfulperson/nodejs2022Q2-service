export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassowrd: string; // previous password
  newPassword: string; // new password
}

export interface UsersResponse {
  items: Omit<User, 'password'>[];
  limit: number;
  offset: number;
  total: number;
}
