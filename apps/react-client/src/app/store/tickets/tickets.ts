import { Ticket, User } from '@acme/shared-models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TicketWithUser extends Ticket {
  user?: User;
}

export interface AssigneePayload {
  ticketId: TicketWithUser['id'];
  userId: User['id'];
}

export interface TicketsState {
  tickets: TicketWithUser[];
  formTicket?: Partial<TicketWithUser>;
}

const initialState: TicketsState = {
  tickets: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    initializeTicketState(state, action: PayloadAction<TicketWithUser[]>) {
      state.tickets = action.payload;
    },

    addTicket(state, action: PayloadAction<TicketWithUser>) {
      state.tickets.push(action.payload);
    },

    assignTicket(
      state,
      { payload: { ticketId, userId } }: PayloadAction<AssigneePayload>
    ) {
      const ticketIndex = state.tickets.findIndex(
        (ticket) => ticket.id === ticketId
      );

      state.tickets[ticketIndex].assigneeId = userId;
    },
  },
});

export const { initializeTicketState, addTicket, assignTicket } =
  ticketsSlice.actions;

export const ticketsReducer = ticketsSlice.reducer;
