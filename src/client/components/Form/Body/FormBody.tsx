// import { type FC } from "react";
// import {
//   HStack,
//   FormControl,
//   FormLabel,
//   Input,
//   FormErrorMessage,
//   VStack,
//   Textarea,
//   Box,
//   ButtonGroup,
//   Button,
// } from "@chakra-ui/react";
// import { type InquiryItem, type Student } from "@/server/Config/SheetData";
// import ControlledSelect from "../controlled-select";
// import {
//   type FormValues,
//   type Grade,
//   type ClassName,
//   type Name,
//   type Attendance,
//   type Condition,
// } from "../form-select-data";
// import { useOptionsOfForm } from "../hooks/useOptionsOfForm";

// type FormBodyProps = {
//   students: Student[];
//   inquiryItem: InquiryItem;
// };

// const FormBody: FC<FormBodyProps> = ({ students, inquiryItem }) => {
//   // useOptionsOfFormに必要なstudentとinquiryはuseContextで管理しているからpropsで受け取る必要はないのだが、どうなるかわからんのでいちおう外部からpropsで受け入れるようにしておく（今後の展開によっては不要）
//   const {
//     setGrade,
//     setClassName,
//     setName,
//     gradeOptions,
//     classNameOptions,
//     attendanceOptions,
//     conditionOptions,
//   } = useOptionsOfForm({
//     students,
//     inquiryItem,
//   });

//   // useForm関連（送信以外（送信はuseFormを使わない。useFormは登録用のバリデーションで使用））

//   return (
//     <form onSubmit={handleSubmit(onAdd)}>
//       <HStack>
//         <Box width="max-content">
//           <FormControl
//             // my="5"
//             id="registerDate"
//             isInvalid={!(errors.registerDate?.message == null)}
//           >
//             <FormLabel>日付</FormLabel>
//             <Input
//               size="lg"
//               variant="flushed"
//               {...register("registerDate")}
//               type="date"
//             />
//             {(errors.registerDate?.message !== null && (
//               <FormErrorMessage>日付を選んでね</FormErrorMessage>
//             )) ?? <> </>}
//           </FormControl>
//         </Box>
//       </HStack>
//       <VStack>
//         <HStack width="full">
//           <ControlledSelect<FormValues, Grade, false>
//             name="grade"
//             id="grade"
//             control={control}
//             label="学年"
//             placeholder="学年を選ぼう！"
//             options={gradeOptions}
//             value={gradeOptions}
//             rules={{
//               onChange: () => {
//                 setGrade(getValues().grade);
//               },
//             }}
//           />
//           <ControlledSelect<FormValues, ClassName, false>
//             name="className"
//             id="className"
//             control={control}
//             label="クラス"
//             placeholder="クラスを選ぼう！"
//             options={classNameOptions}
//             value={classNameOptions}
//             rules={{
//               onChange: () => {
//                 setClassName(getValues().className);
//               },
//             }}
//           />
//         </HStack>
//         <ControlledSelect<FormValues, Name, false>
//           name="name"
//           id="name"
//           control={control}
//           label="名前"
//           placeholder="名前を検索しよう！"
//           options={nameOptions}
//           value={nameOptions}
//           rules={{
//             onChange: () => {
//               setName(getValues().name);
//             },
//           }}
//           formatOptionLabel={(option: Name) => {
//             return (
//               <Box style={{ display: "flex" }}>
//                 <Box>{option.label}</Box>
//                 <Box style={{ marginLeft: "10px", color: "#999" }}>
//                   {option.kana}
//                 </Box>
//               </Box>
//             );
//           }}
//           getOptionLabel={(option: Name) =>
//             option.label + option.kana + option.value
//           }
//           chakraStyles={{
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//             dropdownIndicator: (provided: any) => ({
//               ...provided,
//               bg: "transparent",
//               px: 2,
//               cursor: "inherit",
//             }),
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//             indicatorSeparator: (provided: any) => ({
//               ...provided,
//               display: "none",
//             }),
//           }}
//         />
//         <HStack width="full">
//           <Box minWidth="3xs">
//             <ControlledSelect<FormValues, Attendance, false>
//               name="attendance"
//               id="attendance"
//               control={control}
//               label="出欠・遅刻"
//               placeholder="どうしたの？"
//               options={attendanceOptions}
//             />
//           </Box>
//           <ControlledSelect<FormValues, Condition, true>
//             isMulti
//             name="condition"
//             id="condition"
//             control={control}
//             label="症状・理由"
//             placeholder="なんでかな？（複数可）"
//             options={conditionOptions}
//           />
//         </HStack>
//       </VStack>
//       <FormControl id="status" isInvalid={!(errors.status?.message == null)}>
//         <FormLabel>備考</FormLabel>
//         <Textarea
//           maxHeight={200}
//           placeholder="備考があれば書いてね"
//           {...register("status")}
//         />
//       </FormControl>
//       <HStack alignItems="center" justifyContent="center">
//         <ButtonGroup mt="5" w="xs" gap="4">
//           <Button
//             w="30%"
//             colorScheme="orange"
//             variant="solid"
//             onClick={onReset}
//             disabled={isAdding}
//           >
//             リセット
//           </Button>
//           <Button
//             w="70%"
//             colorScheme="blue"
//             variant="solid"
//             type="submit"
//             disabled={isAdding}
//             isLoading={isAdding}
//             loadingText="登録中"
//             spinnerPlacement="start"
//           >
//             登録
//           </Button>
//         </ButtonGroup>
//       </HStack>
//     </form>
//   );
// };

// export default FormBody;
