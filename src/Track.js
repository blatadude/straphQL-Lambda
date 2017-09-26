'use strict';
const fetch = require('node-fetch')
const GraphQL = require('graphql');
const Artist = require('./Artist');
const Album = require('./Album');
const Features = require('./Features');
const oauth2 = require('client-oauth2');
const dotenv = require('dotenv').config('../.env');
const spotifyWebApi = require('spotify-web-api-node');
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

const spotify = new oauth2({
    clientId: process.env.spotify_client_id,
    clientSecret: process.env.spotify_client_secret,
    accessTokenUri: 'https://accounts.spotify.com/api/token'
})

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
                    name: { type: GraphQLString },
                    artist: { type: GraphQLString },
                    limit: {type: GraphQLInt },
                },
                resolve: async (root, args) => {
                    // Authenticate
                    try {
                        const token = await spotify.credentials.getToken()
                        await spotifyApi.setAccessToken(token.data.access_token)
                    } catch (err) {
                        console.log(err)
                    }
                    // Search
                    const searchArray = spotifyApi.searchTracks(args.name || args.artist, {limit: args.limit || 20})
                    .then(tracks => tracks.body.tracks.items)
                    .catch(console.log)
                        
                    const idArray = searchArray.then(tracks => {
                            return tracks.map(track => track.id)
                    })
                    const features = idArray.then(ids => {
                        return spotifyApi.getAudioFeaturesForTracks(ids)
                        .then(features => features.body.audio_features)
                        .catch(console.log)
                    })
                    
                    const mixture = features.then(features => {
                        return searchArray.then(tracks => {
                            return tracks.map((track, i) => {
                                track.features = features[i]
                                return track
                            })
                        })
                    })
                    return mixture.then(track => track).catch(console.log)              
                }
            }
        })
    })
})