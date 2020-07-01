import * as React from 'react';
import { INotification } from '../../typings';
import styles from './Notifications.module.scss';

interface INotificationsProps {
  notifications: Array<INotification>;
}

const Notifications: React.FC<INotificationsProps> = (
  props: INotificationsProps,
) => {
  const { notifications } = props;
  const notificationsList = notifications.map(
    (notification, index) => {
      return (
        <li key={index} className={styles.notification}>
          <div className={styles.notificationLeft}>
            <div className={styles.notificationImage}></div>
            <p className={styles.notificationLeftText}>
              {`${notification.recruiter}`}{' '}
              <b>{`${notification.action}`}</b> a{' '}
              {`${notification.person}`}
            </p>
          </div>
          <div className={styles.notificationRight}>
            <p className={styles.notificationRightText}>
              {notification.time} ago
            </p>
          </div>
        </li>
      );
    },
  );

  return (
    <div className={styles.notifications}>
      <h2 className={styles.notificationsHeader}>Notifications</h2>
      <ul className={styles.notificationsList}>
        {notificationsList}
      </ul>
    </div>
  );
};

export default Notifications;
