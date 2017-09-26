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
            type: GraphQLString,
            resolve: artist => artist.id
        },
        spotifyOpen: {
            type: GraphQLString,
            description:'open.spotify.com link',
            resolve: artist => artist.external_urls.spotify
        }, 
        name: {
            type: GraphQLString,
            description: 'Artist name',
            resolve: artist => artist.name
        }, 
        uri: {
            type: GraphQLString,
            description: 'Spotify URI',
            resolve: artist => artist.uri 
        }
    })
});
module.exports = Artist;