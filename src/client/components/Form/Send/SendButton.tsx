import { type FC } from "react";
import { Center, Box, Button, useDisclosure } from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ScreenSpinner } from "@/client/components/Index";
import { type FormValues } from "@/client/components/Index";
import { type Actions } from "@/client/reducer/FormReducer";
import { serverFunctions } from "@/client/API/serverFunctions";

type SendFormProps = {
  dispatch: React.Dispatch<Actions>;
  formValues: FormValues[];
};

const SendButton: FC<SendFormProps> = ({ formValues, dispatch }) => {
  const { onClose } = useDisclosure();

  const {
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({});

  const onPostSubmit: SubmitHandler<FormValues> = async () => {
    console.log(`post -> `);
    console.dir(formValues);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // dispatchでは非同期処理をさせず、ハンドラで行う（dispatchには処理の開始と終了を伝える）
    dispatch({
      type: "SUBMIT_START",
      processing: isSubmitting,
    });
    // TODO: useEffect
    const result = await serverFunctions.postFormValues(
      JSON.stringify(formValues)
    );
    if (result) {
      console.log("ok~!");
      dispatch({
        type: "SUBMIT_SUCCESS",
        processing: isSubmitting,
      });
    } else {
      console.log("omg...");
      dispatch({
        type: "SUBMIT_FAILURE",
        processing: isSubmitting,
      });
    }
  };

  return (
    <Box mt="10">
      <ScreenSpinner onClose={onClose} isOpen={isSubmitting} />
      <Box h="maxContent">
        <form onSubmit={handleSubmit(onPostSubmit)}>
          <Center h="100%">
            <Button
              colorScheme="teal"
              variant="solid"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              loadingText="送信中..."
              spinnerPlacement="start"
            >
              送信する
            </Button>
          </Center>
        </form>
      </Box>
    </Box>
  );
};

export default SendButton;
