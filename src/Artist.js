'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
} = GraphQL;

const Artist = new GraphQLObjectType({
    name: 'Artist',
    description: 'Track artitst',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        spotifyOpen: {
            type: GraphQLString,
            description:'open.spotify.com link'
        },
        href: {
            type: GraphQLString,
            description: 'api reference to artist'
        }, 
        spotifyID: {
            type: GraphQLString,
            description: 'spotify ID'
        }, 
        name: {
            type: GraphQLString,
            description: 'Artist name'
        }, 
        uri: {
            type: GraphQLString,
            description: 'Spotify URI' 
        }
    })
});
module.exports = Artist;