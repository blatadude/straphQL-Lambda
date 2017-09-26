'use strict';
const fetch = require('node-fetch')
const GraphQL = require('graphql');
const Artist = require('./Artist');
const Album = require('./Album');
const Features = require('./Features');
const dotenv = require('dotenv').config()
const spotifyWebApi = require('spotify-web-api-node')
const {
    GraphQLSchema,
	GraphQLObjectType,
    GraphQLString,
    GraphQLList,
	GraphQLID,
	GraphQLInt,
} = GraphQL;

const spotifyApi = new spotifyWebApi({
    clientId: process.env.spotify_client_id,
    clientSecret: process.env.spotify_client_secret
})
function authenticate(credentials) {
    spotifyApi.clientCredentialsGrant().then(cred => {
        spotifyApi.setAccessToken(cred.body.access_token);
    })
};
authenticate()
const Track = new GraphQL.GraphQLObjectType({
    name: 'Track',
    description: 'spotify track for straph',
    fields: () => ({
        id: {
            type: GraphQLString,
            description: 'Spotify ID',
            resolve: track => track.id
        },
        name: {
            type: GraphQLString,
            description: 'Name of track',
            resolve: track => track.name
        },
        artists: {
            type: new GraphQLList(Artist),
            description: 'Artist(s) of track',
            resolve: track => track.artists
        },
        
        album: {
            type: Album,
            description: 'Album track is in',
            resolve: track => track.album
        },
        uri: {
            type: GraphQLString,
            description: 'Spotify URI',
            resolve: track => track.uri
        },
        duration_ms: {
            type: GraphQLInt,
            resolve: track => track.duration_ms
        },
        isrc: {
            type: GraphQLString,
            description: 'isrc',
            resolve: track => track.external_ids.isrc
        },
        popularity: {
            type: GraphQLInt,
            resolve: track => track.popularity
        },
        features: {
            type: Features,
            description: 'EchoNest song analysis',
            resolve: track => track.features
        }
    })
});
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',
        fields: () => ({
            track: {
                type: new GraphQLList(Track),
                args: {
                    id: { type: GraphQLString },
                    name: { type: GraphQLString },
                    artist: { type: GraphQLString }
                },
                resolve: (root, args) => {
                    const tracks = spotifyApi.searchTracks(args.artist && args.name, {limit: 25})
                    .then(tracks => tracks.body.tracks.items)
                    .then(tracks => {
                        const idArray = tracks.map(track => track.id)
                        const features = spotifyApi.getAudioFeaturesForTracks(idArray);
                        return tracks.map(track, i => {
                            track.features = features[i]
                            return track
                        })
                    })
                }
            }
        })
    })
})