'use strict';

const GraphQL = require('graphql');
const Artist = require('./Artist');
const Image = require('./Image');
const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLList,
   GraphQLID,
   GraphQLInt,
} = GraphQL;

const Album = new GraphQLObjectType({
    name: 'Album',
    description: 'Spotify Album',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        artists: {
            type: [Artist],
            description: 'Artist(s) on album'
        },
        spotifyOpen: {
            type: GraphQLString,
            description: 'open.spotify.com link'
        },
        name: {
            type: GraphQLString,
            description: 'Name of album'
        },
        uri: {
            type: GraphQLString,
            description: 'Spotify URI'
        },
        images: {
            type: [Image],
            description: 'Album art'
        }
    })
});

module.exports = Album;