import React from "react";
import { IAuthenticationProps } from "./authentication-props";

export default class Authentication extends React.Component<IAuthenticationProps> {
  public constructor(props: IAuthenticationProps) {
    super(props);
  }
  public async componentDidMount() {}
  public render() {
    return (
      <div>
        {this.props.status === 401 ||
          (this.props.status === 403 && <div className="row">شما به این صفحه دسترسی ندارید!</div>)}
        {this.props.status === 204 && <div className="row">آیتم وجود ندارد!</div>}
      </div>
    );
  }
}
