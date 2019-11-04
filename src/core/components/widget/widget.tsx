import * as React from "react";
import "./portlet.css";

export interface DKPortletProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function DKWidget({ children, title = "", description = "", ...other }: DKPortletProps) {
  return (
    <div className="kt-portlet kt-portlet--height-fluid">
      <div className="kt-widget14">
        <div className="kt-widget14__header kt-margin-b-30">
          <h3 className="kt-widget14__title">{title}</h3>
          <span className="kt-widget14__desc">{description}</span>
        </div>
        <div className="kt-widget14__chart">{children}</div>
      </div>
    </div>
  );
}
