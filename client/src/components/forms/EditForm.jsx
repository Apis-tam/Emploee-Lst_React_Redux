import React, {useState, memo} from "react";

function EditForm(props) {
  const {item, saveItem, closeFn, error} = props;

  const [updateFilm, setUpdate] = useState(item);

  const changeInput = e => {
    if (e.target.name === "phone") {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

      setUpdate({
        ...updateFilm,
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
    setUpdate({...updateFilm, [e.target.name]: e.target.value});
  };

  return (
    <div className="row update-item">
      <div className="col-1 pl-5">EDIT</div>
      <div
        className={`col-2  input-group-text ${
          error.name ? "alert-danger" : ""
        }`}
      >
        <input
          type="text"
          name="name"
          value={updateFilm.name}
          onChange={e => changeInput(e)}
        />
      </div>
      <div
        className={`col-1  input-group-text ${
          error.position ? "alert-danger" : ""
        }`}
      >
        <input
          type="text"
          name="position"
          value={updateFilm.position}
          onChange={e => changeInput(e)}
        />
      </div>
      <div
        className={`col-2  input-group-text ${
          error.email ? "alert-danger" : ""
        }`}
      >
        <input
          type="text"
          name="email"
          value={updateFilm.email}
          onChange={e => changeInput(e)}
        />
      </div>
      <div
        className={`col-2  input-group-text ${
          error.phone ? "alert-danger" : ""
        }`}
      >
        <input
          type="text"
          name="phone"
          value={updateFilm.phone}
          onChange={e => changeInput(e)}
          placeholder="(xxx)xxx-xx-xx"
        />
      </div>
      <div
        className={`col-3  input-group-text ${
          error.task ? "alert-danger" : ""
        }`}
      >
        <input
          type="text"
          name="task"
          value={updateFilm.task}
          onChange={e => changeInput(e)}
        />
      </div>

      <div className="col-1 pt-1">
        <button
          className="btn-sm btn-primary mr-1 "
          onClick={() => saveItem(updateFilm)}
        >
          Save
        </button>
        <button className="btn-sm btn-danger" onClick={() => closeFn(null)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default memo(EditForm);
