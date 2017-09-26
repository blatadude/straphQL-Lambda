'use strict';

const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = GraphQL;

const Features = new GraphQLObjectType({
    name: 'Features',
    description: 'EchoNest Analysis',
    fields: () => ({
        danceability: {
            type: GraphQLFloat,
            resolve: features => features.danceability
        },        
        energy: {
            type: GraphQLFloat,
            resolve: features => features.energy
        },
        key: {
            type: GraphQLFloat,
            resolve: features => features.key
        },
        loudness: {
            type: GraphQLFloat,
            resolve: features => features.loudness
        },
        mode: {
            type: GraphQLFloat,
            resolve: features => features.mode
        },
        speechiness: {
            type: GraphQLFloat,
            resolve: features => features.speechiness
        },
        acousticness: {
            type: GraphQLFloat,
            resolve: features => features.acousticness
        },
        instrumentalness: {
            type: GraphQLFloat,
            resolve: features => features.instrumentalness
        },
        liveness: {
            type: GraphQLFloat,
            resolve: features => features.liveness
        },
        valence: {
            type: GraphQLFloat,
            resolve: features => features.valence
        },
        tempo: {
            type: GraphQLFloat,
            resolve: features => features.tempo
        },
        uri: {
            type: GraphQLString,
            resolve: features => features.uri
        },
        track_href: {
            type: GraphQLString,
            resolve: features => features.track_href
        },
        analysis_url: {
            type: GraphQLString,
            resolve: features => features.analysis_url
        },
        duration_ms: {
            type: GraphQLInt,
            resolve: features => features.duration_ms
        },
        time_signature: {
            type: GraphQLInt,
            resolve: features => features.time_signature
        },
    })
});

module.exports = Features