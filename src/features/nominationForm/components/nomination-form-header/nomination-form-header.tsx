import * as React from "react";
import "./nomination-form-header.css";
import SubOrdinate from "../../../../entities/subOrdinate";

export interface NominationFormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: SubOrdinate;
}

export function NominationFormHeader({ user, ...other }: NominationFormHeaderProps) {
  return (
    <div className="card-header mt-2">
      <div className="content">
        <p className="user">
          <div className="page-header">فرم انتخاب ارزیابی کنندگان</div>
          <h4 className="page-header">{user!.Title}</h4>
          <h6>
            {user!.EmailAddress} | {user!.Department} | {user!.ReportedPost}
          </h6>
        </p>
      </div>
    </div>
  );
}
