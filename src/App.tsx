import React from "react";
import "./App.less";
import "./assets/css/dk-brand.less";
import Util from "../src/utilities/utilities";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["IRANYekan", "sans-serif", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: { main: "#ef5661" },
    // secondary: { main: "#00A998" },
    secondary: { main: "#00A998" },
  },
});

interface IAppState {
  page: string;
  NominationData: any;
}

class App extends React.Component<{}, IAppState> {
  private util: Util;
  constructor(props: any) {
    super(props);
    this.util = new Util();
    this.state = {
      NominationData: {},
      page: "",
    };
  }

  public async componentDidMount() {
    const page = this.util.getQueryStringValue("page");
    this.setState(prevState => {
      return {
        ...prevState,

        page,
      };
    });
  }

  public render() {
    return (
      <div className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div className="kt-container  kt-grid__item kt-grid__item--fluid">
          <MuiThemeProvider theme={theme}>
            {/* {this.state.page.toLowerCase() === "nominationform" && <MainNomination />}
            {this.state.page.toLowerCase() === "report" && <ResponsiveBulletClass />}
            {this.state.page.toLowerCase() === "competency" && <CompetencyCategoryComponent />}
            {this.state.page.toLowerCase() === "dashboard" && <MainDashboard />}
            {this.state.page.toLowerCase() === "surveyform" && <FormSurvey />}
            {this.state.page.toLowerCase() === "surveyintro" && <SurveyIntroPage />}
            {this.state.page.toLowerCase() === "nominationintro" && <NominationIntroPage />}
            {this.state.page.toLowerCase() === "" && <NominationIntroPage />} */}
            <Router>
              <div>
                <Switch>
                  {routes.map(route => (
                    <Route key={route.path} {...route} />
                  ))}
                </Switch>
              </div>
            </Router>
          </MuiThemeProvider>
          <ToastContainer rtl newestOnTop={true} />
        </div>
      </div>
    );
  }
}

export default App;
