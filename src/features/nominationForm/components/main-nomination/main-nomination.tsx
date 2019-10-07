import React from "react";
import Util from "../../../../utilities/utilities";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ListServices from "../../../../services/list-services";
import NominationData from "../../../../entities/nomination";
import SelfNomination from "../self-nomination/self-enomination-form";
import Nomination from "../nomination-form/nomination-form";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#ef5661" },
    // secondary: { main: "#00A998" },
    secondary: { main: "#00A998" },
  },
});

interface IAppState {
  itemId: number;
  page: string;
  NominationData: any;
}

class MainNomination extends React.Component<{}, IAppState> {
  private ListService: ListServices;
  private util: Util;
  constructor(props: any) {
    super(props);
    this.util = new Util();
    this.ListService = new ListServices();
    this.state = {
      itemId: 0,
      NominationData: {},
      page: "",
    };
  }
  public async componentDidMount() {
    const itemId = this.util.getQueryStringValue("itemid");
    const page = this.util.getQueryStringValue("page");
    const NominationData: NominationData = await this.ListService.getNominationData(Number(itemId));
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
      <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div className="kt-container  kt-grid__item kt-grid__item--fluid">
          <MuiThemeProvider theme={theme}>
            {this.state.page.toLowerCase() === "nominationform" && (
              <div>
                {this.state.NominationData.Status.toLowerCase() === "notstarted" && (
                  <SelfNomination itemId={this.state.itemId} />
                )}
                {this.state.NominationData.Status.toLowerCase() !== "notstarted" && (
                  <Nomination itemId={this.state.itemId} />
                )}
              </div>
            )}
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default MainNomination;
