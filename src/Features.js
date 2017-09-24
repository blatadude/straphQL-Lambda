'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
} = GraphQL;

const Features = new GraphQLObjectType({
    name: 'Song Features',
    description: 'EchoNest Analysis',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        danceability: {
            type: GraphQLInt
        },
        energy: {
            type: GraphQLInt
        },
        key: {
            type: GraphQLInt
        },
        loudness: {
            type: GraphQLInt
        },
        mode: {
            type: GraphQLInt
        },
        speechiness: {
            type: GraphQLInt
        },
        acousticness: {
            type: GraphQLInt
        },
        instrumentalness: {
            type: GraphQLInt
        },
        liveness: {
            type: GraphQLInt
        },
        valence: {
            type: GraphQLInt
        },
        tempo: {
            type: GraphQLInt
        },
        uri: {
            type: GraphQLString
        },
        track_href: {
            type: GraphQLString
        },
        analysis_url: {
            type: GraphQLString
        },
        duration_ms: {
            type: GraphQLInt
        },
        time_signature: {
            type: GraphQLInt
        },
    })
});

module.exports = Features