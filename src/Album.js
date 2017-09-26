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
            type: GraphQLString,
            resolve: album => album.id 
        },
        artists: {
            type: new GraphQLList(Artist),
            description: 'Artist(s) on album',
            resolve: album => album.artists
        },
        spotifyOpen: {
            type: GraphQLString,
            description: 'open.spotify.com link',
            resolve: album => album.external_urls.spotify
        },
        name: {
            type: GraphQLString,
            description: 'Name of album',
            resolve: album => album.name
        },
        uri: {
            type: GraphQLString,
            description: 'Spotify URI',
            resolve: album => album.uri
        },
        images: {
            type: new GraphQLList(Image),
            description: 'Album art',
            resolve: album => album.images
        }
    })
});

module.exports = Album;