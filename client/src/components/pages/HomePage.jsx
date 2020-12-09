import React, {useState, lazy, Suspense} from "react";

import {Route, Redirect} from "react-router-dom";
import api from "api";
import {useUser, login} from "context/UserContext";
import Navigation from "components/navigation/Navigation";
import Login from "components/forms/Login";
import Spinner from "utils/Spinner";
const SignUp = lazy(() => import("components/forms/SignUp"));
const List = lazy(() => import("components/pages/List"));
const Profile = lazy(() => import("components/pages/Profile"));
let filmCreate = {
  title: "",
  description: "",
  duration: "",
  price: "",
  img: "",
};

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [user, dispatch] = useUser();

  const submit = user =>
    api.users.create(user).then(() => {
      filmCreate.title = user.email;
      api.films.create(filmCreate);
      setMessage("User has created");
    });

  const loginFn = user => {
    api.users.login(user).then(token => {
      login(dispatch, token);
    });
  };

  const userInfo = user => {
    return user;
  };

  const Admin = () => {
    return (
      <>
        <Route path="/list">
          <List activeUser={userInfo(user)} />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </>
    );
  };

  return (
    <Suspense fallback={<Spinner />}>
      <div className="container">
        {message && (
          <div className="alert alert-success">
            <button className="close" onClick={() => setMessage("")}>
              x
            </button>
            {message}
          </div>
        )}
        <Navigation />
        <Route>
          {user.token ? (
            <Admin />
          ) : (
            <>
              {" "}
              <Route exact path="/">
                <Login submit={loginFn} />
              </Route>
              <Route path="/sign-up">
                <SignUp submit={submit} />
              </Route>
            </>
          )}
        </Route>

        {message ? <Redirect to="/" /> : ""}
      </div>
    </Suspense>
  );
};

export default HomePage;
