import NoContentImage from "../../../../assets/img/no-content.png";
import * as React from "react";
import "./no-content.css";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  language?: string;
  showPicture?: boolean;
}

export function NoContent({ language = "fa", showPicture = true }: Props) {
  return (
    <div className="no-content-row">
      {language === "en" && <b> Nothing to Display</b>}
      {language === "fa" && <b> موردی برای نمایش وجود ندارد</b>}
      {showPicture && <img alt="no-content" src={NoContentImage}></img>}
    </div>
  );
}
