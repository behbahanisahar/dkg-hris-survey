import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
interface IProps {
  name?: string;
}
const CompetencySummary: React.SFC<IProps> = props => {
  return <DKPortlet title="Competency Summary"></DKPortlet>;
};

export default CompetencySummary;
