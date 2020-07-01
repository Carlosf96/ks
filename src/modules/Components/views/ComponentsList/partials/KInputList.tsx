import React from 'react';
import SimpleCard from './SimpleCard';
import KInput from '@/components/KInput/KInput';

const InputList: React.FC = props => {
  return (
    <SimpleCard>
      <h3>INPUTS</h3>
      <KInput />{' '}
    </SimpleCard>
  );
};

export default InputList;
