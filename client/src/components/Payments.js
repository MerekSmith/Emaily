import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    // This will create the pay with card button on the header.
    // Test credit card # is 4242 4242 4242 4242. Exp date just needs to be in the future and CSV can be anything.
    return (
      <StripeCheckout
        name='Emaily'
        description='$5 for 5 email credits'
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
