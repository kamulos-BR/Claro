const { gql } = require('apollo-server-express');

const mutation = require('./players/mutation');
const query = require('./players/query');
const player = require('./players/player');

const playerType = gql`
    ${player}
    ${query}
    ${mutation}`;

module.exports.player = playerType;
