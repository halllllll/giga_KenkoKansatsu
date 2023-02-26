import { serverFunctions } from "../App";
import { type FormValues } from "../components/Form/Form";

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
      type: "POST";
      payload: FormValues[];
      isSubmitting: boolean;
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
    case "POST": {
      const result = serverFunctions.postFormValues(JSON.stringify(curData));
      let ret: FormValues[] = [];
      result
        .then((res) => {
          console.log(`result: `, res);
        })
        .catch((err) => {
          console.error(err);
          ret = curData;
        });

      return ret;
    }
    default:
      return curData;
  }
};
