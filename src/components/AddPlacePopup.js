import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink
    })
  }

  return (
    <PopupWithForm
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Новое место"
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    >
      <input
        className="popup__input"
        onChange={handleCardNameChange}
        id="cardName"
        type="text"
        name="name"
        defaultValue=""
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error" id="cardName-error"></span>
      <input
        className="popup__input"
        onChange={handleCardLinkChange}
        id="cardLink"
        type="text"
        name="link"
        defaultValue=""
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="cardLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;