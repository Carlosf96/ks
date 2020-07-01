import React from 'react';
import SimpleCard from './SimpleCard';
import { Table } from '@material-ui/core';
import KTableCell from '@/components/KTableCell';
import KTableHead from '@/components/KTableHead';
import KTableRow from '@/components/KTableRow';

const KTableList: React.FC = props => {
  return (
    <SimpleCard>
      <h3> TABLES </h3>
      <Table>
        <KTableHead>
          <KTableRow>
            <KTableCell>Black Text</KTableCell>
          </KTableRow>
        </KTableHead>
      </Table>

      <Table>
        <KTableHead>
          <KTableRow hover>
            <KTableCell whiteText>White Text and Hover</KTableCell>
          </KTableRow>
        </KTableHead>
      </Table>
    </SimpleCard>
  );
};

export default KTableList;
