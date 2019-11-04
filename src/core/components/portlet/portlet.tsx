import * as React from "react";
import "./portlet.css";

export interface DKPortletProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  noborder?: boolean;
  children?: React.ReactNode;
}

export function DKPortlet({ children, noborder = false, title = "", ...other }: DKPortletProps) {
  return (
    <div
      className={"dk-portlet kt-portlet__head--noborder " + (noborder ? "kt-portlet__head--noborder" : "")}
      {...other}
    >
      <div className={"dk-dk-portlet__head " + (noborder ? "kt-portlet__head--noborder" : "")}>
        <div className="dk-portlet__head-label">
          <h3 className="dk-portlet__head-title">{title}</h3>
        </div>
      </div>
      <div className="dk-portlet__body">{children}</div>         
    </div>
  );
}
