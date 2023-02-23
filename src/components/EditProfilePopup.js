import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      buttonText={props.buttonText}
    >
      <input
        className="popup__input"
        onChange={handleNameChange}
        id="yourName"
        type="text"
        name="yourName"
        defaultValue={currentUser.userName}
        placeholder="Имя"
        minLength="2"
        maxLength="400"
        required
      />
      <span className="popup__input-error" id="yourName-error"></span>
      <input
        className="popup__input"
        onChange={handleDescriptionChange}
        id="job"
        type="text"
        name="yourJob"
        defaultValue={currentUser.userDescription}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;