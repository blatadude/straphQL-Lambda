const restify = require('restify');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/Track');
const app = restify.createServer();
const dotenv = require('dotenv').config();
app.post('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: false
}));

app.get('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
// console.log(process.env)
app.listen(process.env.server_port, function () {
    console.log(`Listening on port ${process.env.server_port}`)
});