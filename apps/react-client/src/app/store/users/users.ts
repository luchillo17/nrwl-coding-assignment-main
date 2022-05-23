import { Ticket, User } from '@acme/shared-models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserWithTickets extends User {
  tickets?: Ticket[];
}
export interface UsersState {
  users: UserWithTickets[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initializeUsersState(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const { initializeUsersState } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
