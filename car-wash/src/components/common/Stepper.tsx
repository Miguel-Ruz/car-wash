import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/stepper";
import { Box } from "@chakra-ui/react";



interface StepProps {
  title: string;
  description: string;
}

interface SteperProps {
  indexStep: number;
  steps: StepProps[];
}

const Steper = ({ indexStep, steps = [] }: SteperProps) => {
  const { activeStep } = useSteps({
    index: indexStep,
    count: steps.length,
  });

  return (
    <Stepper size="sm" index={activeStep} colorScheme="teal">
      {steps.map((step: { title: string, description: string }, index: number) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default Steper;
