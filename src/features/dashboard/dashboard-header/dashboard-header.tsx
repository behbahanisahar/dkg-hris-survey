import * as React from "react";

import pic from "../../../assets/img/DefaultAvatar.png";
import { DKPortlet } from "../../../core/components/portlet/portlet";
import "./dashboard-header.css";

interface IProps {}
interface IState {}

export default class DashboardHeader extends React.Component<IProps, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      isFetching: true,
      data: [],
    };
  }
  public async componentDidMount() {}
  public render() {
    return (
      <>
        <DKPortlet hasHeader={false}>
          <div className="kt-widget__media kt-hidden-">
            <img className="avatar-size" src={pic} alt="image"></img>
          </div>
          <div className="kt-widget__content">
            <div className="kt-widget__head">
              <a href="#" className="dk-username">
                Sahar Behbahani
              </a>
            </div>

            <div className="kt-widget__subhead">
              <a href="#">
                <i className="flaticon2-new-email"></i> sa.behbahani@digikala.com |
              </a>
              <a href="#">
                <i className="flaticon2-calendar-3"></i> Sharepoint Developer{" | "}
              </a>
              <a href="#">
                <i className="flaticon2-placeholder"></i> Gandi
              </a>
            </div>
          </div>
        </DKPortlet>
      </>
    );
  }
}
