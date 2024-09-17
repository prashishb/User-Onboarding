import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from '../validation/formSchema';
import Form from './Form';
import User from './User';

// Initial Form State
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  role: '',
  tos: false,
};

// Initial Form Error States
const InitialFormErrors = {
  name: '',
  email: '',
  password: '',
  role: '',
};

//Initial Submit Button State
const initialUsers = [];
const initialDisabled = true;

export default function App() {
  // States
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(InitialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [users, setUsers] = useState(initialUsers);

  // Helpers
  const postNewUser = (newUser) => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  // Event Handlers

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      role: formValues.role.trim(),
      tos: formValues.tos,
    };
    postNewUser(newUser);
  };

  // Side effects: Enable button when all form criteria met
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div class='app-container'>
      <h1>User Onboarding</h1>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      <div class='container'>
        <h2 className='title'>Users</h2>
        {users.map((user) => {
          return <User key={user.id} details={user} />;
        })}
      </div>
    </div>
  );
}
