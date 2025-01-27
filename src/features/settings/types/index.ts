export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  isActive: boolean;
};

export type UpdateUserRequest = Pick<
  User,
  "firstName" | "lastName" | "phoneNumber" | "id"
>;
