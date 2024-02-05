import { Session } from "next-auth";
import { TUser } from "./user.type";

export type TSessionWithUserDetails = Session & {
  userDetails: TUser;
};
