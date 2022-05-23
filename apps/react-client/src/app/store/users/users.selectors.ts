import { RootState } from '..';

export const usersSliceSelector = (state: RootState) => state.users;

export const usersSelector = (state: RootState) =>
  usersSliceSelector(state).users;
