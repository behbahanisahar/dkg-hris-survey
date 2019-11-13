import * as React from "react";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
  children?: React.ReactNode;
}

export function DKSpinner({ children, size = "sm", ...other }: IProps) {
  return (
    <div
      className={
        "d-flex mx-auto kt-spinner kt-spinner--" +
        size +
        " kt-spinner--brand h-100 justify-content-center align-items-center"
      }
    >
      {children}
    </div>
  );
}
