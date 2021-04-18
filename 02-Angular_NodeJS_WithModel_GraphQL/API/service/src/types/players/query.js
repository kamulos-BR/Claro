module.exports = `
  type Query {
    getPlayers(limit: Int = 100): [Player]
  
    getPlayer(id: Int!): Player
  }
`;
