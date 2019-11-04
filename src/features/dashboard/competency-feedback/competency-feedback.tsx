import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
interface IProps {
  name?: string;
}

const CompetencyFeedback: React.SFC<IProps> = props => {
  return <DKPortlet title="Comparing Chart"></DKPortlet>;
};

export default CompetencyFeedback;
