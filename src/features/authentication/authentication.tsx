import React from "react";
import { IAuthenticationProps } from "./authentication-props";
import AccessDenied from "../../assets/img/403.gif";

export default class Authentication extends React.Component<IAuthenticationProps> {
  public constructor(props: IAuthenticationProps) {
    super(props);
  }
  public async componentDidMount() {
    document.getElementById("root")!.className = "";
  }
  public render() {
    return (
      <div>
        {(this.props.status === 401 || this.props.status === 403) && (
          <div className="rtl">
            <img style={{ margin: "0 auto", display: "block" }} src={AccessDenied} alt="access denied" />

            <h1 style={{ textAlign: "center" }}>شما به این صفحه دسترسی ندارید</h1>
          </div>
        )}
        {this.props.status === 204 && (
          <div className="row">
            <div className="row">
              <img src={AccessDenied} alt="access denied" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
