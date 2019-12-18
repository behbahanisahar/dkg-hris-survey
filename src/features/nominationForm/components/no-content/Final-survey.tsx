import NoContentImage from "../../../../assets/img/no-content.png";
import * as React from "react";
import "./no-content.css";
export function Final() {
  return (
    <div className="no-content-row">
      <b> مهلت شرکت در نظر سنجی به اتمام رسیده است.</b>
      <img src={NoContentImage}></img>
    </div>
  );
}
