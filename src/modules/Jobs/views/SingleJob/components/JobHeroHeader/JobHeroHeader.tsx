import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { ArrowBack, MoreVert, Room } from '@material-ui/icons';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import styles from './JobHeroHeader.module.scss';

interface IJobHeroHeaderProps {
  activeTab: number;
  changeTab: (
    event: React.ChangeEvent<{}>,
    newActiveTab: number,
  ) => void;
  jobData: {
    position: string;
    location: string;
    status: string;
  };
  tabs: Array<string>;
}

const JobHeroHeader: FC<IJobHeroHeaderProps> = props => {
  const { position, location, status } = props.jobData;

  const tabStyles = {
    root: styles.tab,
  };

  const roomIconStyles = {
    marginRight: '0.5rem',
  };

  return (
    <Grid container className={styles.heroHeader}>
      <Grid className={styles.buttonsContainer} item xs={12}>
        <Link to={'/jobs'}>
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

      <Grid className={styles.jobInfo} item xs={12}>
        <h2>{position}</h2>
        <div className={styles.locationText}>
          <Room fontSize="small" style={roomIconStyles} />
          <Typography variant="subtitle2" className={styles.jobText}>
            {location}
          </Typography>
        </div>
        <Typography variant="subtitle2" className={styles.jobText}>
          {status}
        </Typography>
      </Grid>

      <Grid className={styles.tabs} item xs={12}>
        <Tabs
          indicatorColor="secondary"
          onChange={props.changeTab}
          textColor="inherit"
          value={props.activeTab}
        >
          {props.tabs.map((tab, index) => (
            <Tab classes={tabStyles} key={index} label={tab} />
          ))}
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default JobHeroHeader;
