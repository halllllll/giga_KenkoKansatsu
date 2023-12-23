import { type GASError } from "@/Config/errors";

export type OperationResult<T> =
  | {
      success: false;
      error: GASError;
    }
  | {
      success: true;
      data: T;
    };
