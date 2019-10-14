import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { isNumber } from "util";
import Search from "@material-ui/icons/Search";

const styles = theme => ({
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    // padding: '1% 2.5%'
    padding: `${document.documentElement.clientWidth < 1008 ? "1% 3.6%" : "1%"}`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  input: {
    display: "flex",
    padding: 0,
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  paper: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
  placeholder: {
    fontSize: 13,
    left: 2,
    position: "absolute",
  },
  root: {
    direction: "ltr",
    flexGrow: 1,
    // height: 250,
  },
  singleValue: {
    fontSize: 13,
  },
  valueContainer: {
    alignItems: "center",
    direction: "rtl",
    display: "flex",
    flex: 1,
    flexWrap: "initial",
    overflow: "hidden",
    backgroundColor: "#e6e9f0",
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {/* {props.children}  */}
      موردی یافت نشد
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      margin="none"
      InputProps={{
        inputComponent,
        inputProps: {
          children: props.children,
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        direction: "rtl",
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class ReactSelect extends React.Component {
  state = {
    multi: null,
    single: this.props.value,
  };

  handleChange = name => value => {
    // tslint:disable-next-line:no-console
    this.setState({
      [name]: value,
    });
    this.props.onChange(value);
  };

  render() {
    const { classes, theme } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        "& input": {
          color: "blue",
          font: "inherit",
        },
        // color: theme.palette.text.primary,
      }),
    };

    let defaultValue;
    if (this.props.isMulti) {
      defaultValue = this.props.value;
    } else {
      defaultValue = {};
      defaultValue.label = this.props.text;
      defaultValue.value = this.props.value;
      // defaultValue = { label: this.props.text, value: this.props.value }
    }
    // tslint:disable-next-line:no-console

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            components={components}
            options={this.props.options}
            defaultValue={defaultValue}
            value={defaultValue}
            // defaultValue={this.state.single}
            onChange={this.props.onChange}
            // onChange={this.handleChange('single')}
            placeholder=""
            className={this.props.className}
            isMulti={this.props.isMulti}
            margin="none"
            isClearable={this.props.isClearable}
            IconComponent={Search}
          />
        </NoSsr>
      </div>
    );
  }
}

ReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReactSelect);
