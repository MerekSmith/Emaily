// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; // This is a function directly out of redux-form which connects up the form to our redux state.
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type='text'
          {...field}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h6>All fields are required.</h6>
        {/* The handleSubmit function comes from redux-form. */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='btn-flat red white-text'>
            Cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Check for invalid recipients. Do this first or it will override the blank value, if nothing is added.
  errors.recipients = validateEmails(values.recipients || "");

  // Do this forEach loop rather than repetitive ifs checking each value. Putting name in [] allows us to check that value on each iteration. It is not actually calling the value.
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  // If errors object is empty, form is good and will continue as normal. If we insert something into error object, then it will be displayed on form for the user to correct before being able to submit.
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
