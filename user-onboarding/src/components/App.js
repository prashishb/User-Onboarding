import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from '../validation/formSchema';
import Form from './Form';

// Initial Form State
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  tos: false,
};

// Initial Form Error States
const InitialFormErrors = {
  name: '',
  email: '',
  password: '',
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

  const formSubmit = () => {};

  // Helpers
  const postNewUser = (newUser) => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then((res) => {
        console.log(res);
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

  // Side effects: Enable button when all form criteria met
  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  });

  return (
    <div>
      <h1>App</h1>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  );
}
