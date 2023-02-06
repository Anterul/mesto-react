import React from 'react';

function Input(props) {
  return (
    <input
      className="popup__input"
      id={props.id}
      type="text"
      name={props.name}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      minLength={props.minLength}
      maxLength={props.maxLength}
      required
    />
  );
}

export default Input;