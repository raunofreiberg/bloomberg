import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class SubmitValidationForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string,
    };

    static defaultProps = {
        error: '',
    };

    required = value => (value ? undefined : 'Required');

    renderField = props =>
        <div>
            <input {...props.input} placeholder={props.placeholder} type={props.type} className="input__field" />
            {props.touched && props.error && <span>{props.error}</span>}
        </div>;

    render() {
        const { error, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <h1 className="index__heading">Login</h1>
                <Field
                    name="email"
                    type="email"
                    component={this.renderField}
                    placeholder="Email"
                    validate={this.required}
                />
                <Field
                    name="password"
                    type="password"
                    component={this.renderField}
                    placeholder="Password"
                />
                {error &&
                <div className="error__block">
                    <span>{error}</span>
                </div>
                }
                <button className="btn btn--primary login" type="submit">Login</button>
                <Link to="/signup" className="btn btn-block btn--secondary">Sign up</Link>
            </form>
        );
    }
}

// this is the Higher Order Component I've been referring to
// as the wrapper, and it may also be written as a @decorator
export default reduxForm({
    form: 'login',
})(SubmitValidationForm);