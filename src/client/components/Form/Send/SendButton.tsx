import { type FC } from "react";
import { Center, Box, Button, useDisclosure } from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Actions } from "@/client/reducer/FormReducer";
import { ScreenSpinner } from "@/client/components/Index";
import { type FormValues } from "@/client/components/Index";

type SendFormProps = {
  dispatch: React.Dispatch<Actions>;
  formValues: FormValues[];
};

const SendButton: FC<SendFormProps> = ({ formValues, dispatch }) => {
  const { onClose } = useDisclosure();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({});

  const onPostSubmit: SubmitHandler<FormValues> = async () => {
    console.log(formValues);
    console.log("dispatch POST するぜ！");

    // dispatchでPromiseをいい感じにする方法がわからない
    // とりあえずスピナー優先で、まったく不要だけどsetTimeoutしとく
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({
          type: "POST",
          payload: formValues,
          isSubmitting,
        });
        resolve("DONE");
      }, 1500);
    });

    /** POSTを想定 */
    /*
    return await new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(formValues, null, 2));
        resolve(formValues);
      }, 1500);
    });
    */
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
