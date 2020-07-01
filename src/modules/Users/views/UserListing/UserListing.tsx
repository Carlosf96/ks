import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Typography } from '@material-ui/core';
import KAlert from '@/components/KAlert';
import KBaseContainer from '@/components/KBaseContainer';
import KButton from '@/components/KButton';
import KModal from '@/components/KModal';
import KTable from '@/components/KTable';
import { IUserListing } from '@/modules/Users/typings';
import { deleteUser, getUsers } from '@/store/users/thunks';
import {
  sel_usersData,
  sel_usersLoading,
} from '@/store/users/selectors';

const headCells = [
  {
    id: 'name',
    label: 'Name',
    numeric: false,
  },
  {
    id: 'role',
    label: 'Role',
    numeric: false,
  },
  {
    id: 'options',
    label: 'Options',
    numeric: false,
  },
];

const UserListing: FC = () => {
  const [currentId, setCurrentId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const dispatch = useDispatch();

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(currentId));
    handleDeleteMessage();
    setOpen(false);
  };

  const handleOpen = (id: number) => {
    setOpen(true);
    setCurrentId(id);
  };

  const handleClose = () => {
    setCurrentId(0);
    setOpen(false);
    setShowMessage(false);
  };

  const options = {
    delete: (id: number) => {
      handleOpen(id);
    },
    edit: '/users/edit/',
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users: IUserListing[] = useSelector(sel_usersData);
  const loading = useSelector(sel_usersLoading);

  const updatedUsers = users.map(user => {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.level,
    };
  });

  return (
    <KBaseContainer whole>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">User deleted.</KAlert>
      </Snackbar>
      <KModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div>
          <Typography variant="h6" align="center">
            Are you sure you want to delete this user?
          </Typography>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-evenly"
            m={2}
          >
            <KButton onClick={handleDelete}>YES</KButton>
            <KButton onClick={handleClose}>NO</KButton>
          </Box>
        </div>
      </KModal>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h1">Users</Typography>
        <div>
          <Box display="inline-block" mr={2}>
            <Link to="/users/create">
              <KButton color="primary">Add User</KButton>
            </Link>
          </Box>
        </div>
      </Box>
      <KTable
        data={updatedUsers}
        headCells={headCells}
        isLoading={loading}
        options={options}
      />
    </KBaseContainer>
  );
};

export default UserListing;
