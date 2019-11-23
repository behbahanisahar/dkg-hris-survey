import * as React from "react";
import { Grid } from "@material-ui/core";
import RatersTable from "../raters-table/raters-table";
import ComparingChart from "../comparing-chart/comparing-chart";
import DKValueRadarChart from "../dk-value-radar-chart/dk-value-radar-chart";
import ResponsiveBulletClass from "../competency-summary-category-detail/competency-category";
import Comments from "../comments/comments";
import IndexReport from "../index";

import DashboardHeader from "../dashboard-header/dashboard-header";

interface IProps {
  match: any;
  name?: string;
}

const MainDashboard: React.SFC<IProps> = props => {
  const itemId = props.match.params.itemId;
  return (
    <div className="rtl">
      <DashboardHeader />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          {/* <DashboardIntro></DashboardIntro> */}
        </Grid>
        <Grid item xs={4}>
          <RatersTable itemId={itemId} />
        </Grid>
        <Grid item xs={8}>
          <ResponsiveBulletClass itemId={itemId} />
        </Grid>
        <Grid item xs={8}>
          <IndexReport itemId={itemId} />
        </Grid>
        <Grid item xs={4}>
          <DKValueRadarChart itemId={itemId} />
        </Grid>
        <Grid item xs={12}>
          <ComparingChart itemId={itemId} />
        </Grid>
        <Grid item xs={12}>
          <Comments itemId={itemId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainDashboard;

// export default class MainDashboard extends React.Component<{}> {
//   public render() {
//     return (
//       <div className="rtl">
//         <Grid container spacing={3}>
//           <Grid item xs={4}>
//             <ResponsiveBulletClass />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <RatersTable />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <DKValueRadarChart />>
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <ComparingChart />>
//           </Grid>
//           <Grid item xs={12} sm={12}>
//             <Comments />
//           </Grid>
//         </Grid>
//       </div>
//     );
//   }
// }
