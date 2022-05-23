import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useAppDispatch } from '../hooks/hooks';
import { setTicketStatus, TicketWithUser } from '../store/tickets/tickets';

export interface TicketCardProps {
  ticket: TicketWithUser;
}

export const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
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

  return (
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
        >
          Assign User
        </Button>
      </CardActions>
    </Card>
  );
};
