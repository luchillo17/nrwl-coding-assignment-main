import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TicketWithUser } from '../store/tickets/tickets';

export interface TicketCardProps {
  ticket: TicketWithUser;
}

export const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
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
    </Card>
  );
};
