const {
    Query: TweetQuery,
    Mutation: TweetMutation,
    Tweet,
} = require('./tweet/resolvers');
const { Query: UserQuery, User } = require('./user/resolvers');

module.exports = {
    Query: Object.assign({}, TweetQuery, UserQuery),
    Mutation: Object.assign({}, TweetMutation),
    Tweet,
    User,
};