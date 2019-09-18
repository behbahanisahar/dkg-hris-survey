import React from "react";
import "./App.css";
import Survey from "./features/nominationForm/components/Survey/Survey";
import Util from "../src/utilities/utilities";


interface IAppState {
  itemId: number;
  NominationData: any;
}

class App extends React.Component<{}, IAppState> {
  // private ListService: ListServices;
  private util: Util;
  constructor(props: any) {
    super(props);
    this.util = new Util();
    // this.ListService = new ListServices();
    this.state = {
      itemId: 0,
      NominationData: {},
    };
  }
  public componentDidMount() {
    const itemId = this.util.getQueryStringValue("itemid");

    this.setState(prevState => {
      return {
        ...prevState,
        itemId: Number(itemId),
      };
    });
  }

  public render() {
    return (
      <div className="App">
        <Survey itemId={this.state.itemId} />
      </div>
    );
  }
}

export default App;
