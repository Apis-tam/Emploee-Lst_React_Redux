import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  handleInput = e => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
      errors: {...this.state.errors, [e.target.name]: ""},
    });
  };

  submitForm = async e => {
    e.preventDefault();
    let errors = this.validate(this.state.data);
    this.setState({errors: errors});
    if (Object.keys(errors).length === 0) {
      try {
        await this.props.submit(this.state.data);
        this.setState({data: {email: "", password: ""}});
      } catch (error) {
        this.setState({
          errors: error.response.data.errors,
        });
      }
    }
  };
  validate(data) {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Wrong email";
    if (!data.password) errors.password = "Password cannot be blank";
    this.setState({errors});
    return errors;
  }
  render() {
    const {errors} = this.state;
    return (
      <div className="form-box">
        <form className="form-group" onSubmit={this.submitForm}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text w-90"
                id="inputGroup-sizing-default"
              >
                Email
              </span>
            </div>
            <input
              name="email"
              type="email"
              className={`form-control  ${
                errors.email ? "alert alert-danger" : ""
              } `}
              value={this.state.data.email}
              onChange={this.handleInput}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <p className="has-error">{errors.email}</p>
          <div
            className={`input-group mb-3 ${errors.password ? "has-error" : ""}`}
          >
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input
              name="password"
              type="password"
              className={`form-control  ${
                errors.email ? "alert alert-danger" : ""
              } `}
              value={this.state.data.password}
              onChange={this.handleInput}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <p className="has-error">{errors.password}</p>
          <button type="submit" className={`btn btn-primary form-btn-left`}>
            Log in
          </button>
          <Link to="/sign-up" className={`btn btn-primary form-btn-right`}>
            Sign up
          </Link>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
Login.defaultProps = {
  email: "",
  password: "",
};
export default withRouter(Login);
