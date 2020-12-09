import React, {useState, useEffect} from "react";
import api from "api";
import _find from "lodash/find";
import EditForm from "components/forms/EditForm";
import validate from "utils/validateForm";
import ListButtons from "utils/ListButtons";

const Profile = props => {
  const [users, setUsers] = useState([]);
  const [isEdit, setEdit] = useState(null);
  const [error, setError] = useState({});

  const {activeUser} = props;

  useEffect(() => {
    api.films.fetchAll().then(res => setUsers(res));
  }, []);

  const editFn = _id => {
    const item = _find(users, {_id});
    setEdit(item);

    return item;
  };

  const saveItem = user => {
    if (Object.values(validate(user)).length) {
      console.log(validate(user));
      setError(validate(user));
    } else {
      api.films.update(user).then(res => {
        setUsers(users.map(f => (f._id === res._id ? res : f)));
        setEdit(null);
      });
      setError({});
    }
  };

  const deleteFn = _id => {
    const user = _find(users, {_id});
    const newUsers = users.filter(f => f._id !== user._id);
    api.films.delete(user).then(() => setUsers(newUsers));
  };

  return (
    <div className="main">
      <div className="row border border-white border-top-0 mb-3">
        <div className="col-1 ">#</div>
        <div className="col-2">Name</div>
        <div className="col-1">Position</div>
        <div className="col-2">Email</div>
        <div className="col-2">Phone</div>
        <div className="col-3">Task</div>
        <div className="col-1"></div>
      </div>
      {isEdit ? (
        <EditForm
          item={isEdit}
          closeFn={setEdit}
          saveItem={saveItem}
          error={error}
        />
      ) : null}
      {users.map((item, idx) => {
        return (
          <div className="row fs-13" key={item._id}>
            <div className="col-1 ">{idx + 1}</div>
            <div className="col-2">{item.name}</div>
            <div className="col-1">{item.position}</div>
            <div className="col-2">{item.email}</div>
            <div className="col-2">{item.phone}</div>
            <div className="col-3">{item.task}</div>
            <div className="col-1">
              {activeUser.role === "admin" ? (
                <ListButtons
                  editFn={editFn}
                  deleteFn={deleteFn}
                  id={item._id}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
