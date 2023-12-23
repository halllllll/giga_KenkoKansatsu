export type ErrorCode =
  | "InvalidSheetArchtecture"
  | "SheetNotFound"
  | "Register";

export type GASError = {
  code: ErrorCode;
  name?: string;
  message: string;
  options?: ErrorOptions;
};

interface ErrorOptions {
  cause?: Error;
  details?: unknown;
}

export const errorMapper = (gasError: GASError): Error => {
  switch (gasError.code) {
    case "InvalidSheetArchtecture":
      return new InvalidSheetArchtectureError(
        gasError.message,
        gasError.options
      );
    case "SheetNotFound":
      return new SheetNotFoundError(gasError.message, gasError.options);
    case "Register":
      return new RegisterError(gasError.message, gasError.options);
    default:
      return new Error("undefined code");
  }
};

export class RegisterError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "RegisterError";
  }
}
export class InvalidSheetArchtectureError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "InvalidSheetArchtectureError";
  }
}

export class SheetNotFoundError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "NothingFormSheetError";
  }
}
