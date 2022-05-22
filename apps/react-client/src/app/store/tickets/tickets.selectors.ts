import { RootState } from '..';

export const ticketsSliceSelector = (state: RootState) => state.tickets;

export const ticketsSelector = (state: RootState) =>
  ticketsSliceSelector(state).tickets;

export const ticketsByStatusFactory =
  (isCompleted: boolean) => (state: RootState) =>
    ticketsSelector(state).filter((ticket) => ticket.completed === isCompleted);

export const ticketsCompletedSelector = ticketsByStatusFactory(true);
export const ticketsPendingSelector = ticketsByStatusFactory(false);
