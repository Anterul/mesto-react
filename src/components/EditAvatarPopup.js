import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Обновить аватар"
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    > 
      <input
        ref={inputRef}
        className="popup__input"
        id="cardAvatar"
        type="text"
        name="avatar"
        defaultValue=""
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error" id="cardAvatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;