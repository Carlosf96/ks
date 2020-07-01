import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
import StepLabel, {
  StepLabelProps,
} from '@material-ui/core/StepLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { StepIconProps } from '@material-ui/core/StepIcon';

interface IStepLabelProps extends StepLabelProps {
  disabled?: boolean;
  title?: string;
  current?: boolean;
  TooltipProps?: TooltipProps;
}

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  tooltipArrow: {
    backgroundColor: theme.palette.common.white,
  },
}))(Tooltip);

function DisabledColorlibStepIcon(props: StepIconProps) {
  return <Brightness1Icon style={{ color: '#E2E2E2' }} />;
}

function ColorlibStepIcon(props: StepIconProps) {
  return (
    <Brightness1Icon style={{ color: '#F74E4F' }} fontSize="small" />
  );
}

function ColorlibStepIconMini(props: StepIconProps) {
  return (
    <Brightness1Icon
      style={{ color: '#F74E4F', fontSize: '10px' }}
      fontSize="inherit"
    />
  );
}

const KStepLabel: React.FC<IStepLabelProps> = props => {
  const { current, disabled, TooltipProps, title } = props;
  let StepIC;

  if (current && !disabled) {
    StepIC = ColorlibStepIcon;
  } else if (!disabled) {
    StepIC = ColorlibStepIconMini;
  } else {
    StepIC = DisabledColorlibStepIcon;
  }

  return (
    <LightTooltip
      title={title}
      placement="top"
      arrow
      {...TooltipProps}
    >
      <StepLabel StepIconComponent={StepIC}>
        {props.children}
      </StepLabel>
    </LightTooltip>
  );
};

export default KStepLabel;
