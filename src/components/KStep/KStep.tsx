import React from 'react';
import { StepProps } from '@material-ui/core/Step';
import { withStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import { TooltipProps } from '@material-ui/core/Tooltip';

interface IKStepProps extends StepProps {
  current?: boolean;
  TooltipProps?: TooltipProps;
}

const PaddedStep = withStyles({
  root: {
    padding: '6px',
  },
})(Step);

const KStep: React.FC<IKStepProps> = props => {
  const { current, TooltipProps } = props;

  return (
    <PaddedStep>
      {React.Children.map(props.children, e =>
        React.cloneElement(e as React.ReactElement, {
          TooltipProps,
          current,
        }),
      )}
    </PaddedStep>
  );
};

export default KStep;
