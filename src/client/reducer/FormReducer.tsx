import { type FormValues } from "@/client/components/Index";

export type Actions =
  | {
      type: "DELETE";
      payload: {
        index: number;
      };
    }
  | {
      type: "ADD";
      payload: FormValues;
    }
  | {
      type: "SUBMIT_START";
      // TODO: something
      processing: boolean;
    }
  | {
      type: "SUBMIT_SUCCESS";
      // TODO: something
      processing: boolean;
    }
  | {
      type: "SUBMIT_FAILURE";
      // TODO: something
      processing: boolean;
    };

export const FormReducer = (
  curData: FormValues[],
  action: Actions
): FormValues[] => {
  switch (action.type) {
    case "DELETE": {
      const newData: FormValues[] = curData.filter(
        (o, index) => action.payload.index !== index
      );

      return newData;
    }
    case "ADD": {
      const addData: FormValues = {
        registerDate: action.payload.registerDate,
        grade: action.payload.grade,
        className: action.payload.className,
        classNumber: action.payload.classNumber,
        name: action.payload.name,
        attendance: action.payload.attendance,
        condition: action.payload.condition,
        status: action.payload.status,
      };

      return [...curData, addData];
    }
    case "SUBMIT_START": {
      // TODO: somethiing
      return curData;
    }
    case "SUBMIT_SUCCESS": {
      // TODO: something
      return curData;
    }
    case "SUBMIT_FAILURE": {
      // TODO: something
      return curData;
    }
    default:
      return curData;
  }
};
