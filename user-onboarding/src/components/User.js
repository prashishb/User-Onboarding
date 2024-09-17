import React from 'react';

export default function User({ details }) {
  if (!details) {
    return <h3>Working fetching user&apos;s details...</h3>;
  }

  return (
    <div className='friend-container'>
      <h2>
        {details.name
          .split(' ')
          .map((elem) => elem[0].toUpperCase() + elem.substr(1))
          .join(' ')}
      </h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
      <p>Role: {details.role}</p>
      <p>ToS: {details.tos ? '✔️' : '❌'}</p>
    </div>
  );
}
