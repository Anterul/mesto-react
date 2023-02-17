import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Input from './Input';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    userName: '',
    userDescription: '',
    userAvatar: '',
    _id: ''
  });
  const [cards, setCards] = React.useState([]);

  
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

  React.useEffect(() => {

    Promise.all([
      api.getUserInfo('https://nomoreparties.co/v1/cohort-57/users/me'),
      api.getInitialCards()
    ])
    .then(([userData, cardsData])=>{
      setCurrentUser({
        userName: userData.name,
        userDescription: userData.about,
        userAvatar: userData.avatar,
        _id: userData._id
      });
      setCards(cardsData);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });

  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page-content">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={setSelectedCard}
            handleImagePopup={handleImagePopup}
            onCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
