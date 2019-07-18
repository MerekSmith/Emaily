import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  // Have to pass along this history object in order to redirect after submitting the survey. It is passed along from the SurveyForm component, using the withRouter function from react-router-dom.
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};
