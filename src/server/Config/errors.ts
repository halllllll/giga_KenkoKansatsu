export class RegisterError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "RegisterError";
  }
}
export class InvalidSheetError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InvalidSheetError";
  }
}
