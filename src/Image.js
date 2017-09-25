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
        },
        width: {
            type: GraphQLInt
        },
        url: {
            type: GraphQLString
        }
    })
});

module.exports = Image;