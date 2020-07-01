import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper, { StepperProps } from '@material-ui/core/Stepper';
import StepConnector from '@material-ui/core/StepConnector';

interface IStepperProps extends StepperProps {
  disabled?: boolean;
  current?: number;
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: '#F76868',
      borderColor: '#F76868',
      opacity: 1,
    },
  },
  completed: {
    '& $line': {
      borderColor: '#edacac',
      backgroundColor: '#edacac',
    },
  },
  line: {
    height: 3,
    border: 0,
    opacity: 0.5,
    backgroundColor: '#edacac',
    borderRadius: 1,
  },
})(StepConnector);

const DisabledColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: '#E2E2E2',
      borderColor: '#E2E2E2',
      opacity: 1,
    },
  },
  completed: {
    '& $line': {
      borderColor: '#E2E2E2',
      backgroundColor: '#E2E2E2',
    },
  },
  line: {
    height: 3,
    border: 0,
    opacity: 0.5,
    backgroundColor: '#E2E2E2',
    borderRadius: 1,
  },
})(StepConnector);

const KStepper: React.FC<IStepperProps> = props => {
  const { disabled, current } = props;

  return (
    <Stepper
      {...props}
      activeStep={current}
      connector={
        disabled ? (
          <DisabledColorlibConnector />
        ) : (
          <ColorlibConnector />
        )
      }
    >
      {React.Children.map(props.children, e =>
        React.cloneElement(e as React.ReactElement, { disabled }),
      )}
    </Stepper>
  );
};

export default KStepper;
