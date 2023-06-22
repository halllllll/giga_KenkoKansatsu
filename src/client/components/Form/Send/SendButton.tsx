import { type FC } from "react";
import { Center, Box, Button, useDisclosure } from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { serverFunctions } from "@/client/App";
import { ScreenSpinner } from "@/client/components/Index";
import { type FormValues } from "@/client/components/Index";
import { type Actions } from "@/client/reducer/FormReducer";

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

    // dispatchでは非同期処理をさせず、ハンドラで行う（dispatchには処理の開始と終了を伝える）
    dispatch({
      type: "SUBMIT_START",
      processing: isSubmitting,
    });
    const result = await serverFunctions.postFormValues(
      JSON.stringify(formValues)
    );
    if (result) {
      console.log("ok~!");
      dispatch({
        type: "SUBMIT_SUCCESS",
      });
    } else {
      console.log("omg...");
      dispatch({
        type: "SUBMIT_FAILURE",
      });
    }

    // void serverFunctions
    //   .postFormValues(JSON.stringify(formValues))
    //   .then((result) => {
    //     console.log(result);
    //     dispatch({
    //       type: "SUBMIT_SUCCESS",
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     dispatch({
    //       type: "SUBMIT_FAILURE",
    //     });
    //   });

    // dispatchでPromiseをいい感じにする方法がわからない
    // とりあえずスピナー優先で、まったく不要だけどsetTimeoutしとく
    // return await new Promise((resolve, _reject) => {
    //   setTimeout(() => {
    //     dispatch({
    //       type: "POST",
    //       payload: formValues,
    //       isSubmitting,
    //     });
    //     resolve("DONE");
    //   }, 1500);
    // });
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
