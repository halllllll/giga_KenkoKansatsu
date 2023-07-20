import { type FC, useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  GridItem,
  VStack,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
  Box,
} from "@chakra-ui/react";
import { addDays } from "date-fns";

import { useFormContext } from "react-hook-form";

const DateField: FC = () => {
  const methods = useFormContext();
  // TODO: 期間
  const [haveTerm, setHaveTerm] = useState<boolean>(false);

  useEffect(() => {
    if (haveTerm) {
      // TODO:
      // 日付+1をデフォ値に
      const curDay = new Date(methods.getValues("registerDate") as Date);
      console.log(`セット ->  ${curDay}`);
      // methods.setValue("registerEndToDate", new Date());
      const initDay = addDays(curDay, 1); // なんかnew Dateしないと駄目
      console.log(`+1 -> ${initDay.toString()}`);
      methods.setValue("registerEndToDate", initDay);
    } else {
      methods.setValue("registerEndToDate", undefined);
    }
  }, [haveTerm, methods]);

  return (
    <Box my="5">
      <Grid gap={6} templateColumns={["1fr 2fr 2fr"]}>
        <GridItem>
          <VStack align="flex-start">
            <FormControl id="endDate">
              <FormLabel htmlFor="endDate">期間</FormLabel>
              <Switch
                colorScheme="cyan"
                size="lg"
                {...methods.register("termSwitch")}
                onChange={(event) => {
                  setHaveTerm(event.target.checked);
                }}
              />
            </FormControl>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align="start">
            <FormControl
              id="registerDateAt"
              isInvalid={!!methods.formState.errors.registerDate}
            >
              <FormLabel htmlFor="registerDateAt">日付</FormLabel>
              <Input
                size="lg"
                variant="flushed"
                {...methods.register("registerDate")}
                type="date"
              />
              {(methods.formState.errors.registerDate !== null && (
                <FormErrorMessage>
                  <>{methods.formState.errors.registerDate?.message}</>
                </FormErrorMessage>
              )) ?? <> </>}
            </FormControl>
          </VStack>
        </GridItem>
        {haveTerm && (
          <GridItem>
            <VStack align="start">
              <FormControl
                id="registerDateEnd"
                isInvalid={!!methods.formState.errors.registerEndToDate}
              >
                <FormLabel htmlFor="registerDateEnd">この日まで</FormLabel>
                <Input
                  size="lg"
                  variant="flushed"
                  {...methods.register("registerEndToDate")}
                  onChange={(event) => {
                    console.log(event.target.value);
                  }}
                  type="date"
                />
                {(methods.formState.errors.registerEndToDate !== null && (
                  <FormErrorMessage>
                    <>{methods.formState.errors.registerEndToDate?.message}</>
                  </FormErrorMessage>
                )) ?? <>{"　"}</>}
              </FormControl>
            </VStack>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default DateField;
