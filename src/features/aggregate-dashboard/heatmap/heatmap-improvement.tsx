import * as React from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function HeataImprovement({ value = "0" }: Props) {
  return (
    <div className="text-center">
      {Number(value) > 0 && (
        <span className="dk-brand-text-green">
          <i className="la la-angle-up ml-2"></i>
          {value} %
        </span>
      )}
      {Number(value) < 0 && (
        <span className="dk-brand-text-red">
          <i className="la la-angle-down ml-2"></i>
          {value} %
        </span>
      )}
      {value == "-" && <span className="dk-brand-text">{value}</span>}
    </div>
  );
}
