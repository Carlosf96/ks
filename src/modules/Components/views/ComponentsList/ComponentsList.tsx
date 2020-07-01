import React from 'react';
import KButtonList from './partials/KButtonList';
import KCheckboxList from './partials/KCheckboxList';
import KSwitchList from './partials/KSwitchList';
import KTableList from './partials/KTableList';
import KRadioButtonList from './partials/KRadioButtonList';
import KInputList from './partials/KInputList';
import { Box, Grid } from '@material-ui/core';

const ComponentsList: React.FC = props => {
  return (
    <>
      <p>Components List</p>
      <Grid>
        <Box display="flex" flexDirection="row">
          <KButtonList />
          <KCheckboxList />
          <KRadioButtonList />
          <KSwitchList />
          <KTableList />
          <KInputList />
        </Box>
      </Grid>
    </>
  );
};

export default ComponentsList;
