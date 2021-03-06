import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault()

        if (password !== password2) {
            setAlert('Password does not match','danger');
        }
        else {
             register({ name,email,password })
        }
    }

      // redirect if logged in
      if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Sign up
            </h1>
            <p className="lead">
                <i className="fas fa-user">Create your account</i>
            </p>
            <form onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                    {/* <label for="name">Name</label> */}
                    <input type="text" name="name" class="form-control" id="email" placeholder="Enter your name" value={name} onChange={e => onChange(e)} />
                </div>
                <div class="form-group">
                    {/* <label for="email">Email address</label> */}
                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter email" value={email} onChange={e => onChange(e)} />
                    <small class="form-text text-muted">This site uses gravatar for profile image</small>
                </div>
                <div class="form-group">
                    {/* <label for="password">Password</label> */}
                    <input
                     type="password"
                     name="password"
                     value={password}
                     onChange={e => onChange(e)}
                     class="form-control"
                     id="password"
                     minLength='6'
                     placeholder="Password" />
                </div>
                <div class="form-group">
                    {/* <label for="password2">Confirm Password</label> */}
                    <input type="password" name="password2" value={password2} onChange={e => onChange(e)} class="form-control" id="password2" minLength='6' placeholder="Confirm your Password" />
                </div>
                <button type="submit" class="btn btn-outline-primary">Create account</button><br />
                <small class="form-text text-muted">
                    Already have an account..?
                    <Link to="/login">Login</Link>
                </small>
            </form>
            
        </Fragment>
    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, { setAlert,register })(Register)
