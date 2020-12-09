import React from "react";
import {NavLink} from "react-router-dom";
import {logout, useUser} from "context/UserContext";

const Navigation = () => {
  const [user, dispatch] = useUser();

  const isUser = user.token;
  return (
    <div>
      {isUser ? (
        <ul className="nav justify-content-center nav-menu">
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link nav-menu-item">
              My profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/list" className="nav-link  nav-menu-item">
              {" "}
              List
            </NavLink>
          </li>

          <li className="nav-item ">
            <NavLink
              to="/"
              onClick={() => logout(dispatch)}
              className="nav-link  nav-menu-item"
            >
              Log Out
            </NavLink>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navigation;
