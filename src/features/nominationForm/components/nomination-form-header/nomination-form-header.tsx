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
          <strong>{user!.Title}</strong>
          <h6>
            {user!.EmailAddress} | {user!.Department} | {user!.JobGrade}
          </h6>
        </p>
        <div className="page-header">Nomination Form</div>
      </div>
    </div>
  );
}
