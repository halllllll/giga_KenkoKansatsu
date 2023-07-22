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
import { addDays, format } from "date-fns";

import ja from "date-fns/locale/ja";
import { useFormContext } from "react-hook-form";

const DateField: FC = () => {
  const methods = useFormContext();
  // 期間
  const [haveTerm, setHaveTerm] = useState<boolean>(false);
  useEffect(() => {
    if (haveTerm) {
      // 日付+1をデフォ値に
      const curDay = new Date(methods.getValues("registerDate") as Date); // なんかnew Dateしないと駄目
      const initDay = addDays(curDay, 1);
      const endDay = format(initDay, "yyyy-MM-dd", { locale: ja });
      methods.setValue("registerEndToDate", endDay);
    } else {
      methods.setValue("registerEndToDate", undefined);
    }
    // methodsを依存配列に追加すると親コンポーネントでの関数の参照が変更されたときにも再レンダリングが走るのでとりあえず回避
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveTerm]);

  return (
    <Box my="5">
      <Grid gap={6} templateColumns={["1fr", "1fr 2fr 2fr"]}>
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
                    methods.setValue("registerEndToDate", event.target.value);
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
