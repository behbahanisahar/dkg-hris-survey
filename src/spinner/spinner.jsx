import * as React from 'react';
import { promiseTrackerHoc } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

const InnerSpinner = (props) => {
  // tslint:disable-next-line:no-console
  let size = "80";
  let spinnerType = "Oval";
  if (props.Type !== null) {
    spinnerType = props.Type;
  }
  if (props.height !== null) {
    size = props.height;
  }
  return (<div className="spinner">
    <Loader
       type="Oval"
      //type={spinnerType}
      color="#ef5661"
      height={size}
      width={size}
      style={{margin: "14% 0%"}}
    />
  </div>);
}

const Spinner = promiseTrackerHoc(InnerSpinner);
export default Spinner;