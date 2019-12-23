import * as React from "react";
import { HeataMapRuler } from "./heatmap-ruler";

export function HeataMapLegend() {
  return (
    <div>
      <div className="row mx-5 legend py-3">
        <div className="col-6">
          <div className="row">
            <div className="col-6 averageBackground1">Clear Development Nees</div>
            <div className="col-6 averageBackground2">Development Need</div>
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6 averageBackground3">Average</div>
            <div className="col-3 averageBackground4">Strong</div>
            <div className="col-3 averageBackground5">Expert</div>
          </div>
        </div>
      </div>
      <HeataMapRuler></HeataMapRuler>
    </div>
  );
}
