import 'react-native-gesture-handler';
import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import MainDrawer from './src/navigation/mainStack.js';

const client = new ApolloClient({
  uri: 'http://192.168.0.11:4000/',
  cache: new InMemoryCache()
})

export default function App() {
  console.log('Estas en app');

    return (
    <ApolloProvider client={client}>
      <MainDrawer/>
    </ApolloProvider>
    )
}

