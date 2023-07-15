import { type FC } from "react";
import {
  FormControl,
  Grid,
  GridItem,
  VStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const DateField: FC = () => {
  const methods = useFormContext();

  return (
    <FormControl
      my="5"
      id="registerDate"
      isInvalid={!(methods.formState.errors.registerDate?.message == null)}
    >
      <Grid gap={12} templateColumns="repeat(4, 1fr)">
        <GridItem>
          <VStack align="start">
            <FormLabel>日付</FormLabel>
            <Input
              size="lg"
              variant="flushed"
              {...methods.register("registerDate")}
              type="date"
            />
            {(methods.formState.errors.registerDate?.message !== null && (
              <FormErrorMessage>日付を選んでね</FormErrorMessage>
            )) ?? <> </>}
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="start">
            <FormLabel htmlFor="endDate">期間を設定する</FormLabel>
            <Switch
              id="endDate"
              colorScheme="cyan"
              size="lg"
              onChange={(event) => {
                console.log(event.target.checked);
              }}
            />
          </VStack>
        </GridItem>
      </Grid>
    </FormControl>
  );
};

export default DateField;
