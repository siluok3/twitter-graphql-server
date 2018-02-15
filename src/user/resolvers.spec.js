const { User } = require('./resolvers');

describe('User.full_name', () => {
    it('concatenates first and last name', () => {
        const user = { first_name: 'John', last_name: 'Doe' };
        expect(User.full_name(user)).toEqual('John Doe')
    });
});