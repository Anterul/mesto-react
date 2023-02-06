import React from 'react';

function SaveButton(props) {
  return (
    <button className="popup__save-button" type="submit">{props.text}</button>
  );
}

export default SaveButton;