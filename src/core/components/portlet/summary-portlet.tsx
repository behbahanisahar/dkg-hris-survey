import * as React from "react";
import "./summary-portlet.css";

export interface DKPortletSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
  background: string;
  PortletBackground?: string;
}

export function DKPortletSummary({
  children,
  title = "",
  PortletBackground = "",
  background = "",
  ...other
}: DKPortletSummaryProps) {
  return (
    <div
      style={{ backgroundColor: PortletBackground }}
      className=" summary-height   kt-iconbox--animate-slower kt-iconbox--brand    kt-portlet kt-portlet--fit kt-portlet--head-lg kt-portlet--head-overlay kt-portlet--skin-solid kt-portlet--height-fluid"
    >
      <div className="kt-portlet__head kt-portlet__head--noborder kt-portlet__space-x">
        <div className="header">{title}</div>
      </div>
      <div className="kt-portlet__body kt-portlet__body--fit">
        <div className="kt-widget17">
          <div
            className="kt-widget17__visual kt-widget17__visual--chart kt-portlet-fit--top kt-portlet-fit--sides"
            style={{ backgroundColor: background }}
          >
            <div className="kt-widget17__chart"></div>
          </div>
          <div className="kt-widget17__stats">{children}</div>
        </div>
      </div>
    </div>
  );
}
