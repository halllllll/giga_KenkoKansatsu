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
    default:
      return curData;
  }
};
