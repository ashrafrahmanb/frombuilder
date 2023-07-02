import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import TButton from "./core/TButton";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <TButton color="indigo" onClick={(e) => exportToExcel(apiData, fileName)}>
      <ArrowDownCircleIcon className="h-4 w-4 mr-2" />
      Export To Excel
    </TButton>
  );
};
