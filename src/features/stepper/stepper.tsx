import React from "react";
import "./stepper.css";
import { Stepper, Step, StepLabel, StepConnector } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import { StepIconProps } from "@material-ui/core/StepIcon";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";

interface IStepperProps {
  activeStep: number;
}
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    right: "calc(-50% + 16px)",
    left: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#4CAF50",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#4CAF50",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    fontFamily: "IRANYekan",
  },
  active: {
    color: "#4CAF50",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#4CAF50",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}
class MYStepper extends React.Component<IStepperProps, {}> {
  public render() {
    const steps = this.getSteps();
    return (
      <Stepper
        className="brand-font"
        activeStep={this.props.activeStep}
        alternativeLabel
        connector={<QontoConnector />}
      >
        {steps.map((label: any) => (
          <Step key={label.title}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label.titleFa}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }
  private getSteps() {
    return [
      { title: "Self", titleFa: "تایید فرد" },
      { title: "Line Manager Approval", titleFa: "تایید مدیر مستقیم" },
      { title: "BP Approval", titleFa: "تایید BP" },
      { title: "C-Level Approval", titleFa: "تایید مدیر واحد" },
    ];
  }
}

export default MYStepper;
