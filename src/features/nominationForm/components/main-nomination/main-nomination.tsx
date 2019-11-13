import React from "react";
import Util from "../../../../utilities/utilities";
import ListServices from "../../../../services/list-services";
import INominationData from "../../../../entities/nomination";
import SelfNomination from "../self-nomination/self-enomination-form";
import Nomination from "../nomination-form/nomination-form";
import Authentication from "../../../authentication/authentication";

interface IAppState {
  itemId: number;
  page: string;
  NominationData: any;
}

class MainNomination extends React.Component<{}, IAppState> {
  private ListService: ListServices;
  constructor(props: any) {
    super(props);
    this.ListService = new ListServices();
    this.state = {
      itemId: 0,
      NominationData: {},
      page: "",
    };
  }
  public async componentDidMount() {
    const itemId = Util.getQueryStringValue("itemid");
    const page = Util.getQueryStringValue("page");
    const NominationData: INominationData = await this.ListService.getNominationData(Number(itemId));
    this.setState(prevState => {
      return {
        ...prevState,
        itemId: Number(itemId),
        NominationData,
        page,
      };
    });
  }

  public render() {
    return (
      <div>
        {this.state.page.toLowerCase() === "nominationform" && (
          <div>
            {this.state.NominationData.statusCode !== 200 && (
              <Authentication status={this.state.NominationData.statusCode || 401} />
            )}
            {this.state.NominationData.statusCode === 200 && (
              <div>
                {this.state.NominationData.Status.toLowerCase() === "notstarted" && (
                  <SelfNomination NominationData={this.state.NominationData} itemId={this.state.itemId} />
                )}
                {this.state.NominationData.Status.toLowerCase() !== "notstarted" && (
                  <Nomination NominationData={this.state.NominationData} itemId={this.state.itemId} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MainNomination;
