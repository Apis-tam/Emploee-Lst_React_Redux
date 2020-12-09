import isEmail from "validator/es/lib/isEmail";

function validate(data) {
  const errors = {};
  if (!isEmail(data.email)) errors.email = "Email cannot be blank";
  if (!data.task) errors.task = "Task cannot be blank";
  if (!data.phone) errors.phone = "Phone cannot be blank";
  if (!data.name) errors.name = "Name cannot be blank";
  if (!data.position) errors.position = "Position cannot be blank";

  if (parseInt(data.position) < 0)
    errors.position = "Position cannot be negative";
  return errors;
}
export default validate;
