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
        <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.role}</div>
        </div>
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
          Role:
          <select name='role' value={values.role} onChange={onChange}>
            <option value=''>---- Select a Role ----</option>
            <option value='Project Manager'>Project Manager</option>
            <option value='Product Lead'>Product Owner</option>
            <option value='Team Lead'>Team Lead</option>
            <option value='Tech Lead'>Tech Lead</option>
            <option value='Full-Stack Developer'>Full-Stack Developer</option>
            <option value='Back-End Developer'>Back-End Developer</option>
            <option value='Front-End Developer'>Front-End Developer</option>
            <option value='QA Lead'>QA Lead</option>
            <option value='QA Engineer'>QA Engineer</option>
            <option value='UI Designer'>UI Designer</option>
            <option value='UX Designer'>UX Designer</option>
          </select>
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
