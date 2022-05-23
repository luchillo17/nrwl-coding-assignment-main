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

    setTicketStatus(
      state,
      action: PayloadAction<{ ticket: TicketWithUser; completed: boolean }>
    ) {
      const _ticket = state.tickets.find(
        (_ticket) => _ticket.id === action.payload.ticket.id
      );

      if (_ticket) {
        _ticket.completed = action.payload.completed;
      }
    },

    assignUserToTicket(
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

export const {
  addTicket,
  assignUserToTicket,
  initializeTicketState,
  setTicketStatus,
} = ticketsSlice.actions;

export const ticketsReducer = ticketsSlice.reducer;
