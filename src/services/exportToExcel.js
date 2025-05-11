import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { formatDate } from "./format";

export function exportTasksToExcel(tasks) {
  const data = tasks.map((task, index) => ({
    "S.No": index + 1,
    Title: task.title,
    Description: task.description,
    Priority: task.priority,
    "Start Date": formatDate(task.createdAt),
    "Due Date": formatDate(task.dueDate),
    Assignees: task.assignTo?.map((a) => a.email).join(", "),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(fileBlob, "My_Tasks_Report.xlsx");
}
