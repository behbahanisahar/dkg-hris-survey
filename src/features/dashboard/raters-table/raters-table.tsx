import * as React from "react";
import { DKPortlet } from "../../../core/components/portlet/portlet";
interface IProps {
  name?: string;
}
const RatersTable: React.SFC<IProps> = props => {
  return (
    <DKPortlet title="سلام">
      <div>Your feedback report is based on evaluations gathered from the following rater categories</div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Rater Group</th>
            <th># Nominated</th>
            <th># Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>3</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </DKPortlet>
  );
};
RatersTable.defaultProps = {
  name: "Guest User",
};

export default RatersTable;
