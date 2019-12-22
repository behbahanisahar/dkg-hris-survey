import NoContentImage from "../../../../assets/img/no-content.png";
import * as React from "react";
import "./no-content.css";
export function NoContent() {
  return (
    <div className="no-content-row">
      <b> موردی برای نمایش وجود ندارد</b>
      <img alt="no-content" src={NoContentImage}></img>
    </div>
  );
}
