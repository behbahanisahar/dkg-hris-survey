import * as React from "react";
import ReportServices from "../../../services/report-services";

import { DKPortlet } from "../../../core/components/portlet/portlet";
import { IComment } from "../../../entities/reports/comments";
import { Grid } from "@material-ui/core";
import "./comments.css";
import { DKSpinner } from "../../../core/components/spinner/spinner";

interface IProps {
  name?: string;
  match?: any;
}
interface IState {
  isFetching: boolean;
  itemId?: number;
  data: IComment[];
}

export default class Comments extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;

  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();

    this.state = {
      isFetching: true,
      itemId: 0,
      data: [],
    };
  }
  public async componentDidMount() {
    //  const itemId = Number(Util.getQueryStringValue("itemId"));

    const itemId = this.props.match.params.itemId;
    await this.ReportServices.getComments(itemId).then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: true,
      })),
    );
  }
  public render() {
    return (
      <>
        <Grid container spacing={3}>
          {this.state.data.map(comment => (
            <Grid item xs={4}>
              <DKPortlet title={comment.Title}>
                {this.state.isFetching === true && <DKSpinner></DKSpinner>}
                {this.state.isFetching === false && (
                  <div className="kt-scroll" data-scroll="true" data-height="200" data-scrollbar-shown="true">
                    <div className={"kt-widget2 " + comment.Value}>
                      {comment.Comments.map(text => (
                        <div className="kt-widget2__item ">
                          <div className="kt-widget2__info">
                            <a href="#" className="kt-widget2__title">
                              {text}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </DKPortlet>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}
