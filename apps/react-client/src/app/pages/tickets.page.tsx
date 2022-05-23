import AddIcon from '@mui/icons-material/Add';
import { Fab, Stack } from '@mui/material';
import React from 'react';

import { TicketsAccordion } from '../components/tickets-accordion';
import { useAppSelector } from '../hooks/hooks';
import {
  ticketsCompletedSelector,
  ticketsPendingSelector,
  unassignedTicketsSelector,
} from '../store/tickets/tickets.selectors';
import { Link as RouterLink } from 'react-router-dom';

export const TicketsPage = () => {
  const unassignedTickets = useAppSelector(unassignedTicketsSelector);
  const pendingTickets = useAppSelector(ticketsPendingSelector);
  const doneTickets = useAppSelector(ticketsCompletedSelector);

  return (
    <Stack>
      <TicketsAccordion
        title="Unassigned tickets"
        tickets={unassignedTickets}
      />

      <TicketsAccordion title="Pending tickets" tickets={pendingTickets} />

      <TicketsAccordion title="Completed tickets" tickets={doneTickets} />

      <Fab
        color="primary"
        aria-label="add"
        to="/tickets/new"
        component={RouterLink}
        sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
};
