import React from "react";
import "./App.css";
import SelfSurvey from "./features/nominationForm/components/self-survey/self-survey";
import Util from "../src/utilities/utilities";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import ListServices from "./services/list-services";
import NominationData from "../src/entities/nomination";
import FlowSurvey from "./features/nominationForm/components/survey/survey";
import SurveyIntroPage from "./features/survey-form/components/survey-intro/survey-intro";
import FormSurvey from "./features/survey-form/components/main-form/survey-form";
import NominationIntroPage from "./features/nominationForm/components/nomination-Intro/nomination-intro";

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

class App extends React.Component<{}, IAppState> {
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
    console.log(this.state.itemId);
    console.log(this.state.page);

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          {this.state.page.toLowerCase() === "nominationform" && (
            <div>
              {this.state.NominationData.Status.toLowerCase() === "notstarted" && (
                <SelfSurvey itemId={this.state.itemId} />
              )}
              {this.state.NominationData.Status.toLowerCase() !== "notstarted" && (
                <FlowSurvey itemId={this.state.itemId} />
              )}
            </div>
          )}
          {this.state.page.toLowerCase() === "surveyform" && <FormSurvey />}
          {this.state.page.toLowerCase() === "surveyintro" && <SurveyIntroPage />}
          {this.state.page.toLowerCase() === "nominationintro" && <NominationIntroPage />}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
