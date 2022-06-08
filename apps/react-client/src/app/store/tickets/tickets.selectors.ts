import { RootState } from '..';
import { usersSelector } from '../users/users.selectors';

export const ticketsSliceSelector = (state: RootState) => state.tickets;

export const ticketQuerySelector = (state: RootState) =>
  ticketsSliceSelector(state).query;

export const ticketsSelector = (state: RootState) => {
  const query = ticketQuerySelector(state);

  return query === ''
    ? ticketsSliceSelector(state).tickets
    : ticketsSliceSelector(state).tickets.filter((ticket) =>
        ticket.description.toLowerCase().includes(query.toLowerCase())
      );
};

export const usersWithTicketsSelector = (state: RootState) => {
  const users = usersSelector(state);
  const tickets = ticketsSelector(state);

  return users.map((user) => ({
    ...user,
    tickets: tickets.filter((ticket) => ticket.assigneeId === user.id),
  }));
};

export const ticketsWithUserSelector = (state: RootState) => {
  const users = usersSelector(state);
  const tickets = ticketsSelector(state);

  return tickets.map((ticket) => ({
    ...ticket,
    user: users.find((user) => user.id === ticket.assigneeId),
  }));
};

export const unassignedTicketsSelector = (state: RootState) =>
  ticketsWithUserSelector(state).filter((ticket) => !ticket.user);

export const assignedTicketsSelector = (state: RootState) =>
  ticketsWithUserSelector(state).filter((ticket) => ticket.user);

export const ticketsByStatusFactory =
  (isCompleted: boolean) => (state: RootState) =>
    assignedTicketsSelector(state).filter(
      (ticket) => ticket.completed === isCompleted
    );

export const ticketsCompletedSelector = ticketsByStatusFactory(true);
export const ticketsPendingSelector = ticketsByStatusFactory(false);
