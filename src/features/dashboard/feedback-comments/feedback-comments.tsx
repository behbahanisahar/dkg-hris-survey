import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
interface IProps {
  match: any;
  name?: string;
}
const FeedbackComments: React.SFC<IProps> = props => {
  return <DKPortlet title="FeedbackComments"></DKPortlet>;
};

export default FeedbackComments;
