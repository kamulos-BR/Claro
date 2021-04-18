module.exports =`
  type Player {
    id: Int!
    first_name: String!
    last_name: String!
    hand: String
    birthday: Int
    country: String!
  }
  
  input PlayerInput {
    first_name: String!
    last_name: String!
    country: String!
  }
`;
