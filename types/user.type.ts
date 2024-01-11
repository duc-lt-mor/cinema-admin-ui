import { UserRole } from "@/constants/user-role.constant";

export type TUser = {
  id: string;
  email: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
};
