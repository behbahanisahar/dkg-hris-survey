import * as React from "react";
import { HeataMapRuler } from "./heatmap-ruler";

export function HeataMapLegend() {
  return (
    <div className="legend-container">
      <div className="row mx-5 legend py-1">
        <div className="col-6">
          <div className="row">
            <div className="col-6 averageBackground1 grow">Clear Development Need</div>
            <div className="col-6 averageBackground2 grow">Development Need</div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6 averageBackground3 grow">Average</div>
            <div className="col-3 averageBackground4 grow">Strong</div>
            <div className="col-3 averageBackground5 grow">Expert</div>
          </div>
        </div>
      </div>
      <HeataMapRuler></HeataMapRuler>
    </div>
  );
}
