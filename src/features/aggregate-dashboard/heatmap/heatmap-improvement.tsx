import * as React from "react";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function HeataImprovement({ value = 0 }: Props) {
  return (
    <div className="text-center">
      {value > 0 && (
        <span className="dk-brand-text-green">
          <i className="la la-angle-up ml-2"></i>
          {value} %
        </span>
      )}
      {value < 0 && (
        <span className="dk-brand-text-red">
          <i className="la la-angle-down ml-2"></i>
          {value} %
        </span>
      )}
    </div>
  );
}
