// SurveryNew shows SurveyForm and SurveyFormReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { showFormReview: false };
  // }

  // This statement is the exact same as above but a shorter syntax version. It is available to us through a babel add on through create-react-app.
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        <h2>Create A Survey</h2>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
