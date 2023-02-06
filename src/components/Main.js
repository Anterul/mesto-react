import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    Promise.all([
      api.getUserInfo('https://nomoreparties.co/v1/cohort-57/users/me'),
      api.getInitialCards()
    ])
    .then(([userData, cardsData])=>{
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      setCards(cardsData);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });

  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt={userName}
          />
          <button
            className="profile__update-button"
            onClick={onEditAvatar} 
            type="button"
          >
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{userName}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
            >
            </button>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          >
          </button>
      </section>
      <section className="cards">
        {cards.map((card, id) => (
          <Card
            card={card}
            key={id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;