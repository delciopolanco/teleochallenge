// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Screenshot {
    id: ID!
    imageUrl: String!
    description: String!
  }

  type Kid {
    id: ID!
    name: String!
    screenshots: [Screenshot!]!
  }

  type Query {
    kid(id: ID!): Kid
  }
`;

const mockedData = {
  kid: {
    id: '1',
    name: 'John',
    screenshots: [
      {
        id: '1',
        imageUrl:
          'https://fastly.picsum.photos/id/602/200/300.jpg?hmac=TkzlF12MtJomcmqzsOc-CR43gSl3xnotDQRPBvM7Avw',
        description: 'Screenshot 1',
      },
      {
        id: '2',
        imageUrl:
          'https://fastly.picsum.photos/id/619/200/300.jpg?hmac=WqBGwlGjuY9RCdpzRaG9G-rc9Fi7TGUINX_-klAL2kA',
        description: 'Screenshot 2',
      },
    ],
  },
};

const resolvers = {
  Query: {
    kid: (parent, args) => mockedData.kid,
  },
};

module.exports = { typeDefs, resolvers };
