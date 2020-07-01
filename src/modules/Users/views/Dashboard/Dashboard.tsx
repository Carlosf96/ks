import * as React from 'react';
import styles from './Dashboard.module.scss';
import Notifications from './components/Notifications';
import Stats from './components/Stats';
import { INotification, IStat } from './typings';
import KBaseContainer from '@/components/KBaseContainer';
import { Typography } from '@material-ui/core';

interface IPropsDashboard {
  notifications: Array<INotification>;
  stats: IStat[];
}

const Dashboard = (props: IPropsDashboard) => {
  const { notifications, stats } = props;

  return (
    <KBaseContainer whole>
      <div className={styles.dashboard}>
        <div className={styles.titleContainer}>
          <Typography variant="h1">Dashboard</Typography>
        </div>
        <div className={styles.componentsContainer}>
          <div className={styles.notifications}>
            <Notifications notifications={notifications} />
          </div>
          <div className={styles.statics}>
            <Stats stats={stats} />
          </div>
        </div>
      </div>
    </KBaseContainer>
  );
};

Dashboard.defaultProps = {
  notifications: [],
  stats: [],
};

export default Dashboard;
