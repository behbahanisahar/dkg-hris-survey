import * as React from "react";
import { Grid } from "@material-ui/core";
import RatersTable from "../raters-table/raters-table";
import CompetencySummary from "../competency-summary/competency-summary";
import ComparingChart from "../comparing-chart/comparing-chart";
import DKValueRadarChart from "../dk-value-radar-chart/dk-value-radar-chart";

export default class MainDashboard extends React.Component<{}> {
  public render() {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <CompetencySummary></CompetencySummary>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RatersTable></RatersTable>
          </Grid>
          <Grid item xs={12} sm={4}>
            <DKValueRadarChart></DKValueRadarChart>
          </Grid>
          <Grid item xs={12} sm={12}>
            <ComparingChart></ComparingChart>
          </Grid>
          <Grid item xs={12} sm={12}></Grid>
        </Grid>
      </>
    );
  }
}
