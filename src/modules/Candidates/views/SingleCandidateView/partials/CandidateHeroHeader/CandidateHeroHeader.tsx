import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { ArrowBack, MoreVert, Work } from '@material-ui/icons';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import styles from './CandidateHeroHeader.module.scss';
import { ITab } from '@/modules/Candidates/views/SingleCandidateView/SingleCandidateView';

interface ICandidateHeroHeaderProps {
  activeTab: number;
  changeTab: (
    event: React.ChangeEvent<{}>,
    newActiveTab: number,
  ) => void;
  candidateData: {
    name: string;
    position: string;
  };
  tabs: Array<ITab>;
}

const CandidateHeroHeader: FC<ICandidateHeroHeaderProps> = props => {
  const { position, name } = props.candidateData;

  const tabStyles = {
    root: styles.tab,
  };

  const workIconStyles = {
    marginRight: '0.5rem',
  };

  return (
    <Grid container className={styles.heroHeader}>
      <Grid className={styles.buttonsContainer} item xs={12}>
        <Link to={'/candidates'}>
          <IconButton
            aria-label="Back"
            classes={{ root: styles.backArrowIcon }}
          >
            <ArrowBack />
          </IconButton>
        </Link>
        <IconButton
          aria-label="Edit Job"
          classes={{ root: styles.optionsIcon }}
        >
          <MoreVert fontSize="large" />
        </IconButton>
      </Grid>

      <Grid className={styles.candidateInfo} item xs={12}>
        <h2>{name}</h2>
        <div className={styles.locationText}>
          <Typography
            variant="subtitle2"
            className={styles.candidateText}
          >
            <Work fontSize="small" style={workIconStyles} />
            {position}
          </Typography>
        </div>
      </Grid>
      <Grid className={styles.tabs} item xs={12}>
        <Tabs
          indicatorColor="secondary"
          onChange={props.changeTab}
          textColor="inherit"
          value={props.activeTab}
        >
          {props.tabs.map((tab, index) => (
            <Tab
              classes={tabStyles}
              key={index}
              label={tab.tab}
              component={NavLink}
              to={tab.to}
              exact
            />
          ))}
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default CandidateHeroHeader;
