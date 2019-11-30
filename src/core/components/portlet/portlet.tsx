import * as React from "react";
import "./portlet.css";

export interface DKPortletProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  noborder?: boolean;
  headerToolbar?: React.ReactNode;
  children?: React.ReactNode;
  hasHeader?: boolean;
}

export function DKPortlet({
  children,
  headerToolbar,
  hasHeader = true,
  noborder = false,
  title = "",
  ...other
}: DKPortletProps) {
  console.log(headerToolbar);
  return (
    <div className={"kt-portlet kt-portlet--height-fluid " + (noborder ? "kt-portlet__head--noborder" : "")} {...other}>
      {hasHeader && (
        <div className={"kt-portlet__head " + (noborder ? "kt-portlet__head--noborder" : "")}>
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">{title}</h3>
          </div>
          <div className="kt-portlet__head-toolbar"> {headerToolbar}</div>
        </div>
      )}
      <div className="kt-portlet__body">{children}</div>
    </div>
  );
}
