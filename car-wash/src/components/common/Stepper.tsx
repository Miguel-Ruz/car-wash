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

const steps = [
  { title: "Paso 1", description: "Datos del cliente" },
  { title: "Paso 2", description: "Datos del lavado" },
];

type Props = {
  indexStep: number;
};

const Steper = ({ indexStep }: Props) => {
  const { activeStep } = useSteps({
    index: indexStep,
    count: steps.length,
  });
  return (
    <Stepper size="sm" index={activeStep} colorScheme="teal">
      {steps.map((step, index) => (
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
