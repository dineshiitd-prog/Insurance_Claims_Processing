import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
async function startServer() {
    const app = express();
    app.use(cors(), bodyParser.json());
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();
    const { url } = await startStandaloneServer(server, {
        listen: { port: parseInt(process.env.PORT || '4000') }
    });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`Server ready at http://localhost:${port}/graphql`);
    });
}
startServer().catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map