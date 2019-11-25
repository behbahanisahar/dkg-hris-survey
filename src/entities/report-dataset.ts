export default interface ReportDataset {
  label: string;
  drilldownData: string;
  backgroundColor: any[];
  borderColor: string;
  hoverBackgroundColor: string;
  hoverBorderColor: string;
  borderWidth: number;
  data: number[];
  items: any;
  lineTension?: number;
  fill?: boolean;
  borderDash?: number[];
}
