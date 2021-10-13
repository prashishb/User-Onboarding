import React, { useState } from 'react';
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
const initialDisabled = true;

export default function App() {
  // States
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(InitialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  // Event Handlers
  const inputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const formSubmit = () => {};

  return (
    <div>
      <h1>App</h1>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
      />
    </div>
  );
}
