import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql'
})

const authLink = setContext((_, { headers }) => {
    const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;