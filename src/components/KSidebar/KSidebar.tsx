import { INavigationRoutes, routes } from '@/utils/navigation';
import {
  Drawer,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styles from './KSidebar.module.scss';
import { getRole } from '@/utils/helpers';

interface IKSidebarProps {
  isOpen: boolean;
}

const KSidebar: React.FC<IKSidebarProps> = ({ isOpen }) => {
  const history = useHistory();
  const filterRoutes = (route: INavigationRoutes) => {
    switch (route.name) {
      case 'Users':
        return (
          getRole() === 'ADMINISTRATOR' && (
            <ListItem
              key={route.name}
              button
              component={NavLink}
              exact
              activeClassName={styles.selected}
              to={route.path}
            >
              <ListItemIcon>
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        );
        break;
      case 'Jobs':
        return (
          ['ADMINISTRATOR', 'RECRUITER'].includes(getRole()) && (
            <ListItem
              key={route.name}
              button
              component={NavLink}
              exact
              activeClassName={styles.selected}
              to={route.path}
            >
              <ListItemIcon>
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        );
        break;
      case 'Candidates':
        return (
          ['ADMINISTRATOR', 'RECRUITER', 'INTERVIEWER'].includes(
            getRole(),
          ) && (
            <ListItem
              key={route.name}
              button
              component={NavLink}
              exact
              activeClassName={styles.selected}
              to={route.path}
            >
              <ListItemIcon>
                <Icon>{route.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          )
        );
        break;
      default:
        return (
          <ListItem
            key={route.name}
            button
            component={NavLink}
            exact
            activeClassName={styles.selected}
            to={route.path}
          >
            <ListItemIcon>
              <Icon>{route.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
        break;
    }
  };
  return (
    <Drawer
      variant="permanent"
      className={isOpen ? styles.drawerOpen : styles.drawerClose}
      classes={{
        paper: isOpen ? styles.drawerOpen : styles.drawerClose,
      }}
    >
      <List className={styles.list}>
        {routes.map((route: INavigationRoutes) =>
          filterRoutes(route),
        )}
        <Divider />
        <ListItem
          button
          onClick={() => {
            localStorage.removeItem('user');
            history.push('/');
          }}
        >
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default KSidebar;
