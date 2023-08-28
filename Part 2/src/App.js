import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './appolloClient';
import ScreenshotList from './Screen/ScreenShootList';

function App() {
  return (
    <ApolloProvider client={client}>
      <ScreenshotList kidId={1} />
    </ApolloProvider>
  );
}

export default App;
