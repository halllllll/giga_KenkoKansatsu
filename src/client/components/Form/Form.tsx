import { type FC } from "react";
import { type Actions } from "@/client/reducer/FormReducer";
import { type InquiryItem, type Student } from "@/server/Config/SheetData";
import {
  CandidatesArea,
  FormContent,
  SendButton,
  type FormValues,
} from "../Index";

type FormProps = {
  readonly formStudents: Student[];
  readonly formInquiryItems: InquiryItem | null;
  readonly candidatesState: FormValues[];
  candidateDispatch: React.Dispatch<Actions>;
};

const Form: FC<FormProps> = (props) => {
  const { formStudents, formInquiryItems, candidateDispatch, candidatesState } =
    props;

  return (
    <>
      <FormContent
        students={formStudents}
        inquiryItem={formInquiryItems}
        dispatch={candidateDispatch}
      />
      {candidatesState.length > 0 && (
        <>
          <CandidatesArea
            dispatch={candidateDispatch}
            candidates={candidatesState}
          />
          <SendButton
            dispatch={candidateDispatch}
            formValues={candidatesState}
          />
        </>
      )}
    </>
  );
};

export default Form;
