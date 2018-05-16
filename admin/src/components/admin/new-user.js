import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validator from 'email-validator';
import ErrorField from '../common/error-field';

class NewUserForm extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h2>New user</h2>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field name = "firstName" component = {ErrorField} label = "First name:" />
                    <Field name = "lastName" component = {ErrorField} label = "Last name:" />
                    <Field name = "email" component = {ErrorField} label = "Email:" />

                    <button type = "submit">Create</button>
                </form>
            </div>
        )
    }
}

const validate = ({ email }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field';
    if (email && !validator.validate(email)) errors.email = 'invalid email';

    return errors;
}

export default reduxForm({
    form: 'newUser',
    validate
})(NewUserForm);
