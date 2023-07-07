import { type FormValues } from "@/client/components/Form/form-select-data";

export type CandidateAction =
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
      type: "RESET";
    };

export const CandidateReducer = (
  curData: FormValues[],
  action: CandidateAction
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
    case "RESET": {
      return [];
    }

    default:
      return curData;
  }
};
