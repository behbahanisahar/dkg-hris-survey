import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import "../../../../App.css";
interface IStepperProps {
  activeStep: number;
}

class MYStepper extends React.Component<IStepperProps, {}> {
  public render() {
    const steps = this.getSteps();
    console.log(this.props.activeStep);
    return (
      <Stepper activeStep={this.props.activeStep} alternativeLabel>
        {steps.map((label: any) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }
  private getSteps() {
    return ["Self", "Line Manager Approval", "BP Approval", "CXO Approval"];
  }
}

export default MYStepper;
