import React, { Component } from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Main from './Components/Main';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>  
    </ApolloProvider>
  );  
}

export default App;
