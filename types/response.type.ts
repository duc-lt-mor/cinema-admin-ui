import { EResponseType } from "@/constants/response-type.constant";

export type TResponseSuccess<TData> = {
  type: EResponseType.SUCCESS;
  statusCode: number;
  data: TData;
};

export type TResponseError = {
  type: EResponseType.ERROR;
  statusCode: number;
  detail: string | object;
  method: string;
  path: string;
};

export type TResponse<TData = any> = TResponseSuccess<TData> | TResponseError;
