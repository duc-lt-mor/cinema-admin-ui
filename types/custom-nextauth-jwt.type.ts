import { JWT } from "next-auth/jwt";
import { TTokens } from "./tokens.type";

export type TCustomNextAuthJwt = JWT & TTokens;
