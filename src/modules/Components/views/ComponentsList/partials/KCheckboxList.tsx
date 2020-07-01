import React from 'react';
import KCheckbox from '@/components/KCheckbox';
import SimpleCard from './SimpleCard';

const CheckboxList: React.FC = props => {
  return (
    <SimpleCard>
      <h3>CHECKBOXES</h3>

      <h5>Tab False</h5>
      <KCheckbox option={'Text'} tab={false} />
      <h5>Tab True</h5>
      <KCheckbox option={'Text'} tab={true} />
      <h5>Disabled and Checked</h5>
      <KCheckbox
        disabled={true}
        checked={true}
        option={''}
        tab={false}
      />
      <h5>Disabled and Unchecked</h5>
      <KCheckbox
        disabled={true}
        checked={false}
        option={'Text'}
        tab={false}
      />
      <h5>Enabled and Checked</h5>
      <KCheckbox checked={true} option={'Text'} tab={false} />
      <h5>Enabled and Unchecked</h5>
      <KCheckbox checked={false} option={'Text'} tab={false} />
    </SimpleCard>
  );
};

export default CheckboxList;
