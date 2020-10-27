import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../_actions";
import styled, { createGlobalStyle } from "styled-components";

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: 'Male',
        zipcode: '',
        profession: '',

        email: '',
        password: '',
        confirmpassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);

    const [userType, setUserType] = useState(false);
    const onUserTypeHandler = () => {
        setUserType(!userType);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Register-------");
        setSubmitted(true);
        if (user.firstname && user.lastname && user.email && user.password) {
            if (userType) {
                dispatch(userActions.register(user));
            } else {
                dispatch(userActions.register({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    age: user.age,
                    gender: user.gender,
                    zipcode: user.zipcode,
                    email: user.email,
                    password: user.password
                }));
            }
        }        
    };
    return (
        <RegisterLayout>
            <GlobalStyle />
            <RegisterPanel>
                <UserTypeGroup>
                    <UserTypeButton userType={userType} onClick={onUserTypeHandler}>CONTACT</UserTypeButton>
                    <UserTypeButton userType={!userType} onClick={onUserTypeHandler}>AGENT</UserTypeButton>
                </UserTypeGroup>
                <Form name="form" onSubmit={onSubmitHandler} >
                    <InputGroup>
                        <Label>First Name</Label>
                        <Input type="text" value={user.firstname} name="firstname" onChange={handleChange} />
                        {submitted && !user.firstname &&
                            <InvalidFeedback>First Name is required</InvalidFeedback>
                        }
                    </InputGroup>
                    <InputGroup>
                        <Label>Last Name</Label>
                        <Input type="text" value={user.lastname} name="lastname" onChange={handleChange} />
                        {submitted && !user.firstname &&
                            <InvalidFeedback>First Name is required</InvalidFeedback>
                        }
                    </InputGroup>
                    <InputGroup>
                        <Label>Age</Label>
                        <Input type="text" value={user.age} name="age" onChange={handleChange} />
                    </InputGroup>
                    <InputGroup>
                        <Label>Gender</Label>
                        <Select value={user.gender} name="gender" onChange={handleChange}>
                            <option>Male</option>
                            <option>Female</option>
                        </Select>
                    </InputGroup>
                    <InputGroup>
                        <Label>Zip Code</Label>
                        <Input type="text" name="zipcode" value={user.zipcode} onChange={handleChange} />
                        {submitted && !user.zipcode &&
                            <InvalidFeedback>Zip Code is required</InvalidFeedback>
                        }
                    </InputGroup>
                    {userType && <InputGroup>
                        <Label>Profession</Label>
                        <Select value={user.profession} name="profession" onChange={handleChange}>
                            <option>Corporate Finance</option>
                            <option>Commercial Banking</option>
                            <option>Investment Banking</option>
                            <option>Hedge Funds</option>
                            <option>Financial Planning</option>
                        </Select>
                    </InputGroup>}
                    <InputGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={user.email} onChange={handleChange} />
                        {submitted && !user.email &&
                            <InvalidFeedback>Email is required</InvalidFeedback>
                        }
                    </InputGroup>
                    <InputGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={user.password} onChange={handleChange} />
                        {submitted && !user.password &&
                            <InvalidFeedback>Password is required</InvalidFeedback>
                        }
                    </InputGroup>
                    <InputGroup>
                        <Label>ConfirmPasword</Label>
                        <Input type="password" name="confirmpassword" value={user.confirmpasword} onChange={handleChange} />
                        {submitted && !user.confirmpassword &&
                            <InvalidFeedback>Confirm Password is required</InvalidFeedback>
                        }
                    </InputGroup>
                    <RegisterButton type="submit">Register</RegisterButton>
                </Form>
            </RegisterPanel>
        </RegisterLayout>
    );
}

export { RegisterPage };

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #00849b;
  }
`
const RegisterLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const RegisterPanel = styled.div`
  background-color: #efefef;
  font-size: 12px;
  width: 350px;
`

const UserTypeGroup = styled.div`
  display: flex;
`

const UserTypeButton = styled.div`
  background-color: ${props => props.userType && "#313131"};
  padding: 7px 10px;
  width: 50%;
  text-align: center;
  color: ${props => props.userType ? "#ffffff" : "#313131"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  margin-top: 8px;
`
const Input = styled.input`
  padding: 5px;
  margin-top: 2px;
  border: 1px solid #d6d6d6;
`
const RegisterButton = styled.button`
  background-color: #2070ae;
  margin-top: 15px;
  color: #ffffff;
  border: none;
  padding: 5px;
  font-size: 14px;
`
const Select = styled.select`
  padding: 5px;
  margin-top: 2px;
  border: 1px solid #d6d6d6;
`
const InvalidFeedback = styled.div`
  
`