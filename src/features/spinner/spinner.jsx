import * as React from "react";
import { promiseTrackerHoc } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

const InnerSpinner = props => {
  // tslint:disable-next-line:no-console
  let size = "80";

  return (
    <div class="d-flex mx-auto kt-spinner kt-spinner--sm kt-spinner--brand"></div>
    // <div className="spinner">
    //   <Loader type="Oval" color="#ef5661" height={size} width={size} style={{ margin: "14% 0%" }} />
    // </div>
  );
};

const Spinner = promiseTrackerHoc(InnerSpinner);
export default Spinner;
