import React from 'react';
import KButton from '@/components/KButton';
import SimpleCard from './SimpleCard';

const KButtonsList: React.FC = props => {
  return (
    <SimpleCard>
      <h3> BUTTONS </h3>

      <h5>MUi: Primary Color and Enabled</h5>
      <KButton disabled={false}>Text</KButton>
      <h5>MUi: Primary Color and Disabled</h5>
      <KButton disabled={true}>Text</KButton>
      <h5>MUi: Secondary Color and Enabled</h5>
      <KButton disabled={false}>Text</KButton>
      <h5>MUi: Secondary Color and Disabled</h5>
      <KButton color={'secondary'} disabled={true}>
        Text
      </KButton>
    </SimpleCard>
  );
};

export default KButtonsList;
