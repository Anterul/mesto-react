import React from 'react';
import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Input from './Input';

function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImagePopup() {
    setIsImagePopupOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="page">
      <div className="page-content">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
          handleImagePopup={handleImagePopup}
        />
        <Footer />
        <PopupWithForm
          name="profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          title="Редактировать профиль"
          buttonText="Сохранить"
        >
          <Input
            id="yourName"
            name="yourName"
            defaultValue="Жак-Ив Кусто"
            placeholder="Имя"
            minLength="2"
            maxLength="400"
          />
          <span className="popup__input-error" id="yourName-error"></span>
          <Input
            id="job"
            name="yourJob"
            defaultValue="Исследователь океана"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error" id="job-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="add-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          title="Новое место"
          buttonText="Создать"
        >
          <Input
            id="cardName"
            name="name"
            defaultValue=""
            placeholder="Название"
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error" id="cardName-error"></span>
          <Input
            id="cardLink"
            name="link"
            defaultValue=""
            placeholder="Ссылка на картинку"
          />
          
          <span className="popup__input-error" id="cardLink-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="delete-card"
          title="Вы уверены ?"
          buttonText="Да"
        >
        </PopupWithForm>
        <PopupWithForm
          name="update-avatar"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          title="Обновить аватар"
          buttonText="Сохранить"
        > 
          <Input
            id="cardAvatar"
            name="avatar"
            defaultValue=""
            placeholder="Ссылка на аватар"
          />
          <span className="popup__input-error" id="cardAvatar-error"></span>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
