import { useEffect, useState }from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    userName: '',
    userDescription: '',
    userAvatar: '',
    _id: ''
  });
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = useState('Сохранить');
  const [addPlacePopupButtonText, setAddPlacePopupButtonText] = useState('Создать');
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
 
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

  function handleDeleteButtonClick() {
    setIsDeleteCardPopupOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false)
  }

  useEffect(() => {
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
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }

  function handleUpdateUser({name, about}) {
    setButtonText('Сохранение...');
    api.submitProfileData(name, about)
    .then((data) => {
      setCurrentUser({
        userName: data.name,
        userDescription: data.about,
        userAvatar: data.avatar,
        _id: data._id
      })
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setButtonText('Сохранить');
    });
  }

  function handleUpdateAvatar({avatar}) {
    setButtonText('Сохранение...');
    api.updateAvatar(avatar)
    .then((data) => {
      setCurrentUser({
        userName: data.name,
        userDescription: data.about,
        userAvatar: data.avatar,
        _id: data._id
      })
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setButtonText('Сохранить');
    });
  }

  function handleAddPlaceSubmit({name, link}) {
    setAddPlacePopupButtonText('Сохранение...');
    api.addNewCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setAddPlacePopupButtonText('Создать');
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
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonText}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText={addPlacePopupButtonText}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={buttonText}
          />
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
