import React from 'react';
import ReactDOM from 'react-dom';
import api from "../utils/Api.js";
import Card from "./Card.jsx";
import {currentUserContext} from "../contexts/CurrentUserContext";
function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    // рендер каточек с сервера
    api.getInitialCards()
    .then((cards) => {
      setCards(cards);
    })
      .catch((err) => {console.log(err)});
  }, []);
  
  // подписываемся на контекст из currentUser
  const currentUserData = React.useContext(currentUserContext);
 
  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUserData._id);
    if (!isLiked) {
      api.setLike(card)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    }
    else {
      api.deleteLike(card)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {console.log(err)})
    }
  }

  function handleCardDelete (card) {
    api.deleteCard(card)
    .then((data) => {
      console.log(data, card)
      setCards((state) => {
        let copyState = state.filter((item) => {
          if (item._id != card._id) {
            return true
          }
          else {
            return false
          }
        })
        return copyState
      })
    })

  }

  return (
    <div className="content page__content">
      <section className="profile content__profile">
        <div className="profile__image" style={{ backgroundImage: `url(${currentUserData.avatar})` }} onClick={onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__username">{currentUserData.name}</h1>
          <button aria-label="edit" type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          <p className="profile__job">{currentUserData.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="places page__places">
        {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          );
        })}
      </section>
    </div>
  );
};

export default Main