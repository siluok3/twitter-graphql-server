//Require main modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const _ = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');

//Require the data for each type
const tweets = require('./data/tweets');
const authors = require('./data/authors');
const stats = require('./data/stats');

//Require the resolvers
const { Query } = require('./resolvers').Query;
const { User } = require('./resolvers').User;
const { Tweet } = require('./resolvers').Tweet;
const { Mutation } = require('./resolvers').Mutation;

//Define the schema with all the different types
const schemaFile = path.join(__dirname, 'schema.graphql');
//Define the typeDefs
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const resolvers = {
    Query: {
        Tweets: () => tweets,
        Tweet: (_, { id }) => tweets.find(tweet => tweet.id === id),
    },
    Tweet: {
        Author: (tweet) => authors.find(author => author.id === tweet.author_id),
        Stats: (tweet) => stats.find(stat => stat.tweet_id === tweet.id),
    },
    User: {
        full_name: (author) => `${author.first_name} ${author.last_name}`,
    },
    Mutation: {
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
    }
};

//We have to pass the resolver map to the schema as a second argument
const schema = makeExecutableSchema({ typeDefs, resolvers });

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');