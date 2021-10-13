import React from 'react';

export default function Form(props) {
  const { values, change, submit, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-field'>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={values.name}
            placeholder='John Doe'
            onChange={onChange}
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={values.email}
            placeholder='john@example.com'
            onChange={onChange}
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={onChange}
          />
        </label>
        <label>
          Terms Of Service:
          <input
            type='checkbox'
            name='tos'
            className='tos'
            onChange={onChange}
          />
        </label>
        <div className='submit'>
          <button type='submit' disabled={disabled}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
