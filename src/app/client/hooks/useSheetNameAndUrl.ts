import { useState, useEffect } from "react";
import { SheetNameAPI, SheetUrlAPI } from "@/app/client/API/getSheetInfo";

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
        SheetNameAPI(),
        SheetUrlAPI(),
      ]);
      console.log(`get spread sheet title: ${spreadsheettitle ?? "(null)"}`);
      setSheetName(spreadsheettitle);
      setSheetUrl(spreadsheetUrl);
    };
    void knock();
  }, []);

  return { sheetName, sheetUrl };
};
