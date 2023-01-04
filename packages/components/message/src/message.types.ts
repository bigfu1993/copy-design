type IType = "success" | "warning" | "info" | "error";

export interface IMessageOptions {
  id?: string;
  message?: string;
  type?: IType;
  duration?: number;
  closed?: () => void;
  offset?: number;
}

export type iMessageParams = string | IMessageOptions;
