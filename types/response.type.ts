export type TResponseSuccess<TData> = {
  type: "success";
  statusCode: number;
  data: TData;
};

export type TResponseError = {
  type: "error";
  statusCode: number;
  detail: string | object;
  method: string;
  path: string;
};

export type TResponse<TData = any> = TResponseSuccess<TData> | TResponseError;
