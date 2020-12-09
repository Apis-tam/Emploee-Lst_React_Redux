import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import HomePage from "components/pages/HomePage";
import {UserProvider} from "context/UserContext";
const App = () => (
  <Router>
    <UserProvider>
      <HomePage />
    </UserProvider>
  </Router>
);
export default App;
