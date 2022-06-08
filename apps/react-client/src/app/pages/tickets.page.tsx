import AddIcon from '@mui/icons-material/Add';
import { debounce, Fab, Stack, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { TicketsAccordion } from '../components/tickets-accordion';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  ticketQuerySelector,
  ticketsCompletedSelector,
  ticketsPendingSelector,
  unassignedTicketsSelector,
} from '../store/tickets/tickets.selectors';
import { Link as RouterLink } from 'react-router-dom';
import { setQuery } from '../store/tickets/tickets';

export const TicketsPage = () => {
  const query = useAppSelector(ticketQuerySelector);
  const [currentQuery, setCurrentQuery] = useState(query);

  const unassignedTickets = useAppSelector(unassignedTicketsSelector);
  const pendingTickets = useAppSelector(ticketsPendingSelector);
  const doneTickets = useAppSelector(ticketsCompletedSelector);

  const dispatch = useAppDispatch();

  const updateQueryState = useCallback(
    debounce((str: string) => {
      dispatch(setQuery(str));
    }, 300),
    [dispatch, setQuery]
  );

  const queryChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    ev
  ) => {
    // setCurrentQuery(ev.target.value);
    updateQueryState(ev.target.value);
  };

  return (
    <Stack>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={queryChangeHandler}
      />

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
