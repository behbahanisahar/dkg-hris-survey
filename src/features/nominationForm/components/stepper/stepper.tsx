import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import "../../../../App.css";
interface IStepperProps {
  activeStep: number;
}

class MYStepper extends React.Component<IStepperProps, {}> {
  public render() {
    const steps = this.getSteps();
    return (
      <Stepper activeStep={this.props.activeStep} alternativeLabel>
        {steps.map((label: any) => (
          <Step key={label.title}>
            <StepLabel>{label.titleFa}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }
  private getSteps() {
    return [
      { title: "Self", titleFa: "تایید فرد" },
      { title: "Line Manager Approval", titleFa: "تایید مدیر مستقیم" },
      { title: "BP Approval", titleFa: "تایید فرد" },
      { title: "C-Level Approval", titleFa: "تایید مدیر واحد" },
    ];
  }
}

export default MYStepper;
