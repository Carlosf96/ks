import clsx from 'clsx';
import React, { FC } from 'react';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup, {
  RadioGroupProps,
} from '@material-ui/core/RadioGroup';
import { CheckboxMarkedCircle } from 'mdi-material-ui';
import styles from './KRadioButton.module.scss';

export interface IOption {
  label: string;
  value: string;
}

export type KRadioGroupProps = RadioGroupProps & {
  options?: Array<IOption>;
};

export const KRadioGroup: FC<KRadioGroupProps> = props => {
  return <RadioGroup {...props} />;
};

const KRadioButton: FC<RadioProps> = props => {
  return (
    <Radio
      className={clsx(styles.radioButton, {
        [styles.circle]: !props.checked,
      })}
      focusVisibleClassName={styles.focused}
      checkedIcon={
        <CheckboxMarkedCircle className={styles.checkedIcon} />
      }
      {...props}
    />
  );
};

export default KRadioButton;
