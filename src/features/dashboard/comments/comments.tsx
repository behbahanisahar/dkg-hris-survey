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
  itemId: number;
  lang: string;
}
interface IState {
  isFetching: boolean;
  data: IComment[];
  itemId: number;
}

export default class Comments extends React.Component<IProps, IState> {
  private ReportServices: ReportServices;

  public constructor(props: any) {
    super(props);
    this.ReportServices = new ReportServices();

    this.state = {
      isFetching: true,
      data: [],
      itemId: 0,
    };
  }
  public async componentWillReceiveProps(nextProps: any) {
    this.getData(nextProps.itemId, nextProps.lang, true);
  }
  public async getData(NominationId: number, lang: string, isFetching: boolean) {
    this.setState(state => ({
      isFetching,
    }));
    await this.ReportServices.getComments(NominationId, lang).then(response =>
      this.setState(current => ({
        ...current,
        data: response,
        isFetching: false,
        itemId: NominationId,
      })),
    );
  }
  public async componentDidMount() {
    this.getData(this.props.itemId, this.props.lang, this.state.isFetching);
  }
  public render() {
    return (
      <>
        <Grid container spacing={3}>
          {this.state.data.map((comment, i) => (
            <Grid key={i} item xs={4}>
              <DKPortlet title={comment.title} subtitle={comment.description}>
                {this.state.isFetching === true && <DKSpinner></DKSpinner>}
                {this.state.isFetching === false && (
                  <div className="kt-scroll" data-scroll="true" data-height="200" data-scrollbar-shown="true">
                    <div className={"kt-widget2 " + comment.value}>
                      {comment.comments.map((text, i) => (
                        <div key={i} className="kt-widget2__item ">
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
