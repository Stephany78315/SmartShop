import React from 'react'
import MainStack from './src/navigation/mainStack.js';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.8:4000/',
  cache: new InMemoryCache()
})

export default function App() {
  console.log('Estas en app');

    return (
    <ApolloProvider client={client}>
      <MainStack/>
    </ApolloProvider>
    )
}

