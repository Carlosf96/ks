import React from 'react';
import SimpleCard from './SimpleCard';
import KRadioButton from '@/components/KRadioButton';

const RadioList: React.FC = props => {
  return (
    <SimpleCard>
      <h3> RADIOS </h3>

      <h5>Disabled</h5>
      <KRadioButton disabled={true} />
      <h5>Enabled</h5>
      <KRadioButton disabled={false} />
      <h5>Checked and Enabled</h5>
      <KRadioButton checked={true} />
      <h5>Unchecked and Enabled</h5>
      <KRadioButton checked={false} />
      <h5>Checked and Disabled</h5>
      <KRadioButton checked={true} />
      <h5>Unchecked and Disabled</h5>
      <KRadioButton checked={false} />
    </SimpleCard>
  );
};

export default RadioList;
