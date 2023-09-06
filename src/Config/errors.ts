export class RegisterError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "RegisterError";
  }
}
export class InvalidSheetArchtectureError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "InvalidSheetArchtectureError";
  }
}

export class NothingFormSheetError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "NothingFormSheetError";
  }
}
