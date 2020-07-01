import React from 'react';
import KSwitch from '@/components/KSwitch';
import SimpleCard from './SimpleCard';

const KSwitchList: React.FC = props => {
  return (
    <SimpleCard>
      <h3>SWITCHES</h3>

      <h5>Disabled</h5>
      <KSwitch disabled={true} />
      <h5>Enabled</h5>
      <KSwitch disabled={false} />
      <h5>Enabled and Unchecked</h5>
      <KSwitch checked={false} />
      <h5>Enabled and Checked</h5>
      <KSwitch checked={true} />
      <h5>Disabled and Unchecked</h5>
      <KSwitch disabled={true} />
      <h5>Disabled and Checked</h5>
      <KSwitch checked={true} disabled={true} />
    </SimpleCard>
  );
};

export default KSwitchList;
