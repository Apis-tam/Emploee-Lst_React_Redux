import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import isEmail from "validator/es/lib/isEmail";
import equals from "validator/es/lib/equals";

const initState = {email: "", password: "", passwordConfirmation: ""};

class SignUp extends Component {
  state = {
    data: initState,
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
      } catch (error) {
        this.setState({
          data: this.state.data,
          errors: {...error.response.data.errors},
        });
      }
    }
  };
  validate(data) {
    const errors = {};
    if (!isEmail(data.email)) errors.email = "Wrong email";
    if (!data.password) errors.password = "Password cannot be blank";
    if (!data.passwordConfirmation) {
      errors.passwordConfirmation = "Password confirmation cannot be blank";
    }
    if (!equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation =
        "Password is not equals to password confirm";
    }
    this.setState({errors: errors});
    return errors;
  }
  render() {
    const {email, password, passwordConfirmation} = this.state.data;
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
              value={email}
              onChange={this.handleInput}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <p className="has-error">{errors.email}</p>

          <div className="input-group mb-3">
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
              value={password}
              onChange={this.handleInput}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <p className="has-error">{errors.password}</p>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text w-90"
                id="inputGroup-sizing-default"
              >
                Repeat
              </span>
            </div>
            <input
              name="passwordConfirmation"
              type="password"
              className={`form-control  ${
                errors.email ? "alert alert-danger" : ""
              } `}
              value={passwordConfirmation}
              onChange={this.handleInput}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>

          <p className="has-error">{errors.passwordConfirmation}</p>

          <Link to="/" className={`btn btn-primary form-btn-left`}>
            Log in
          </Link>
          <button type="submit" className={`btn btn-primary form-btn-right`}>
            Sign up
          </button>
        </form>
      </div>
    );
  }
}
SignUp.propTypes = {
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  confirnPass: PropTypes.string.isRequired,
  errors: PropTypes.object,
};
SignUp.defaultProps = {
  password: "",
  email: "",
  confirnPass: "",
  errors: {},
};

export default SignUp;
