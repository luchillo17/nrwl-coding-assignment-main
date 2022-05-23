import { Container, Stack, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/header';
import { useAppDispatch } from './hooks/hooks';
import { TicketFormPage } from './pages/ticket-form.page';
import { TicketsPage } from './pages/tickets.page';
import { UsersPage } from './pages/users.page';
import { initializeTicketState } from './store/tickets/tickets';
import { initializeUsersState } from './store/users/users';

const App = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();

      dispatch(initializeTicketState(await data.json()));
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();

      dispatch(initializeUsersState(await data.json()));
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <Stack sx={{ height: '100%', backgroundColor: theme.palette.grey[300] }}>
      <Header />

      <Container sx={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<TicketsPage />} />
          <Route path="/tickets/*" element={<TicketFormPage />} />
          {/* Hint: Try `npx nx g component TicketDetails --no-export` to generate this component  */}
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Container>
    </Stack>
  );
};

export default App;
