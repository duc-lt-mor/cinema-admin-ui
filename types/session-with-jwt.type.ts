import { Session } from "next-auth";
import { TTokens } from "./tokens.type";

export type TSessionWithJwt = Session & { tokens: TTokens };
