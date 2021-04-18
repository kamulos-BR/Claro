'use strict';

const getResolvers = async (repository) => {

    return {
        Query: {
            getPlayer(root, args, context, info) {
                const { id } = args.id;
                return repository.getPlayer(id);
            },
            async getPlayers(root, args, context, info) {
                return repository.getPlayers(args.limit);
            },
        },
        Mutation: {
            async setPlayer(root, args, context, info) {
                return repository.setPlayer(args.input);
            },
        },
    };

};

module.exports = getResolvers;
