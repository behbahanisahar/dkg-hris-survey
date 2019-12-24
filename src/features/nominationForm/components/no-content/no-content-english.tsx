import NoContentImage from "../../../../assets/img/no-content.png";
import * as React from "react";
import "./no-content.css";
export function NoContentEnglish() {
  return (
    <div className="no-content-row">
      <b> Nothing to Display.</b>
      <img alt="no-content" src={NoContentImage}></img>
    </div>
  );
}
