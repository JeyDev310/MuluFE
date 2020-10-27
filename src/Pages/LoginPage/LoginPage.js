import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userActions } from "../../_actions";

import styled, { createGlobalStyle } from "styled-components";

function LoginPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
        }
    };

    return (
        <LoginLayout>
            <GlobalStyle />
            <LoginPanel>
                <Form name="form" onSubmit={handleSubmit} >
                    <Label>Email</Label>
                    <Input type="email" name="email" value={email} onChange={handleChange} />
                    {submitted && !email &&
                        <InvalidFeedBack className="invalid-feedback">email is required</InvalidFeedBack>
                    }
                    <Label>Password</Label>
                    <Input type="password" name="password" value={password} onChange={handleChange} />
                    {submitted && !password &&
                        <InvalidFeedBack>password is required</InvalidFeedBack>
                    }
                    <LoginButton type="submit">Login</LoginButton>
                    <Link to="/register" className="btn btn-link">Register</Link>
                </Form>
            </LoginPanel>
        </LoginLayout>
    );
}

export { LoginPage };

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #00849b;
  }
`
const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const LoginPanel = styled.div`
  background-color: #efefef;
  font-size: 12px;
  width: 300px;
  padding: 20px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  margin-top: 8px;
`
const InvalidFeedBack = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #dc3545;
`
const Input = styled.input`
  padding: 5px;
  margin-top: 2px;
  border: 1px solid #d6d6d6;
`
const LoginButton = styled.button`
  background-color: #2070ae;
  margin-top: 15px;
  color: #ffffff;
  border: none;
  padding: 5px;
  font-size: 14px;
`
