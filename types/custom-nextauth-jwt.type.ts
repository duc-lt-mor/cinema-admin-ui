import { JWT } from "next-auth/jwt";
import { TUser } from "./user.type";

export type TCustomNextAuthJwt = JWT & { user: TUser };
