import React from "react";
import "./app.css";
import { ApolloProvider } from '@apollo/client';
import RoutesConfig from "./RoutesConfig";
import { client } from "./Config";
import { AuthProvider } from "./AuthContext/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <RoutesConfig />
          </AuthProvider>
        </BrowserRouter>
      </ApolloProvider>


    </>
  );
}

export default App;
