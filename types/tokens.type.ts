import { TUser } from "./user.type";

export type TTokens = Pick<TUser, "accessToken" | "refreshToken">;
