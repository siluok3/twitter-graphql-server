//Require the data for each type
const tweets = require('../data/tweets');
const authors = require('../data/authors');
const stats = require('../data/stats');

exports.Query = {
    Tweets: () => tweets,
    Tweet: (_, { id }) => tweets.find(tweet => tweet.id === id),
};

exports.Tweet = {
    Author: (tweet) => authors.find(author => author.id === tweet.author_id),
    Stats: (tweet) => stats.find(stat => stat.tweet_id === tweet.id),
};

exports.Mutation = {
    createTweet: (_, { body }) => {
        const nextTweetId = tweets.reduce((id, tweet) => {
            return Math.max(id, tweet.id);
        }, -1) +1;
        const newTweet = {
            id: nextTweetId,
            date: new Date(),
            author_id: currentUserId,
            body,
        };
        tweets.push(newTweet);
        return newTweet;
    },
};