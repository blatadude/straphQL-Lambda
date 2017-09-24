'use strict';
 
const GraphQL = require('graphql');
const Artist = require('./Artist');
const Album = require('./Album');
const Features = require('./Features');

const {
	GraphQLObjectType,
    GraphQLString,
    GraphQLList,
	GraphQLID,
	GraphQLInt,
} = GraphQL;

const Track = new GraphQL.GraphQLObjectType({
    name: 'Track',
    description: 'spotify track for straph',
    fields: () => ({
        id: {
         type: GraphQLID   
        },
        trackID: {
            type: GraphQLString,
            description: 'Spotify ID'
        },
        name: {
            type: GraphQLString,
            description: 'Name of track'
        },
        artists: {
            type: [Artist],
            description: 'Artist(s) of track'
        },
        
        album: {
            type: Album,
            description: 'Album track is in'
        },
        uri: {
            type: GraphQLString,
            description: 'Spotify URI'
        },
        duration_ms: {
            type: GraphQLInt
        },
        isrc: {
            type: GraphQLString,
            description: 'isrc'
        },
        popularity: {
            type: GraphQLInt
        },
        features: {
            type: Features,
            description: 'EchoNest song analysis'
        }
    })
});
module.exports = Track;