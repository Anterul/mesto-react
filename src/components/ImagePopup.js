import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_name_picture ${props.card ? `popup_opened` : ""}`}>
      <div className="popup__container popup__container_type_picture">
        <button className="popup__close-button" onClick={props.onClose} type="button"></button>
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <h2 className="popup__title popup__title_type_picture">
          {props.card ? props.card.name : ""}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;