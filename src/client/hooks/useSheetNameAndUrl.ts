import { useState, useEffect } from "react";
import { serverFunctions } from "@/client/App";

type sheetNameAndUrlResult = {
  sheetName: string;
  sheetUrl: string;
};

export const useSheetNameAndUrl = (): sheetNameAndUrlResult => {
  const [sheetName, setSheetName] = useState<string>(document.title);
  const [sheetUrl, setSheetUrl] = useState<string>("");

  useEffect(() => {
    const knock = async () => {
      const [spreadsheettitle, spreadsheetUrl] = await Promise.all([
        serverFunctions.getSpreadSheetName(),
        serverFunctions.getSpreadSheetUrl(),
      ]);
      console.log(`get spread sheet title: ${spreadsheettitle ?? "(null)"}`);
      setSheetName(spreadsheettitle);
      setSheetUrl(spreadsheetUrl);
    };
    void knock();
  }, []);

  return { sheetName, sheetUrl };
};
