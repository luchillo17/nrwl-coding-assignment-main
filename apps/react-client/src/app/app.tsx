import { User } from '@acme/shared-models';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './app.module.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { initializeTicketState } from './store/tickets/tickets';
import { ticketsSelector } from './store/tickets/tickets.selectors';
import Tickets from './tickets/tickets';

const App = () => {
  const tickets = useAppSelector(ticketsSelector);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState([] as User[]);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();

      dispatch(initializeTicketState(await data.json()));
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles['app']}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} />} />
        {/* Hint: Try `npx nx g component TicketDetails --no-export` to generate this component  */}
        <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
      </Routes>
    </div>
  );
};

export default App;
