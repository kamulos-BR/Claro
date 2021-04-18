'use strict';
const port = 4288;
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const repositories = require('./src/repository/'); // our repository database functions are here! we can use with graphql or serverless lambda
const resolvers = require('./src/resolvers'); // resolvers
const types = require('./src/types'); // types

async function initServer() {

    const type = types.player;
    const PlayerRepositoryInstance = repositories.PlayerRepository;
    const PlayerRepository = new PlayerRepositoryInstance();

    await PlayerRepository.openConn();

    const resolver = await resolvers.player(PlayerRepository);

    const server = new ApolloServer({
        typeDefs: type,
        resolvers: resolver,
        context: {PlayerRepositoryInstance}
    });

    const app = express();
    server.applyMiddleware({app});

    app.listen({port: port}, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
}

initServer();
