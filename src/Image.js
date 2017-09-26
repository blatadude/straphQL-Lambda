'use strict';

const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
} = GraphQL;

const Image = new GraphQLObjectType({
    name: 'Image',
    description: 'Image',
    fields: () => ({
        height: {
            type: GraphQLInt,
            resolve: image => image.height
        },
        width: {
            type: GraphQLInt,
            resolve: image => image.width
        },
        url: {
            type: GraphQLString,
            resolve: image => image.url
        }
    })
});

module.exports = Image;