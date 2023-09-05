import { type FC } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { PropagateLoader } from "react-spinners";
import { TDSchema } from "./schemas/TeachersDomainSchema";

interface FormValues {
  domain: string;
}
const formDefaultValues: FormValues = {
  domain: "",
};

const FormRoot: FC = () => {
  const methods = useForm<FormValues>({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(TDSchema),
    defaultValues: formDefaultValues,
  });

  const onSetDomain: SubmitHandler<FormValues> = async () => {
    // TODO: 登録処理

    return await new Promise((resolve) => {
      setTimeout(() => {
        methods.reset();
        resolve("done");
      }, 2000);
    });
  };

  return (
    <>
      {methods.formState.isSubmitting && (
        <Box
          position="fixed"
          zIndex="1000"
          left="0"
          top="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.2)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PropagateLoader
            color="#36d7b7"
            size={20}
            aria-label="Loading Spinner"
            loading={methods.formState.isSubmitting}
          />
        </Box>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSetDomain)}>
          <FormControl
            id="domain"
            isInvalid={!(methods.formState.errors.domain === undefined)}
          >
            <FormLabel htmlFor="domain">ドメイン名</FormLabel>
            <InputGroup size="lg">
              <InputLeftAddon>@</InputLeftAddon>
              <Input
                maxW="md"
                placeholder="awesome.domain.dayo"
                {...methods.register("domain")}
              />
            </InputGroup>
            <FormErrorMessage>
              {methods.formState.errors.domain?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            disabled={
              !methods.formState.isValid || methods.formState.isSubmitting
            }
            isLoading={methods.formState.isSubmitting}
            loadingText="submitting..."
            spinnerPlacement="start"
          >
            GO
          </Button>
        </form>
        {methods.formState.isSubmitSuccessful && <Box>yes</Box>}
      </FormProvider>
    </>
  );
};

export default FormRoot;