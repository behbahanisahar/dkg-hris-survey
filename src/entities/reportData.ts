import ReportDataset from "./report-dataset";

export default interface ReportStructure {
  AverageValue?: number;
  Labels: string[];
  Datasets: ReportDataset[];
}
