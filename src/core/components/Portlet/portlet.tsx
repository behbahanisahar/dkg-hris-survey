import * as React from "react";
import "./portlet.css";

export interface DKPortletProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function DKPortlet({ children, title = "", ...other }: DKPortletProps) {
  return (
    <div className="dk-portlet" {...other}>
      <div className="dk-portlet__head">
        <div className="dk-portlet__head-label">
          <h3 className="dk-portlet__head-title">{title}</h3>
        </div>
      </div>
      <div className="dk-portlet__body">{children}</div>         
    </div>
  );
}
