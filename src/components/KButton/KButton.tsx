import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

interface IKButtonProps extends ButtonProps {}

const KButton: React.FC<IKButtonProps> = props => {
  const { color, variant } = props;

  return (
    <Button
      {...props}
      color={color ?? 'primary'}
      variant={variant ?? 'contained'}
    >
      {props.children}
    </Button>
  );
};

export default KButton;
