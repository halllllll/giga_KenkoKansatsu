import { type FC } from "react";
import { Center, Box, Button, useDisclosure } from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ScreenSpinner } from "@/client/components/Index";
import { type FormValues } from "@/client/components/Index";
import { type Actions } from "@/client/reducer/FormReducer";
import { type postDataResult } from "@/server/API/Post";
import { postFormValueDataAPI } from "@/client/API/postData";

type SendFormProps = {
  dispatch: React.Dispatch<Actions>;
  formValues: FormValues[];
};

const SendButton: FC<SendFormProps> = ({ formValues }) => {
  const { onClose } = useDisclosure();

  const {
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({});

  const onPostSubmit: SubmitHandler<FormValues> = async () => {
    console.log(`post -> `);
    console.dir(formValues);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const result = await Promise.race<postDataResult>([
      new Promise((resolve, _reject) =>
        setTimeout(() => {
          const ret: postDataResult = {
            status: "error",
          };
          resolve(ret);
        }, 5000)
      ),
      await postFormValueDataAPI(formValues),
    ]);
    switch (result.status) {
      case "success": {
        reset();
        break;
      }
      case "error": {
        // TODO: view
        console.error(result.error);
        break;
      }
    }
    console.log(`result ... ${JSON.stringify(result)}`);
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
