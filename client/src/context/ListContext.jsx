import React, {createContext, useContext} from "react";
import jwtDecode from "jwt-decode";
import api from "api";
import _find from "lodash/find";

const ListContext = createContext();
export const editFn = _id => {
  const item = _find(film, {_id});
  setEdit(item);

  return item;
};

export const saveItem = user => {
  api.films.update(user).then(res => {
    setFilm(film.map(f => (f._id === res._id ? res : f)));
    setEdit(null);
  });
};

export const deleteFn = _id => {
  const user = _find(film, {_id});
  const newUsers = film.filter(f => f._id !== user._id);
  api.films.delete(user).then(() => setFilm(newUsers));
};
