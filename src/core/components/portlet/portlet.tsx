import * as React from "react";
import "./portlet.css";

export interface DKPortletProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  noborder?: boolean;
  children?: React.ReactNode;
  hasHeader?: boolean;
}

export function DKPortlet({ children, hasHeader = true, noborder = false, title = "", ...other }: DKPortletProps) {
  return (
    <div className={"kt-portlet kt-portlet--height-fluid " + (noborder ? "kt-portlet__head--noborder" : "")} {...other}>
      {hasHeader && (
        <div className={"kt-portlet__head " + (noborder ? "kt-portlet__head--noborder" : "")}>
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">{title}</h3>
          </div>
        </div>
      )}
      <div className="kt-portlet__body">{children}</div>
    </div>
  );
}
