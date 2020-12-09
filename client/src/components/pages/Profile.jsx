import React, {useState, useEffect, memo} from "react";
import api from "api";
import jwtDecode from "jwt-decode";

import validate from "utils/validateForm";

const initState = {
  email: "",
  task: "",
  position: "",
  phone: "",
  name: "",
};

function Profile() {
  const [worker, setWorker] = useState(initState);
  const [error, setError] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(true);

  const usertoken = jwtDecode(localStorage.filmsToken).user;
  useEffect(() => {
    let findUser = {};
    api.films.fetchAll().then(res => {
      findUser = res.filter(f => f.email === usertoken.email)[0];

      if (findUser) {
        setWorker(findUser);
      } else {
        initState.email = usertoken.email;
        setWorker(initState);
      }
    });
  }, [usertoken.email]);

  function changeInput(e) {
    if (e.target.name === "phone") {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

      setWorker({
        ...worker,
        [e.target.name]: (e.target.value = !x[2]
          ? x[1]
          : "(" +
            x[1] +
            ")" +
            x[2] +
            (!x[3] ? "" : "-" + x[3]) +
            (!x[4] ? "" : "-" + x[4])),
      });
    }
    setWorker({...worker, [e.target.name]: e.target.value});
  }
  const editBtn = () => {
    setDisabled(false);
    console.log(disabled);
  };
  const saveItem = user => {
    if (Object.values(validate(user)).length) {
      let x;
      for (let i in validate(user)) {
        if (i.length) {
          x = validate(user)[i];
        }
      }
      setErrMsg(x);
      setError(validate(user));
    } else {
      if (user._id) {
        api.films.update(user).then(res => {
          setWorker(res);
        });
      } else {
        api.films.create(user).then(res => setWorker(res));
      }
      setError("");
      setErrMsg("");
      setDisabled("disabled");
    }
  };

  return (
    <div className="main">
      <div className="container">
        <h2 className="text-center mt-3">
          Welcome to your profile {worker.name}
        </h2>
        <div className="row">
          <div className="col-6">
            <h2 className="text-center">Company</h2>
            <div className="text-center">information about company</div>
          </div>
          <div className="col-6">
            <div className=" pl-5">
              <h2 className="text-center">Edit your information</h2>
            </div>
            <div className="row">
              <div className="col-4">Email</div>
              <div
                className={`col-8 input-group-text  ${
                  error.title ? "alert-danger" : ""
                }`}
              >
                <input
                  type="text"
                  name="email"
                  value={worker.email}
                  onChange={e => changeInput(e)}
                  style={{width: "100%"}}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">Name</div>
              <div
                className={`col-8 input-group-text ${
                  error.name ? "alert-danger" : ""
                }`}
              >
                <input
                  type="text"
                  name="name"
                  value={worker.name}
                  onChange={e => changeInput(e)}
                  style={{width: "100%"}}
                  disabled={disabled}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">Phone</div>
              <div
                className={`col-8 input-group-text ${
                  error.phone ? "alert-danger" : ""
                }`}
              >
                <input
                  type="text"
                  name="phone"
                  value={worker.phone}
                  onChange={e => changeInput(e)}
                  style={{width: "100%"}}
                  placeholder="(xxx)xxx-xx-xx"
                  disabled={disabled}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">Position</div>
              <div
                className={`col-8 input-group-text ${
                  error.position ? "alert-danger" : ""
                }`}
              >
                <input
                  type="text"
                  name="position"
                  value={worker.position}
                  onChange={e => changeInput(e)}
                  style={{width: "100%"}}
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">Task</div>
              <div
                className={`col-8 input-group-text ${
                  error.task ? "alert-danger" : ""
                }`}
              >
                <input
                  type="text"
                  name="task"
                  value={worker.task}
                  onChange={e => changeInput(e)}
                  style={{width: "100%"}}
                  disabled={disabled}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-8 text-danger">{errMsg}</div>
              <div className="text-right pt-1 mt-3 col-4">
                <button
                  className="btn-sm btn-primary mr-1 "
                  onClick={() => saveItem(worker)}
                >
                  Save
                </button>
                <button
                  className="btn-sm btn-info mr-1 "
                  onClick={() => editBtn()}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Profile);
