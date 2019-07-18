// SurveyField contains logic to render a single label and text input.
import React from "react";

export default ({ input, label, meta: { touched, error } }) => {
  // The input comes from the props sent over from the Field component out of redux-form. Need to pass this to our input field in order to have it record the values.
  // console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className='red-text' style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
