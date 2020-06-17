import React from 'react';

export const Team = ({ name }) => {
  const arr = name.split(' ');
  let abbr = '';
  arr.forEach(element => {
    abbr += element.charAt(0);
  });
  return <li className="card__avatars--item">{abbr}</li>
};
