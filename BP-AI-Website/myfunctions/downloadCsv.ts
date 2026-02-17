export default function downloadCsv(csv_string: string, filename: string) {
  const blob = new Blob([csv_string], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
