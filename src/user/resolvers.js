//Require the data for each type
const authors = require('../data/authors');

exports.User = {
    full_name: (author) => `${author.first_name} ${author.last_name}`,
};