import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Warning from "@material-ui/icons/Warning";
import Error from "@material-ui/icons/Error";
import Info from "@material-ui/icons/Info";
import { SnackbarContent } from "@material-ui/core";
import SnackBarMode from "../../../../entities/snackbar-mode";
import "./snackbar-message.css";

interface ISnackBarProps {
  type: string;
  message: string;
  showMessage: boolean;
  onHandleCloseMessage: (st: any) => any;
}
interface ISnackBarState {
  color: string;
}

export default class SnackBarMessage extends React.Component<ISnackBarProps, ISnackBarState> {
  public constructor(props: ISnackBarProps) {
    super(props);

    this.state = {
      color: "#43a047",
    };
  }

  public render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.props.showMessage}
        autoHideDuration={2000}
        // autoHideDuration={false}
        onClose={this.props.onHandleCloseMessage}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
      >
        <SnackbarContent
          style={{ backgroundColor: `${this.props.type}` }}
          message={
            <div>
              {this.props.type === SnackBarMode.Success && <CheckCircle className="middleIcon mx-3" />}
              {this.props.type === SnackBarMode.Warning && <Warning className="middleIcon  mx-3" />}
              {this.props.type === SnackBarMode.Error && <Error className="middleIcon  mx-3" />}
              {this.props.type === SnackBarMode.Info && <Info className="middleIcon  mx-3" />}
              <span id="message-id">{this.props.message}</span>
            </div>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              className="closeSnackbar mr-10"
              color="inherit"
              onClick={this.props.onHandleCloseMessage}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}
