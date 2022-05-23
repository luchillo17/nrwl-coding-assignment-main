import { RootState } from '..';
import { UserWithTickets } from './users';
import { usersSelector, usersSliceSelector } from './users.selectors';

const sampleUser: UserWithTickets = {
  id: 1,
  name: 'Alice',
};

describe('UserSelectors', () => {
  describe('usersSliceSelector', () => {
    it('should select empty users slice', () => {
      const state = usersSliceSelector({
        users: { users: [] },
      } as Pick<RootState, 'users'> as any);

      expect(state.users).toEqual([]);
    });

    it('should select some users slice', () => {
      const state = usersSliceSelector({
        users: {
          users: [sampleUser],
        },
      } as Pick<RootState, 'users'> as any);

      expect(state.users).toEqual([sampleUser]);
    });
  });

  describe('usersSelector', () => {
    it('should select empty users directly', () => {
      const users = usersSelector({
        users: { users: [] },
      } as Pick<RootState, 'users'> as any);

      expect(users).toEqual([]);
    });

    it('should select some users directly', () => {
      const users = usersSelector({
        users: {
          users: [sampleUser],
        },
      } as Pick<RootState, 'users'> as any);

      expect(users).toEqual([sampleUser]);
    });
  });
});
