import React from 'react';

export const Team = ({ name }) => {
  const arr = name.split(' ');
  let abbr = '';
  arr.forEach(element => {
    abbr += element.charAt(0);
  });
  return <div>{abbr}</div>;
};
