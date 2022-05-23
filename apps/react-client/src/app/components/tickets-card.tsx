import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useAppDispatch } from '../hooks/hooks';
import {
  assignUserToTicket,
  setTicketStatus,
  TicketWithUser,
} from '../store/tickets/tickets';
import { UserWithTickets } from '../store/users/users';
import { AssigneeDialog } from './asignee-dialog';

export interface TicketCardProps {
  ticket: TicketWithUser;
}

export const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggleStatus = async () => {
    try {
      const response = await fetch(`/api/tickets/${ticket.id}/complete`, {
        method: ticket.completed ? 'DELETE' : 'PUT',
      });

      if (response.status === 204) {
        dispatch(setTicketStatus({ ticket, completed: !ticket.completed }));
      }
    } catch (error) {}
  };

  const assignUser = async (user: UserWithTickets) => {
    try {
      if (!user) {
        return;
      }

      const response = await fetch(
        `/api/tickets/${ticket.id}/assign/${user.id}`,
        {
          method: 'PUT',
        }
      );

      if (response.status === 204) {
        dispatch(assignUserToTicket({ ticketId: ticket.id, userId: user.id }));
      }
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardActionArea component={RouterLink} to={`/tickets/${ticket.id}`}>
          <CardContent>
            <Typography>Ticket ID: {ticket.id}</Typography>

            <Typography>Description: {ticket.description}</Typography>

            <Typography>
              Status: {ticket.completed ? 'Completed' : 'Pending'}
            </Typography>

            <Typography>
              Assignee: {ticket.user?.name ?? 'Not assigned'}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            sx={{ flex: 1 }}
            onClick={toggleStatus}
          >
            Toggle Status
          </Button>

          <Button
            size="small"
            color="primary"
            variant="contained"
            sx={{ flex: 1 }}
            onClick={() => setOpen(true)}
          >
            Assign User
          </Button>
        </CardActions>
      </Card>
      <AssigneeDialog open={open} onClose={assignUser} />
    </>
  );
};
