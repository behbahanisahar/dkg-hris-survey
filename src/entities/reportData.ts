import ReportDataset from "./report-dataset";

export default interface ReportStructure {
  averageValue?: number;
  labels: string[];
  datasets: ReportDataset[];
}
