import { type FC, useState } from "react";
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
  // TODO: 期間
  const [haveTerm, setHaveTerm] = useState<boolean>(false);

  return (
    <FormControl
      my="5"
      id="registerDate"
      isInvalid={!(methods.formState.errors.registerDate?.message == null)}
    >
      <Grid gap={6} templateColumns={["1fr 2fr 2fr"]}>
        <GridItem>
          <VStack align="flex-start">
            <FormLabel htmlFor="endDate">期間</FormLabel>
            <Switch
              id="endDate"
              colorScheme="cyan"
              size="lg"
              onChange={(event) => {
                console.log(event.target.checked);
                setHaveTerm(event.target.checked);
              }}
            />
          </VStack>
        </GridItem>
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
        {haveTerm && (
          <GridItem>
            <VStack align="start">
              <FormLabel>この日まで</FormLabel>
              <Input
                size="lg"
                variant="flushed"
                {...methods.register("registerEndToDate")}
                type="date"
              />
              {(methods.formState.errors.registerDate?.message !== null && (
                <FormErrorMessage>日付を選んでね</FormErrorMessage>
              )) ?? <> </>}
            </VStack>
          </GridItem>
        )}
      </Grid>
    </FormControl>
  );
};

export default DateField;
