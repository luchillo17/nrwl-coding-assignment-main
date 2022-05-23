import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { FC } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { usersSelector } from '../store/users/users.selectors';
import PersonIcon from '@mui/icons-material/Person';
import { UserWithTickets } from '../store/users/users';

export interface AssigneeDialogProps extends DialogProps {
  onClose: (user: UserWithTickets) => void;
}

export const AssigneeDialog: FC<AssigneeDialogProps> = (props) => {
  const users = useAppSelector(usersSelector);

  const handleListItemClick = (value: UserWithTickets) => {
    props?.onClose(value);
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Assign User</DialogTitle>

      <List sx={{ pt: 0 }}>
        {users.map((user) => (
          <ListItem
            button
            onClick={() => handleListItemClick(user)}
            key={user.id}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
