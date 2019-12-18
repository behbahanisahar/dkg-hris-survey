import React from "react";
import ListServices from "../../../../services/list-services";
import SelfNomination from "../self-nomination/self-enomination-form";
import Nomination from "../nomination-form/nomination-form";
import Authentication from "../../../authentication/authentication";

interface IAppState {
  itemId: number;
  page: string;
  NominationData: any;
  IsFeteching: boolean;
}
interface IProps {
  match?: any;
}

class MainNomination extends React.Component<IProps, IAppState> {
  private ListService: ListServices;
  constructor(props: any) {
    super(props);
    this.ListService = new ListServices();
    this.state = {
      itemId: 0,
      NominationData: {},
      page: "",
      IsFeteching: true,
    };
  }
  public async componentDidMount() {
    const itemId = this.props.match.params.itemId;
    await this.ListService.getNominationData(Number(itemId)).then(x => {
      this.setState(prevState => {
        return {
          ...prevState,
          itemId: Number(itemId),
          NominationData: x,
          IsFeteching: false,
        };
      });
    });
  }

  public render() {
    return (
      <>
        {!this.state.IsFeteching && (
          <div>
            <div>
              {this.state.NominationData.statusCode !== 200 && (
                <Authentication status={this.state.NominationData.statusCode || 401} />
              )}
              {this.state.NominationData.statusCode === 200 && (
                <div>
                  {this.state.NominationData.status.toLowerCase() === "notstarted" && (
                    <SelfNomination NominationData={this.state.NominationData} itemId={this.state.itemId} />
                  )}
                  {this.state.NominationData.status.toLowerCase() !== "notstarted" && (
                    <Nomination NominationData={this.state.NominationData} itemId={this.state.itemId} />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MainNomination;
