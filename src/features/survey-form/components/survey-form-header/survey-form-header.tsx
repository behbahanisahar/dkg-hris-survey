import * as React from "react";
import SubOrdinate from "../../../../entities/subOrdinate";
import "./survey-form-header.css";
export interface SurveyFormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: SubOrdinate;
}

export function SurveyFormHeader({ user, ...other }: SurveyFormHeaderProps) {
  return (
    <div className="card-header">
      <div className="content">
        <p className="user">
          <div className="page-header">فرم ارزیابی </div>
          <div className="user-name">{user!.Title}</div>
          <h6>
            {user!.EmailAddress} | {user!.Department} | {user!.ReportedPost}
          </h6>
        </p>
      </div>
    </div>
  );
}
